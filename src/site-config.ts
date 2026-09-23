// site-config.ts
// Central place for values that stay the same on every page: nav
// structure, brand name, footer contact info. Fill this in per site
// (see STYLE-GUIDE.md's site map for the page list), then spread it into
// BaseLayout from each page:
//
//   ---
//   import { siteConfig } from '../site-config';
//   ---
//   <BaseLayout {...siteConfig} title="Home" description="...">

export const siteConfig = {
  siteName: '[Site Name]',
  navItems: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Get in touch', href: '/contact' },
  tagline: '[One line describing what this business does]',
  // Optional — omit any of these (or leave undefined) if not needed:
  address: undefined as string | undefined, // '123 Main St, City, ST'
  email: undefined as string | undefined, // 'hello@example.com'
  phone: undefined as string | undefined, // '(555) 555-5555'
  socialLinks: [] as { label: string; href: string }[],
};
