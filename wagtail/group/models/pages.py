from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.api import APIField
from modelcluster.contrib.taggit import ClusterTaggableManager

class GroupIndexPage(Page):
    """
    A container page that holds all group pages. 
    It doesn't contain any fields but helps maintain a clear content hierarchy.
    """
    pass

class GroupPage(Page):
    """
    The main model for storing information about a social group.
    The title of the page is the name of the group.
    """
    description = models.TextField(help_text="A one or two sentence description of the group")
    details = RichTextField(blank=True, help_text="Extended description displayed on the group page. Consider including details about accessibility and other relevant information.")

    gender_restriction = models.CharField(
        max_length=255,
        blank=True, 
        help_text="By default, groups are open to all genders. To specify that this group is only open to a specific gender, type: 'Men', 'Women' or a combination, such as 'Women and non-binary people'."
    )

    tags = ClusterTaggableManager(through='group.GroupPageTag', blank=True, help_text="Add tags to help users searching for this group. Please categorise according to existing tags first.")

    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('details'),
        FieldPanel('tags'),
        FieldPanel('gender_restriction'),
        InlinePanel('links', label="Group links"),
        InlinePanel(
            'subscriptions', 
            label="Subscriptions", 
            classname="collapsible collapsed",
            heading="Subscription Options",
            help_text="Any membership or subscription options that the group offers."
        ),
        InlinePanel('events', label="Events"),
    ]

    api_fields = [
        APIField('description'),
        APIField('details'),
        APIField('gender_restriction'),
        APIField('tags'),
        APIField('links'),
        APIField('subscriptions'),
        APIField('events'),
    ]