# wagtail/group/constants.py

# Constants used in the group models

WEEKDAY_CHOICES = [
    ('monday', 'Monday'),
    ('tuesday', 'Tuesday'),
    ('wednesday', 'Wednesday'),
    ('thursday', 'Thursday'),
    ('friday', 'Friday'),
    ('saturday', 'Saturday'),
    ('sunday', 'Sunday'),
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

EVENT_GENDER_CHOICES = [
    ('all', 'All Welcome'),
    ('women_only', 'Women Only'),
    ('men_only', 'Men Only'),
    ('other', 'Other'),
] 