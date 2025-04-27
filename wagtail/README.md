# Wagtail

## Setting up Python & dependencies

Before running the server, please make sure that you've activated a Python environment and installed all the dependencies. The following instructions are MacOS specific.

1. Go into the wagtail directory.
`cd wagtail`

2. Create a virtual environment.
`python -m venv venv`

3. Activate the enviroment.
`source venv/bin/activate`

4. Install the dependencies.
`pip install -r requirements.txt`

## Running Wagtail

If you are running the app for the first time and don't have a database, please run database migrations and create a super user account. By default a simple sqlite3 database will be created for you.

1. Run migrations.
`python manage.py migrate`

2. Create a super user account for Wagtail admin.
`python manage.py createsuperuser`

3. Then run Wagtail, use `python manage.py runserver`.

Note that if you visit the home page, you will get an error - the FE is provided and run seperately.

Navigate to `http://127.0.0.1:8000/admin` to access Wagtail.

## Loading mock data

There's a management command to load old data from the `data/groups` directory into Wagtail admin:

`python manage.py import_json_groups`

## API requests & responses

Demonstrate fetching groups by sending a request to: http://127.0.0.1:8000/api/v2/groups/

You can request JSON formatted requests by appending `?format=json`.

Request all fields by using: `http://127.0.0.1:8000/api/v2/groups/?fields=*`

To request a specific group, determined by the slug value: `http://127.0.0.1:8000/api/v2/groups/?slug=lhg-run-club&fields=*`

To request all group slugs: `http://127.0.0.1:8000/api/v2/groups/?fields=slug`