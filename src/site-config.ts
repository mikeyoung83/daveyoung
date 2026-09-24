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
  siteName: 'Dave Young Contracting',
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Get a Quote', href: '/contact' },
  tagline: 'Residential remodels, additions & decks — Bruce Peninsula, ON.',
  // TODO: real address/email/phone from Dave before launch.
  address: undefined as string | undefined,
  email: undefined as string | undefined,
  phone: undefined as string | undefined,
  socialLinks: [] as { label: string; href: string }[],
};
