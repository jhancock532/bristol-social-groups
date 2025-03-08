import json
import os
from datetime import datetime
from pathlib import Path
from django.core.management.base import BaseCommand
from django.db import transaction
from wagtail.models import Page
from group.models import (
    GroupIndexPage, 
    GroupPage,
    GroupLink,
    GroupEvent,
    GroupLocation,
    RecurrenceRule
)
from group.constants import BOOKING_CHOICES

class Command(BaseCommand):
    help = 'Import group data from JSON files into Wagtail pages'

    def add_arguments(self, parser):
        # The wagtail app is run from the /wagtail directory
        # the group json data is stored in /data/groups
        parser.add_argument(
            '--data-dir',
            type=str,
            default='../data/groups',
            help='Directory containing group JSON files'
        )
        parser.add_argument(
            '--parent-title',
            type=str,
            default='Imported Groups',
            help='Title for the new parent GroupIndexPage'
        )

    def _parse_time(self, time_str: str) -> datetime.time:
        """Parse time string from the format 'Jan 1, 1970 HH:MM' to get just the time."""
        dt = datetime.strptime(time_str, "%b %d, %Y %H:%M")
        return dt.time()

    def _convert_booking_required(self, booking_type: str) -> str:
        """Convert booking type to match the choices in the model."""
        booking_map = {
            'Not required': 'not_required',
            'Advised': 'advised',
            'Required': 'required'
        }
        return booking_map.get(booking_type, 'not_required')

    def _convert_frequency_to_rrule(self, frequency: str, weekday: str) -> dict:
        """Convert frequency string to RRULE parameters."""
        weekday_map = {
            'Monday': 'MO', 'Tuesday': 'TU', 'Wednesday': 'WE',
            'Thursday': 'TH', 'Friday': 'FR', 'Saturday': 'SA', 'Sunday': 'SU'
        }
        
        # Default to weekly
        rrule_freq = 'WEEKLY'
        interval = 1
        
        # Handle different frequency patterns
        frequency = frequency.lower()
        if 'fortnight' in frequency:
            rrule_freq = 'WEEKLY'
            interval = 2
        elif 'month' in frequency:
            rrule_freq = 'MONTHLY'
        
        return {
            'frequency': rrule_freq,
            'interval': interval,
            'weekday': weekday_map.get(weekday, 'MO')
        }

    def _format_location_geometry(self, longitude: str, latitude: str) -> str:
        """Format location geometry in the format expected by wagtailgeowidget."""
        # wagtailgeowidget expects a string in format: 'SRID=4326;POINT(longitude latitude)'
        return f'SRID=4326;POINT({longitude} {latitude})'

    def handle(self, *args, **options):
        data_dir = options['data_dir']
        parent_title = options['parent_title']

        self.stdout.write(f"Starting import from {data_dir}")
        
        try:
            # Get the home page
            home_page = Page.objects.get(slug='home')
            
            # Create new parent page
            with transaction.atomic():
                parent_page = GroupIndexPage(
                    title=parent_title,
                    slug=parent_title.lower().replace(' ', '-'),
                )
                home_page.add_child(instance=parent_page)
                
                self.stdout.write(self.style.SUCCESS(
                    f"Created new parent page: {parent_title}"
                ))
                
                # Process each JSON file
                data_path = Path(data_dir)
                if not data_path.exists():
                    raise ValueError(f"Data directory not found: {data_dir}")
                
                for group_dir in data_path.iterdir():
                    if group_dir.is_dir():
                        details_file = group_dir / 'details.json'
                        if details_file.exists():
                            self.import_group(details_file, parent_page)
                            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Error during import: {str(e)}")
            )
            raise

    def import_group(self, json_file: Path, parent_page: GroupIndexPage):
        """Import a single group from a JSON file."""
        try:
            with open(json_file, 'r') as f:
                data = json.load(f)
            
            with transaction.atomic():
                # Create the group page
                group_page = GroupPage(
                    title=data['name'],
                    slug=data['slug'],
                    description=data['description'],
                    details=data.get('details', ''),
                    gender_restriction=data.get('gender', '')
                )
                
                # Add it as a child of the parent page
                parent_page.add_child(instance=group_page)
                
                # Add tags
                if 'tags' in data:
                    group_page.tags.add(*data['tags'])
                
                # Import links
                if 'links' in data:
                    for link_data in data['links']:
                        link = GroupLink(
                            page=group_page,
                            platform=link_data['type'],
                            url=link_data['url'],
                            text=link_data.get('text', '')
                        )
                        link.save()
                
                # Import events
                if 'events' in data:
                    for event_data in data['events']:
                        # Create the event
                        event = GroupEvent(
                            page=group_page,
                            name=event_data.get('name', ''),
                            details=event_data.get('details', ''),
                            link=event_data.get('link', {}).get('url', ''),
                            gender_restriction=event_data.get('gender', ''),
                        )
                        
                        # Handle time information
                        if 'time' in event_data:
                            time_data = event_data['time']
                            event.start_time = self._parse_time(time_data['start'])
                            event.end_time = self._parse_time(time_data['end'])
                        
                        # Handle cost information
                        if 'cost' in event_data:
                            cost_data = event_data['cost']
                            event.session_price = cost_data.get('sessionPrice')
                            event.cost_details = cost_data.get('details', '')
                        
                        # Handle booking information
                        if 'booking' in event_data:
                            booking_data = event_data['booking']
                            event.booking_required = self._convert_booking_required(
                                booking_data['required']
                            )
                            event.booking_details = booking_data.get('details', '')
                        
                        event.save()
                        
                        # Handle location
                        if 'location' in event_data:
                            loc_data = event_data['location']
                            location = GroupLocation(
                                event=event,
                                address=loc_data['address']
                            )
                            if 'latitude' in loc_data and 'longitude' in loc_data:
                                location.location = self._format_location_geometry(
                                    loc_data['longitude'],
                                    loc_data['latitude']
                                )
                            location.save()
                        
                        # Handle recurrence
                        if 'time' in event_data:
                            time_data = event_data['time']
                            rrule_data = self._convert_frequency_to_rrule(
                                time_data['frequency'],
                                time_data['weekday']
                            )
                            recurrence = RecurrenceRule(
                                event=event,
                                frequency=rrule_data['frequency'],
                                interval=rrule_data['interval'],
                                weekday=rrule_data['weekday']
                            )
                            recurrence.save()
                
                # Save again to ensure all relations are saved
                group_page.save()
                
                self.stdout.write(
                    self.style.SUCCESS(f"Imported group: {data['name']}")
                )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"Error importing {json_file}: {str(e)}")
            ) 