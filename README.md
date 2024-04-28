This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Inspiration

https://pcmaffey.com/counting-ghosts

## Events to add

### Groups from Meetup?

https://www.meetup.com/board-game-social/ - double check schedule
https://www.meetup.com/bristol-writing-meetup-group/

### A lot of running clubs...

- A run club that meets at the Downs on a Saturday - could be this one: https://www.fergsrunclub.co.uk/get_involved
- A run club that meets in Bedminster near a brewery there as well - https://www.instagram.com/alpha.runclub/ - free
- Southville run club - https://www.southvillerunningclub.co.uk/membership - 50p a go, slower runs seem good on the social side?
- Westbury Harriers? Mix of social / competitive runs? Seems more fitness orientated... Maybe list the slower sessions as social runs? Get in touch. https://groups.runtogether.co.uk/WestburyHarriersRunningClub/Runs

## Todo

- Add more events

- All pages use styles from Index.module.scss - update this to seperate out the different page styles, and create a consistent hero component that can be reused on different pages. Note the map hero has custom margin - so our hero should be able to accept a custom container class prop and pass that through?

- The font class should live in a seperate file to `_app` and then get imported into app and the BristolMap component.
- Mailing list integration
- AI pre-processing of event data?
- Investigate setting up a Netlify CMS integration
- Add star ranking system for how well groups listed abide by the aims of the site.
- Decrease the desktop font size & layout by 90% for all items
- Refactor every text content link to the new link component

## Development ethos

This website does not use any cookies or trackers, and no
analytics code.

This website will not accept sponsorship or advertising of
specific groups over others, however groups which meet more
of the aims of the site may be listed higher.

No guarantee is made for the accuracy of data or for the
long term maintenance of the site. All information is
provided as is.

Where possible, I've included direct links to the
groups that host the events, so you can access the latest
information about the event and contact the organizers
yourself if you have further questions. These links should
hopefully boost the search rankings of the individual groups
and help them grow.

To reduce carbon emissions, no images or heavyweight
JavaScript is used on this site. The OpenStreetMap map
widget loads map tile images - this component is only loaded
when the user views it, and not bundled within all pages.
