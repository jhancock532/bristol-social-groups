# Group JSON File Format Documentation

## Root Object

The root object contains the following properties:

- `name` (string): The name of the club.
- `slug` (string): A URL-friendly identifier for the club.
- `description` (string): A brief description of the club.
- `details` (string): Additional details about the club.
- `tags` (array of strings): Tags associated with the club.
- `events` (array of event objects): A list of events organized by the club.

Example:

```json
{
  "name": "Alpha Run Club",
  "slug": "alpha-run-club",
  "description": "Alpha Run Club welcomes runners of all abilities for weekly and monthly runs starting from Alpha Bottle Shop & Tap in Bedminster.",
  "details": "",
  "tags": ["running", "fitness", "pubs"],
  "events": [...]
}
```

## Event Object

Each event object within the `events` array contains the following properties:

- `name` (string): The name of the event.
- `time` (object): Details about the event's timing.
- `location` (object): Details about the event's location.
- `cost` (object): Details about the event's cost.
- `booking` (object): Details about booking requirements.
- `url` (string): URL for more information about the event.

### Time Object

The `time` object contains the following properties:

- `frequency` (string): The frequency of the event (e.g., "Weekly", "Monthly").
- `weekday` (string): The day of the week the event occurs.
- `start` (string): The start time of the event (in "MMM DD, YYYY HH:MM" format).
- `end` (string): The end time of the event (in "MMM DD, YYYY HH:MM" format).
- `details` (string): Additional details about the timing of the event.

Example:

```json
"time": {
  "frequency": "Weekly",
  "weekday": "Thursday",
  "start": "Jan 1, 1970 18:15",
  "end": "Jan 1, 1970 20:00",
  "details": "Meetup & bag drop from 6pm, ready to run at 6.30pm. A 5km loop around Bristol harbourside or Victoria Park during summer."
}
```

### Location Object

The `location` object contains the following properties:

- `address` (string): The physical address of the event.
- `latitude` (string): The latitude coordinate of the location.
- `longitude` (string): The longitude coordinate of the location.
- `googleMapsLink` (string): A link to the location on Google Maps.

Example:

```json
"location": {
  "address": "Alpha Bottle Shop & Tap, Unit 1, Imperial Arcade, Bedminster, Bristol, BS3 4HH",
  "latitude": "51.4425846",
  "longitude": "-2.5958089",
  "googleMapsLink": "https://maps.app.goo.gl/eQDgUs3wMZVk5SJB7"
}
```

### Cost Object

The `cost` object contains the following properties:

- `sessionPrice` (number): The cost to attend the event.
- `details` (string): Additional details about the cost.

Example:

```json
"cost": {
  "sessionPrice": 0.00,
  "details": "Free to join, no sign up necessary."
}
```

### Booking Object

The `booking` object contains the following property:

- `required` (boolean): Indicates whether booking is required to attend the event.

Example:

```json
"booking": {
  "required": false
}
```
