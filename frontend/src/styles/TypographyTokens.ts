import { createGlobalStyle } from "styled-components";
import device from "./breakpoints";
const TypographyTokens = createGlobalStyle`

:root {
    /* Base sizes*/
--text-xs: 0.813rem;  /* 13px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
--text-xxl: 1.5rem;    /* 24px */

/* Heading sizes (mobile-first) */
--font-size-h1: var(--text-lg); 
--font-size-h2: var(--text-lg); 
--font-size-h3: var(--text-xs);
--font-size-h4: 0.875rem;  /* not used yet */

--font-size-body-1: var(--text-xs); /* 13px */
--font-size-body-2: var(--text-xs);  /* 13px - comments */
--font-size-body-3: var(--text-xs); /* 13px - category label */

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

 /* Line Heights */  
--line-height-h1: 1.46;
--line-height-h2: 1.45;
--line-height-h3: 1.44;
--line-height-h4: 1.43;

--line-height-body-1: 1.44;
--line-height-body-2: 1.47;
--line-height-body-3: 1.46;

 /* Letter Spacing */
--letter-spacing-h1: -0.33px;
--letter-spacing-h2: -0.25px;
--letter-spacing-h3: -0.25px;
--letter-spacing-h4: -0.2px;
}


@media ${device.sm} {
 :root {
 --font-size-h1: var(--text-xxl);
 --font-size-body-1: var(--text-base);  /* 16px */
 --font-size-body-2: 0.938rem;  /* 15px */
 --font-size-body-3: 0.813rem;  /* 13px */

 --font-size-h3: var(--text-lg);

 }
}
`;

export default TypographyTokens;
