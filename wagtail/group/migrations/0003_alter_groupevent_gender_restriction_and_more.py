# Generated by Django 5.1.6 on 2025-02-15 22:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0002_rename_by_day_recurrencerule_weekday_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupevent',
            name='gender_restriction',
            field=models.CharField(blank=True, help_text="By default, events are open to all genders. To specify that this event is only open to a specific gender, type: 'Men', 'Women' or a combination, such as 'Women and non-binary people'.", max_length=255),
        ),
        migrations.AlterField(
            model_name='grouppage',
            name='gender_restriction',
            field=models.CharField(blank=True, help_text="By default, groups are open to all genders. To specify that this group is only open to a specific gender, type: 'Men', 'Women' or a combination, such as 'Women and non-binary people'.", max_length=255),
        ),
        migrations.AlterField(
            model_name='recurrencerule',
            name='interval',
            field=models.PositiveIntegerField(default=1, help_text='How often the recurrence rule repeats (e.g., every 2 weeks of a month, or every 3 months in a year. For a weekly event, this should be 1.)'),
        ),
    ]
