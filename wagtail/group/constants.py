# wagtail/group/constants.py

# Constants used in the group models
RRULE_WEEKDAY_CHOICES = [
    ('MO', 'Monday'),
    ('TU', 'Tuesday'),
    ('WE', 'Wednesday'),
    ('TH', 'Thursday'),
    ('FR', 'Friday'),
    ('SA', 'Saturday'),
    ('SU', 'Sunday'),
]

GROUP_LINK_TYPE_CHOICES = [
    ('Discord', 'Discord'),
    ('WhatsApp', 'WhatsApp'),
    ('Meetup', 'Meetup'),
    ('Facebook', 'Facebook'),
    ('Instagram', 'Instagram'),
    ('TikTok', 'TikTok'),
    ('Website', 'Website'),
]

SUBSCRIPTION_FREQUENCY_CHOICES = [
    ('monthly', 'Monthly'),
    ('quarterly', 'Quarterly'),
    ('yearly', 'Yearly'),
]

EVENT_FREQUENCY_CHOICES = [
    ('weekly', 'Weekly'),
    ('fortnightly', 'Fortnightly'),
    ('monthly', 'Monthly'),
    ('other', 'Other'),
]

BOOKING_CHOICES = [
    ('not_required', 'Not required'),
    ('advised', 'Advised'),
    ('required', 'Required'),
]