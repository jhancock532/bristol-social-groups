from django.db import models
from django.core.validators import MinValueValidator

from wagtail.models import Orderable
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.api import APIField
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel

from group.constants import (
    BOOKING_CHOICES,
    RRULE_WEEKDAY_CHOICES,
)

class GroupEvent(ClusterableModel, Orderable):
    """
    This model represents a recurring event organized by a group.
    Location information is handled through the related GroupLocation model.
    """
    page = ParentalKey('group.GroupPage', on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=255)
    details = RichTextField(blank=True, help_text="Any other extra information not covered by the following fields.")
    
    # Time
    start_time = models.TimeField()
    end_time = models.TimeField()

    # Event link
    link = models.URLField(blank=True, help_text="Optional link to the organisers website, if they have a webpage for this specific event.")
    
    # Cost
    session_price = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(0)]
    )

    cost_details = models.TextField(blank=True)
    voluntary_contribution = models.BooleanField(default=False, help_text="The event cost is not compulsory to pay.")
    
    # Booking
    booking_required = models.CharField(max_length=20, choices=BOOKING_CHOICES)
    booking_details = models.TextField(blank=True)
    booking_url = models.URLField(blank=True, help_text="Optional link to the organisers booking page for this event.")
    
    # Gender
    gender_restriction = models.CharField(
        max_length=255,
        blank=True, 
        help_text="By default, events are open to all genders. To specify that this event is only open to a specific gender, type: 'Men', 'Women' or a combination, such as 'Women and non-binary people'."
    )

    # Age
    minimum_age = models.PositiveIntegerField(blank=True, null=True)
    maximum_age = models.PositiveIntegerField(blank=True, null=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('details'),
        MultiFieldPanel([
            FieldPanel('start_time'),
            FieldPanel('end_time'),
            InlinePanel('recurrence', max_num=1, label='Day and frequency'),
        ], heading='Time and Date'),
        InlinePanel('location', max_num=1, label='Location'),
        FieldPanel('link'),
        MultiFieldPanel([
            FieldPanel('session_price'),
            FieldPanel('voluntary_contribution'),
        ], heading='Cost'),
        MultiFieldPanel([
            FieldPanel('booking_required'),
            FieldPanel('booking_details'),
            FieldPanel('booking_url'),
        ], heading='Booking'),
        FieldPanel('gender_restriction'),
        MultiFieldPanel([
            FieldPanel('minimum_age'),
            FieldPanel('maximum_age'),
        ], heading='Age'),
    ]

    @property
    def recurrence_info(self):
        """Get the first (and should be only) recurrence rule object"""
        recurrence = self.recurrence.first()
        if recurrence:
            weekday_dict = dict(RRULE_WEEKDAY_CHOICES)
            return {
                'frequency': recurrence.frequency,
                'interval': recurrence.interval,
                'weekday': weekday_dict.get(recurrence.weekday, recurrence.weekday),
                'monthly_week_position': recurrence.monthly_week_position,
                'rrule': recurrence.rrule,
                'human_readable': recurrence.human_readable
            }
        return None

    @property
    def location_info(self):
        """Get the first (and should be only) location object"""
        location = self.location.first()
        if location:
            return {
                'address': location.address,
                'latitude': location.latitude,
                'longitude': location.longitude,
                'google_maps_link': location.google_maps_link
            }
        return None

    api_fields = [
        APIField('name'),
        APIField('details'),
        APIField('start_time'),
        APIField('end_time'),
        APIField('recurrence_info'),
        APIField('location_info'),
        APIField('link'),
        APIField('session_price'),
        APIField('voluntary_contribution'),
        APIField('booking_required'),
        APIField('booking_details'),
        APIField('booking_url'),
        APIField('gender_restriction'),
        APIField('minimum_age'),
        APIField('maximum_age'),
    ] 