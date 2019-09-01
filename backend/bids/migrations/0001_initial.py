# Generated by Django 2.0.5 on 2019-09-01 10:21

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Auction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_id', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('category', models.CharField(default='all', max_length=50)),
                ('currently', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('buy_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('first_bid', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('number_of_bids', models.IntegerField(default=0)),
                ('location', models.CharField(max_length=300)),
                ('country', models.CharField(default='Greece', max_length=50)),
                ('started', models.DateTimeField(auto_now_add=True)),
                ('ends', models.DateTimeField(auto_now_add=True)),
                ('description', models.CharField(default='Empty', max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('phone', models.IntegerField()),
                ('address', models.CharField(max_length=50)),
                ('afm', models.IntegerField()),
            ],
            options={
                'verbose_name_plural': 'users',
                'abstract': False,
                'verbose_name': 'user',
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Bidder',
            fields=[
                ('rating', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('location', models.CharField(max_length=50)),
                ('country', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name_plural': 'users',
                'abstract': False,
                'verbose_name': 'user',
            },
            bases=('bids.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AddField(
            model_name='bid',
            name='bidder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bids.User'),
        ),
        migrations.AddField(
            model_name='auction',
            name='bid',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='bids.Bid'),
        ),
        migrations.AddField(
            model_name='auction',
            name='seller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='bids.User'),
        ),
        migrations.AddField(
            model_name='auction',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='category'),
        ),
    ]
