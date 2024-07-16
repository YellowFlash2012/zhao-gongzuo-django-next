# Generated by Django 5.0.7 on 2024-07-16 05:59

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
import django.core.validators
import django.db.models.deletion
import jobs.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, null=True)),
                ('description', models.TextField(null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('jobType', models.CharField(choices=[('Full Time', 'Fulltime'), ('Part Time', 'Parttime'), ('Internship', 'Internship')], default='Full Time', max_length=20)),
                ('education', models.CharField(choices=[('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('PhD', 'Phd')], default='Bachelors', max_length=20)),
                ('experience', models.CharField(choices=[('Entry', 'Entry'), ('Junior', 'Junior'), ('Intermediate', 'Intermediate'), ('Middle', 'Middle'), ('Senior', 'Senior'), ('Lead', 'Lead')], default='Junior', max_length=40)),
                ('industry', models.CharField(choices=[('IT', 'It'), ('B2C', 'B2C'), ('B2B', 'B2B'), ('Banking', 'Banking'), ('Mining', 'Mining'), ('Government', 'Government'), ('Manufacturing', 'Manufacturing'), ('Telco/Media', 'Telecommunications')], default='B2C', max_length=40)),
                ('salary', models.IntegerField(default=9, validators=[django.core.validators.MinValueValidator(9), django.core.validators.MaxValueValidator(300000)])),
                ('positions', models.IntegerField(default=1)),
                ('company', models.CharField(max_length=100, null=True)),
                ('point', django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(0.0, 0.0), srid=4326)),
                ('lastDate', models.DateTimeField(default=jobs.models.return_date_time)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
