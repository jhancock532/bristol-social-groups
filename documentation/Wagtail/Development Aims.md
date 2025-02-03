# Development aims

We want to test whether Wagtail CMS would be a good CMS for this site. This development effort will be split into several stages, by order of importance.

## Proof of concept

- Follow the wagtail setup tutorial. ✅
- Add a group model that can add zero or many events. ✅
- Experiment with adding the geo-picker addon for event location. ✅
- Create an API interface that returns all the groups (make it return all suitable FE fields with a simple request)

## Future features

- Add the ability to search for an address in the geo picker widget, configure Google Maps API integration key setting.
- Add the authentication token setup to the Wagtail API route.

## Developer experience

- Make a docker container for local development on the project
- Add linters and formatters
- Add a fab file with commands to automatically populate

## Deployment and integration

- Research what a production docker container for this setup would look like.
- Configure settings file.
- Research security considerations.
- Double check the database setup, what makes sense for this project? Sqlite now then Postgres later?

## Scale 

- Edit and add other pages to the site & menu all via Wagtail Admin, support for redirects etc.
- Consider the implementation of the LGTM stack for monitoring.
- Staging environment setup
