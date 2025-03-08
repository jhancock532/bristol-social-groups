from django.db import models

from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.models import Orderable
from modelcluster.fields import ParentalKey
from taggit.models import TaggedItemBase
from wagtailgeowidget import geocoders
from wagtailgeowidget.panels import GeoAddressPanel, GoogleMapsPanel
from wagtailgeowidget.helpers import geosgeometry_str_to_struct
from django.utils.functional import cached_property

from group.constants import (
    GROUP_LINK_TYPE_CHOICES,
    SUBSCRIPTION_FREQUENCY_CHOICES,
    RRULE_WEEKDAY_CHOICES,
)

class GroupLocation(Orderable):
    """A reusable component for storing location information.
    
    This model encapsulates all location-related fields and functionality,
    making it easier to maintain and reuse location data across different models.
    """
    event = ParentalKey('group.GroupEvent', on_delete=models.CASCADE, related_name='location')
    address = models.CharField(max_length=250, blank=True, null=True)
    location = models.CharField(max_length=250, blank=True, null=True)

    @cached_property
    def point(self):
        return geosgeometry_str_to_struct(self.location)

    @property
    def latitude(self):
        return self.point['y'] if self.location else None

    @property
    def longitude(self):
        return self.point['x'] if self.location else None

    @property
    def google_maps_link(self):
        """Generate a Google Maps link from the address."""
        if self.address:
            from urllib.parse import quote
            return f"https://www.google.com/maps/search/?api=1&query={quote(self.address)}"
        return None

    panels = [
        MultiFieldPanel([
            GeoAddressPanel("address", geocoder=geocoders.GOOGLE_MAPS),
            GoogleMapsPanel('location', address_field='address'),
        ], 'Location details'),
    ]

    api_fields = [
        APIField('address'),
        APIField('latitude'),
        APIField('longitude'),
        APIField('google_maps_link'),
    ]

class GroupLink(Orderable):
    """A link to an external platform or service where the group shares information.
    
    This model represents external links to platforms like Facebook, Meetup, etc. where
    the group maintains a presence or shares event details. Being Orderable allows
    administrators to control the display order of links.
    """
    page = ParentalKey('group.GroupPage', related_name='links')
    platform = models.CharField(max_length=50, choices=GROUP_LINK_TYPE_CHOICES, help_text="The service used by the group to share event details.")
    url = models.URLField()
    text = models.CharField(max_length=100, blank=True, help_text="Optional text that overrides the default link text for each platform.")

    api_fields = [
        APIField('platform'),
        APIField('url'),
        APIField('text'),
    ]

class GroupSubscription(Orderable):
    """A subscription or membership option that a group offers.
    
    This model represents different types of subscriptions that a group might offer,
    such as monthly memberships or annual passes. It includes details about costs
    and potential discounts. Being Orderable allows groups to prioritize certain
    subscription options in their display order.
    """
    page = ParentalKey('group.GroupPage', related_name='subscriptions')
    name = models.CharField(
        max_length=100, 
        blank=True,
        help_text="Optional name for this subscription type (e.g. 'Monthly Membership', 'Annual Pass')"
    )
    frequency = models.CharField(max_length=20, choices=SUBSCRIPTION_FREQUENCY_CHOICES)
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    estimated_cost_per_event = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="The total cost of the subscription divided by the number of events you can attend in that period."
    )
    offers_discount_on_event_cost = models.BooleanField(
        default=False,
        help_text="Check this if by getting a subscription, you get a discount on the cost of future events."
    )

    panels = [
        FieldPanel('name'),
        FieldPanel('frequency'),
        FieldPanel('cost'),
        FieldPanel('estimated_cost_per_event'),
        FieldPanel('offers_discount_on_event_cost'),
    ]

    def __str__(self):
        return self.name if self.name else f"{self.frequency} subscription"

class GroupPageTag(TaggedItemBase):
    """A tag association for GroupPage models.
    
    This model enables tagging functionality for groups, allowing them to be
    categorized and filtered. It uses Django-Taggit's TaggedItemBase to provide
    the tagging infrastructure.
    """
    content_object = ParentalKey(
        'group.GroupPage',
        related_name='tagged_items',
        on_delete=models.CASCADE
    )

class RecurrenceRule(Orderable):
    """A component for defining recurring event schedules using the iCal RRULE format.
    
    This model provides a structured way to define recurring events following the iCal
    specification (RFC 5545). It supports common recurrence patterns like weekly,
    monthly, or custom rules, and can generate valid RRULE strings for calendar integration.
    """
    event = ParentalKey('group.GroupEvent', on_delete=models.CASCADE, related_name='recurrence')
    
    # Frequency
    FREQ_CHOICES = [
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('MONTHLY', 'Monthly'),
        ('YEARLY', 'Yearly'),
    ]
    frequency = models.CharField(
        max_length=10,
        choices=FREQ_CHOICES,
        help_text="The base frequency of the recurring event"
    )
    
    # Interval (e.g., every 2 weeks)
    interval = models.PositiveIntegerField(
        default=1,
        help_text="How often the recurrence rule repeats (e.g., every 2 weeks of a month, or every 3 months in a year. For a weekly event, this should be 1.)"
    )
    
    # By day of week
    weekday = models.CharField(
        max_length=20,
        choices=RRULE_WEEKDAY_CHOICES,
        help_text="The day of the week when the event occurs"
    )
    
    # Position in month (for monthly recurrences)
    monthly_week_position = models.SmallIntegerField(
        null=True,
        blank=True,
        help_text="For specifying which week of the month the event occurs (e.g., 1 for first, 2 for second, -1 for last week of the month)"
    )
    
    panels = [
        MultiFieldPanel([
            FieldPanel('frequency'),
            FieldPanel('interval'),
            FieldPanel('weekday'),
            FieldPanel('monthly_week_position'),
        ], heading='Recurrence Settings'),
    ]
    
    @property
    def rrule(self):
        """Generate an iCal RRULE string from the component's fields."""
        components = [f"FREQ={self.frequency}"]
        
        if self.interval > 1:
            components.append(f"INTERVAL={self.interval}")
            
        if self.weekday:
            components.append(f"BYDAY={self.weekday}")
            
        if self.monthly_week_position is not None:
            components.append(f"BYSETPOS={self.monthly_week_position}")
        return "RRULE:" + ";".join(components)
    
    @property
    def human_readable(self):
        """Return a human-readable description of the recurrence rule."""
        parts = []
        
        # Base frequency and interval
        if self.interval == 1:
            parts.append(self.get_frequency_display().lower())
        else:
            parts.append(f"every {self.interval} {self.get_frequency_display().lower()}s")
            
        # Day of week
        if self.frequency in ['WEEKLY', 'MONTHLY']:
            day = dict(RRULE_WEEKDAY_CHOICES)[self.weekday]
            
            if self.frequency == 'MONTHLY' and self.monthly_week_position:
                pos = abs(self.monthly_week_position)
                if self.monthly_week_position > 0:
                    ordinal = {1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth'}.get(pos, f'{pos}th')
                else:
                    ordinal = 'last'
                parts.append(f"on the {ordinal} {day}")
            else:
                parts.append(f"on {day}")
            
        return " ".join(parts)
    
    api_fields = [
        APIField('rrule'),
        APIField('weekday'),
        APIField('human_readable'),
    ]
    
    class Meta:
        verbose_name = "Recurrence Rule"
        verbose_name_plural = "Recurrence Rules" 