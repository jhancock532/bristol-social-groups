from django.db import models
from django.core.validators import MinValueValidator

from wagtail.models import Orderable, Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.api import APIField
from wagtailgeowidget.panels import LeafletPanel
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
    type = models.CharField(max_length=50, choices=GROUP_LINK_TYPE_CHOICES)
    url = models.URLField()
    text = models.CharField(max_length=100, blank=True)

# Todo: Events also support links, so we should rename and reuse this model and add a field there.

# Groups can have multiple different types of subscription costs, or none at all
class GroupSubscription(Orderable):
    page = ParentalKey('GroupPage', related_name='subscriptions')
    frequency = models.CharField(max_length=20, choices=SUBSCRIPTION_FREQUENCY_CHOICES)
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    estimated_cost_per_event = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="Estimated cost per event"
    )
    offers_discount_on_event_cost = models.BooleanField(
        default=False,
        help_text="Indicates if a discount applies on event cost."
    )

class GroupPageTag(TaggedItemBase):
    content_object = ParentalKey(
        'GroupPage',
        related_name='tagged_items',
        on_delete=models.CASCADE  # CASCADE ensures that tag links for this GroupPage are removed when the page is deleted, without affecting other posts with the same tag.
    )

class GroupPage(Page):
    description = models.TextField(help_text="A one or two sentence description of the group")
    details = RichTextField(blank=True, help_text="Extended description displayed on the group page")

    gender = models.CharField(
        max_length=50, 
        choices=EVENT_GENDER_CHOICES,  # Now using common gender choices
        default='all',
        blank=True, 
        help_text="Select a restricted gender if applicable; 'All Welcome' means no restrictions."
    )
    
    tags = ClusterTaggableManager(through=GroupPageTag, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('details'),
        FieldPanel('gender'),
        FieldPanel('tags'),
        InlinePanel('links', label="Group Links"),
        InlinePanel('subscriptions', label="Subscriptions"),
        InlinePanel('events', label="Events"),
    ]

    api_fields = [
        APIField('description'),
        APIField('details'),
        APIField('gender'),
        APIField('tags'),
        APIField('links'),
        APIField('subscriptions'),
        APIField('events'),
    ]

class GroupEvent(Orderable):
    page = ParentalKey(GroupPage, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=255)
    details = RichTextField(blank=True)
    
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
    
    # Location
    address = models.CharField(max_length=250, blank=True, null=True)
    location = models.CharField(max_length=250, blank=True, null=True)
    
    google_maps_link = models.URLField(blank=True)
    location_details = models.TextField(blank=True, help_text="Additional location instructions or details")

    link = models.URLField(blank=True, help_text="Optional link to the venue website for the specific event")
    
    # Cost
    session_price = models.DecimalField(
        max_digits=6, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(0)]
    )

    cost_details = models.TextField(blank=True)

    voluntary_contribution = models.BooleanField(default=False)
    
    # Booking
    booking_required = models.CharField(max_length=20, choices=BOOKING_CHOICES)
    booking_details = models.TextField(blank=True)
    
    gender = models.CharField(max_length=50, blank=True, choices=EVENT_GENDER_CHOICES, default='all')
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
        FieldPanel('address'),
        LeafletPanel('location'),
        FieldPanel('google_maps_link'),
        FieldPanel('location_details'),
        FieldPanel('link'),
        FieldPanel('session_price'),
        FieldPanel('cost_details'),
        FieldPanel('booking_required'),
        FieldPanel('booking_details'),
        FieldPanel('gender'),
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
        APIField('location'),
        APIField('google_maps_link'),
        APIField('location_details'),
        APIField('link'),
        APIField('session_price'),
        APIField('cost_details'),
        APIField('booking_required'),
        APIField('booking_details'),
        APIField('gender'),
        APIField('accessibility'),
    ]

