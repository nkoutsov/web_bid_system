# Generated by Django 2.2.5 on 2019-09-13 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bids', '0006_auction_winner'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='read',
            field=models.BooleanField(default=False),
        ),
    ]
