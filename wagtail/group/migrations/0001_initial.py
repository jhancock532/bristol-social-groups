# Generated by Django 5.1.6 on 2025-02-15 22:27

import django.core.validators
import django.db.models.deletion
import modelcluster.contrib.taggit
import modelcluster.fields
import wagtail.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('taggit', '0006_rename_taggeditem_content_type_object_id_taggit_tagg_content_8fc721_idx'),
        ('wagtailcore', '0094_alter_page_locale'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('name', models.CharField(max_length=255)),
                ('details', wagtail.fields.RichTextField(blank=True)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('link', models.URLField(blank=True, help_text='Optional link to the organisers website, if they have a webpage for this specific event.')),
                ('session_price', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('cost_details', models.TextField(blank=True)),
                ('voluntary_contribution', models.BooleanField(default=False, help_text='The event cost is not compulsory to pay.')),
                ('booking_required', models.CharField(choices=[('not_required', 'Not required'), ('advised', 'Advised'), ('required', 'Required')], max_length=20)),
                ('booking_details', models.TextField(blank=True)),
                ('booking_url', models.URLField(blank=True, help_text='Optional link to the organisers booking page for this event.')),
                ('gender_restriction', models.CharField(blank=True, help_text='If this event is only open to a specific gender, please fill out this field as follows: `Men`, `Women` or another string, such as `Women and non-binary people`.', max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GroupIndexPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='GroupPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
                ('description', models.TextField(help_text='A one or two sentence description of the group')),
                ('details', wagtail.fields.RichTextField(blank=True, help_text='Extended description displayed on the group page. Consider including details about accessibility and other relevant information.')),
                ('gender_restriction', models.CharField(blank=True, help_text='By default, groups are open to all genders. To specify that this group is only open to a specific gender, type: `Men`, `Women` or another description of gender, such as `Women and non-binary people`.', max_length=255)),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='GroupLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('address', models.CharField(blank=True, max_length=250, null=True)),
                ('location', models.CharField(blank=True, max_length=250, null=True)),
                ('event', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='location', to='group.groupevent')),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='GroupLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('platform', models.CharField(choices=[('Discord', 'Discord'), ('WhatsApp', 'WhatsApp'), ('Meetup', 'Meetup'), ('Facebook', 'Facebook'), ('Instagram', 'Instagram'), ('TikTok', 'TikTok'), ('Website', 'Website')], help_text='The service used by the group to share event details.', max_length=50)),
                ('url', models.URLField()),
                ('text', models.CharField(blank=True, help_text='Optional text that overrides the default link text for each platform.', max_length=100)),
                ('page', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='links', to='group.grouppage')),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='groupevent',
            name='page',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='group.grouppage'),
        ),
        migrations.CreateModel(
            name='GroupPageTag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_object', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='tagged_items', to='group.grouppage')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_items', to='taggit.tag')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='grouppage',
            name='tags',
            field=modelcluster.contrib.taggit.ClusterTaggableManager(blank=True, help_text='A comma-separated list of tags.', through='group.GroupPageTag', to='taggit.Tag', verbose_name='Tags'),
        ),
        migrations.CreateModel(
            name='GroupSubscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('name', models.CharField(blank=True, help_text="Optional name for this subscription type (e.g. 'Monthly Membership', 'Annual Pass')", max_length=100)),
                ('frequency', models.CharField(choices=[('monthly', 'Monthly'), ('quarterly', 'Quarterly'), ('yearly', 'Yearly')], max_length=20)),
                ('cost', models.DecimalField(decimal_places=2, max_digits=6)),
                ('estimated_cost_per_event', models.DecimalField(blank=True, decimal_places=2, help_text='The total cost of the subscription divided by the number of events you can attend in that period.', max_digits=10, null=True)),
                ('offers_discount_on_event_cost', models.BooleanField(default=False, help_text='Check this if by getting a subscription, you get a discount on the cost of future events.')),
                ('page', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='subscriptions', to='group.grouppage')),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RecurrenceRule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('frequency', models.CharField(choices=[('DAILY', 'Daily'), ('WEEKLY', 'Weekly'), ('MONTHLY', 'Monthly'), ('YEARLY', 'Yearly')], help_text='The base frequency of the recurring event', max_length=10)),
                ('interval', models.PositiveIntegerField(default=1, help_text='How often the recurrence rule repeats (e.g., every 2 weeks)')),
                ('by_day', models.CharField(choices=[('MO', 'Monday'), ('TU', 'Tuesday'), ('WE', 'Wednesday'), ('TH', 'Thursday'), ('FR', 'Friday'), ('SA', 'Saturday'), ('SU', 'Sunday')], help_text='The day of the week when the event occurs', max_length=20)),
                ('by_set_pos', models.SmallIntegerField(blank=True, help_text='For monthly events, specify position (e.g., 1 for first, -1 for last)', null=True)),
                ('event', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='recurrence', to='group.groupevent')),
            ],
            options={
                'verbose_name': 'Recurrence Rule',
                'verbose_name_plural': 'Recurrence Rules',
            },
        ),
    ]
