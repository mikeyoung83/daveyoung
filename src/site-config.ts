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

import logo from './assets/logo/dave-young-renovations-logo.svg';

export const siteConfig = {
  siteName: 'Dave Young Renovations',
  // Header logo (includes the business name, so the navbar shows it
  // instead of the text name). Omit to fall back to text.
  logo,
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Get a Free Quote', href: '/contact' },
  tagline: 'Renovations, additions and decks from Owen Sound to Tobermory. Licensed & insured since 2016.',
  // Service area, named on the homepage (good for local search).
  serviceTowns: ['Wiarton', 'Owen Sound', 'Sauble Beach', 'Southampton', "Lion's Head", 'Tobermory'],
  // TODO: real address/email/phone from Dave before launch.
  address: undefined as string | undefined,
  email: undefined as string | undefined,
  phone: undefined as string | undefined,
  socialLinks: [] as { label: string; href: string }[],
};
