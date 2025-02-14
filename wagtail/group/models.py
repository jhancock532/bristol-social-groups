from django.db import models
from django.core.validators import MinValueValidator
from django.utils.functional import cached_property

from wagtail.models import Orderable, Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.api import APIField
from wagtailgeowidget import geocoders
from wagtailgeowidget.panels import GeoAddressPanel, GoogleMapsPanel
from wagtailgeowidget.helpers import geosgeometry_str_to_struct
from modelcluster.fields import ParentalKey
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase


# Import constants from the new constants file
from group.constants import (
    WEEKDAY_CHOICES,
    GROUP_LINK_TYPE_CHOICES,
    SUBSCRIPTION_FREQUENCY_CHOICES,
    EVENT_FREQUENCY_CHOICES,
    BOOKING_CHOICES,
    EVENT_GENDER_CHOICES,
)

# We leave this as an empty page for now so groups can be categorised in a distinct
# section in Wagtail admin. Otherwise all the group pages would be found beside the
# blog page folder.
class GroupIndexPage(Page):
    pass

# Links to external services where the user can find out more information about the group.
class GroupLink(Orderable):
    page = ParentalKey('GroupPage', related_name='links')
    platform = models.CharField(max_length=50, choices=GROUP_LINK_TYPE_CHOICES, help_text="The service used by the group to share event details.")
    url = models.URLField()
    text = models.CharField(max_length=100, blank=True, help_text="Optional text that overrides the default link text for each platform.")

    api_fields = [
        APIField('platform'),
        APIField('url'),
        APIField('text'),
    ]

# Groups can have multiple different types of subscription costs, or none at all
class GroupSubscription(Orderable):
    page = ParentalKey('GroupPage', related_name='subscriptions')
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
    content_object = ParentalKey(
        'GroupPage',
        related_name='tagged_items',
        on_delete=models.CASCADE  # CASCADE ensures that tag links for this GroupPage are removed when the page is deleted, without affecting other posts with the same tag.
    )

class GroupPage(Page):
    description = models.TextField(help_text="A one or two sentence description of the group")
    details = RichTextField(blank=True, help_text="Extended description displayed on the group page")

    # Gender
    gender = models.CharField(
        max_length=50, 
        choices=EVENT_GENDER_CHOICES, 
        default='all',
        blank=True, 
        help_text="Select a restricted gender if applicable; 'All Welcome' means no restrictions."
    )
    gender_other = models.CharField(
        max_length=100,
        blank=True,
        help_text="If you selected 'Other', please specify here"
    )

    # Tags
    tags = ClusterTaggableManager(through=GroupPageTag, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('details'),
        FieldPanel('tags'),
        InlinePanel('links', label="Group Links"),
        MultiFieldPanel([
            FieldPanel('gender'),
            FieldPanel('gender_other'),
        ], heading="Gender requirements", classname="collapsible collapsed"),
        InlinePanel(
            'subscriptions', 
            label="Subscriptions", 
            classname="collapsible collapsed",
            heading="Subscription Options",
            help_text="Add any membership or subscription options that your group offers."
        ),
        InlinePanel('events', label="Events"),
    ]

    api_fields = [
        APIField('description'),
        APIField('details'),
        APIField('gender'),
        APIField('gender_other'),
        APIField('tags'),
        APIField('links'),
        APIField('subscriptions'),
        APIField('events'),
    ]

    def clean(self):
        super().clean()
        if self.gender == 'other' and not self.gender_other:
            from django.core.exceptions import ValidationError
            raise ValidationError({
                'gender_other': 'This field is required when "Other" is selected.'
            })

class GroupEvent(Orderable):
    page = ParentalKey(GroupPage, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=255)
    details = RichTextField(blank=True)
    
    # Date and time
    frequency = models.CharField(
        max_length=50,
        choices=EVENT_FREQUENCY_CHOICES,
        help_text="Select the event frequency. Choose 'Other' for custom frequencies."
    )
    frequency_other = models.CharField(
        max_length=50,
        blank=True,
        help_text="Please specify the frequency (e.g. 'Every 6 weeks', 'First Thursday of the month')"
    )

    weekday = models.CharField(max_length=20, choices=WEEKDAY_CHOICES)
    start_time = models.TimeField() # Todo add support for minutes as well as hours
    end_time = models.TimeField() # Todo add support for minutes as well as hours
    time_details = models.TextField(blank=True, help_text="Any additional timing information")

    # Event link
    link = models.URLField(blank=True, help_text="Optional link to the organisers website, if they have a webpage for this specific event.")
    
    # Location
    address = models.CharField(max_length=250, blank=True, null=True)

    # The location is a string representation of latitude and longitude.
    # We convert it to these seperate parts and return those fields in the API.
    location = models.CharField(max_length=250, blank=True, null=True)

    @cached_property
    def point(self):
        return geosgeometry_str_to_struct(self.location)

    @property
    def latitude(self):
        return self.point['y']

    @property
    def longitude(self):
        return self.point['x']

    google_maps_link = models.URLField(blank=True, help_text="Copy this link from the above Google Maps panel, by clicking on the location and copying the link from the popup window that shows.")
    location_details = models.TextField(blank=True, help_text="Optional extra location details. Any instructions that might help people find the location not already covered.")
    
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
    
    # Gender
    gender = models.CharField(
        max_length=50, 
        choices=EVENT_GENDER_CHOICES, 
        default='all',
        blank=True, 
        help_text="Select a restricted gender if applicable; 'All Welcome' means no restrictions."
    )
    gender_other = models.CharField(
        max_length=100,
        blank=True,
        help_text="If you selected 'Other', please specify here"
    )

    # Accessibility
    accessibility = models.TextField(blank=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('details'),
        FieldPanel('frequency'),
        FieldPanel('frequency_other'),
        FieldPanel('weekday'),
        FieldPanel('start_time'),
        FieldPanel('end_time'),
        FieldPanel('time_details'),
        MultiFieldPanel([
            GeoAddressPanel("address", geocoder=geocoders.GOOGLE_MAPS),
            GoogleMapsPanel('location', address_field='address'),
        ], 'Location details'),
        FieldPanel('google_maps_link'),
        FieldPanel('location_details'),
        FieldPanel('link'),
        FieldPanel('session_price'),
        FieldPanel('cost_details'),
        FieldPanel('voluntary_contribution'),
        FieldPanel('booking_required'),
        FieldPanel('booking_details'),
        MultiFieldPanel([
            FieldPanel('gender',),
            FieldPanel('gender_other'),
        ], heading="Gender requirements", classname="collapsible collapsed"),
        FieldPanel('accessibility'),
    ]

    api_fields = [
        APIField('name'),
        APIField('details'),
        APIField('frequency'),
        APIField('frequency_other'),
        APIField('weekday'),
        APIField('start_time'),
        APIField('end_time'),
        APIField('time_details'),
        APIField('address'),
        APIField('latitude'),
        APIField('longitude'),
        APIField('google_maps_link'),
        APIField('location_details'),
        APIField('link'),
        APIField('session_price'),
        APIField('cost_details'),
        APIField('voluntary_contribution'),
        APIField('booking_required'),
        APIField('booking_details'),
        APIField('gender'),
        APIField('gender_other'),
        APIField('accessibility'),
    ]

# Optional fields for minimum age and maximum age requirements.

# Sort out the time picker so it supports minutes as well as hours.

# How will we add support for regular events with changing locations, a checkbox?

# How to split out / refactor this file into seperate sections?