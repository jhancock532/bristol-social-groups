# Future Development Plans

## Priority features

Search feature.

Create a mailing list where users can sign up to hear about more events in the future. This can be a google form to start with. Emails are sent out once a month or once every two months, depending on the amount of groups added.

Replace the map marker icon with a green svg element, and change the size of the icon or a number within the icon to represent the number of groups that share the same location. Automatically group events close to one another on the map view and reveal them as seperate when zooming in closer. Create a card swipe user interface to view all the groups information when the map marker is clicked.

Order the filter tags by most common to least common. Display three rows of tags visually and then a scroll bar should appear, so they don't take up too much space on the screen.

Add accessibility aria labels or suitable titles to announce the icons in the GroupCard component

Add tests for the filters combined with the map listing component and card feed listing component

## Nice to have

Add nice SVG illustrations that show up at the top of the page for certain group filter options, e.g. fitness or boardgames. Consider something along the lines of https://www.toools.design/free-open-source-illustrations. Keep the image size small so that the page loads quickly & there's less carbon emissions.

Create a LLM prompt to help developers process the event information from a website or form input into the JSON format expected by the site.

The Leaflet.css file is a render blocking resource, move to the public folder instead of hosting on a CDN.

## Tech debt

The font class should live in a seperate file to `_app.tsx` and then get imported into app and the `BristolMap.tsx` component.

Refactor every text content <a> link to the new <Link> component

Add more styling documentation in `styling.md`

## Potential features needing refinement

Add a star ranking system for how well groups listed follow the aims of the site. Could be controversial and hard to maintain, ideally should be set up with a simple scoring system with clearly defined rules.

## Moonshot features

- Create custom map tiles with a green theme for the in house map component.

- Consider and implement a low cost / free alternative to google forms for submitting groups, reducing the carbon impact of the google form pages.
