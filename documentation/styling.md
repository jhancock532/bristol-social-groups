# Styling

There are no official design files (Figma etc) for this site. The design loosely follows that of GOV.uk or GDS, trying to keep UX simple and make the site as easy to use as possible.

## Fonts

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Rubik, a variable Google Font. This font supports a **bold** axis but not _italics_.

## SCSS Modules

The site is primarily styled with SCSS modules. Each component has a corresponding SCSS module file, which is then imported in the component code and used as follows:

```scss
.container {
  margin: 0 auto;
}
```

```tsx
import styles from './Component.module.scss';

const Component = () => (
  <div className={styles.container}>
  ...
```

## Colors

Colors are applied based on variables set in `globals.scss`.

```scss
color: var(--color--primary);
```

This use of CSS variables is to support dark mode or similar features in the future.

## Breakpoints and responsive styling

The sites breakpoints are defined in `_variables.scss` as follows:

```scss
$breakpoints: (
  'medium' '(min-width: 599px)',
  'large' '(min-width: 1023px)',
  'site-width' '(min-width: 1560px)',
  'x-large' '(min-width: 1919px)'
);
```

Use the `media-query` mixin for writing responsive styles. This project uses mobile first responsive styling.

```scss
.container {
  padding: $grid;

  @include media-query(medium) {
    padding: $grid * 2;
  }

  @include media-query(large) {
    padding: $grid * 3;
  }
}
```

## Other Mixins

`main-grid()` is the primary grid container of the site. See `Layout.tsx` for an example implementation.
