import { createGlobalStyle } from "styled-components";
import device from "./breakpoints";

const GlobalStyles = createGlobalStyle`

:root{
/*  NOTE: Most active and hover states currently use the same color for consistency.
 Separate tokens are still defined for clarity and future flexibility. */

/* CORE ACTION COLORS */
--color-primary: #AD1FEA;        /* primary call-to-action (e.g., "Add Feedback" buttn) */
--color-primary-hover: #C75AF6;
--color-primary-active: #C75AF6;  

 
--color-secondary: #4661E6;     /* secondary actions (e.g., "Edit Feedback" button) */
--color-secondary-hover: #7C91F9;   
--color-secondary-active: #7C91F9;


--color-tertiary: #3A4374;        /* tertiary actions (e.g., "Cancel" button) */
--color-tertiary-hover: #656EA3;
--color-tertiary-active: #656EA3;

--color-danger: #D73737;          /* destructive actions (e.g., "Delete Feedback" button) */
--color-danger-hover: #E98888;
--color-danger-active: #E98888;

--color-muted: #647196;


/* TEXT COLORS */
--color-text-light: #FFFFFF;     /* text on dark backgrounds (e.g. buttons, action bar) */
--color-text-dark: #3A4374;      /* default body and heading text */
--color-text-muted: var(--color-muted);     /* secondary text (e.g. metadata, descriptions) */
--color-text-accent: #4661E6;
--color-text-soft-accent: #F2F4FF;   /* tags, or interactive labels */


/* BACKGROUNDS */ 
--color-background: #F7F8FD;      /* app background */
--color-surface: #FFFFFF;         /* background for cards, modals, dropdowns */

--color-accent: #4661E6;
--color-surface-accent: #F2F4FE;  /* soft, tinted surface (e.g., tag backgrounds, inputs) */
--color-surface-accent-hover: #CFD7FF;
--color-surface-accent-active: #4661E6;


--color-action-bar: #373F68;       /* background for top-level UI controls (e.g., action bar) */


 /* FEEDBACK STATUS COLORS */
--color-status-planned: #F49F85;
--color-status-in-Progress: #AD1FEA;
--color-status-live: #62BCFA;


/* TYPOGRAPHY */
--font-family-base: 'Jost', sans-serif;


/* Border */
--border-radius-xs: 5px;
--border-radius-sm: 12px;
--border-radius: 15px;

/* Divider line */

--color-divider: rgba(140, 146, 179, 0.25);

/* DISABLED STATE STYLES */
--color-background-disabled: #EAEAEA;
--color-text-disabled: #9499b7;
--color-border-disabled: #E0E3F5;
}

/* FONTS */
/* jost-regular - latin */
@font-face {
  font-family: 'Jost';
  src: url('/fonts/jost-v18-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Check https:/*developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
}
/* jost-600 - latin */
@font-face {
  font-family: 'Jost';
  src: url('/fonts/jost-v18-latin-600.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
  font-style: normal;
  font-weight: 600;
  font-display: swap; /* Check https:/*developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
}
/* jost-700 - latin */
@font-face {
  font-family: 'Jost';
  src: url('/fonts/jost-v18-latin-700.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
  font-style: normal;
  font-weight: 700;
  font-display: swap; /* Check https:/*developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
}


/*
Josh's Custom CSS Reset
https:/*www.joshwcomeau.com/css/custom-css-reset/
*/

*, *::before, *::after {
box-sizing: border-box;
}

* {
margin: 0;
padding: 0;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
line-height: 1.5;
-webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
display: block;
max-width: 100%;
}

input, button, textarea, select {
font: inherit;
color: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p, h1, h2, h3, h4, h5, h6 {
overflow-wrap: break-word;

}

p {
//text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
text-wrap: wrap;
}

#root, #__next {
isolation: isolate;
}




/* BASE STYLES */

body {
  font-family: 'Jost', sans-serif;
  color: var(--color-text-dark);
  font-size: var(--font-size-body-1);
  background-color: var(--color-background);

}

#root {
  height: 100dvh;
  height: 100vh;
  position: relative;
  

  @media ${device.sm} {
    //padding: 20px;
  }
}

:root:has(.no-scroll-menu) {
  overflow: hidden;
}

:root:has(.no-scroll-modal) {
  overflow: hidden;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

//FOCUS STATES
input:not([type=radio]):focus, textarea:focus, select:focus{
  outline: 1px solid var(--color-secondary);
}


& button:focus-visible, a:focus-visible {
  outline: 2px solid #2cbeb2;
  outline-offset: 4px;
}


  
@keyframes fadeToast {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.toastNotification.show {
  opacity: 1;
  transition: opacity 0.2s ease-out;
  pointer-events: auto;
}

.toastNotification.hide {
  opacity: 0;
  transition: opacity 6.5s ease-in-out; /* slower fade-out */
  pointer-events: none;
}


/* Scroll-locking */
.no-scroll {
  overflow: hidden;
}

       


/* A11Y */

/* Hiding class, making content visible only to screen readers but not visually */
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}



`;
export default GlobalStyles;
