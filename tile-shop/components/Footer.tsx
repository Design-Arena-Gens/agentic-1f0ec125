import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    Shop: [
      { label: 'All Products', href: '/shop' },
      { label: 'Collections', href: '/collections' },
      { label: 'Best Sellers', href: '/shop?sort=bestseller' },
      { label: 'New Arrivals', href: '/shop?filter=new' },
      { label: 'Sample Orders', href: '/samples' },
    ],
    Resources: [
      { label: 'Installation Guides', href: '/guides?category=installation' },
      { label: 'Tile Calculator', href: '/calculators' },
      { label: 'Project Gallery', href: '/projects' },
      { label: 'Design Ideas', href: '/guides' },
      { label: 'Technical Specs', href: '/guides?category=technical' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Showrooms', href: '/showrooms' },
      { label: 'For Professionals', href: '/pro' },
      { label: 'Careers', href: '/careers' },
    ],
    Support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping & Returns', href: '/shipping' },
      { label: 'Warranty', href: '/warranty' },
      { label: 'Care & Maintenance', href: '/guides?category=maintenance' },
      { label: 'Track Order', href: '/account/orders' },
    ],
  };

  return (
    <footer className="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] mt-24">
      <div className="container section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-y border-[var(--color-border)]">
          <div className="max-w-2xl">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-[var(--color-text-tertiary)] mb-4">
              Get design inspiration, exclusive offers, and tile care tips delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-[var(--color-bg-tertiary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[var(--color-accent-emerald)] text-white rounded-lg hover:bg-[var(--color-accent-emerald-hover)] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-accent-emerald)] to-[var(--color-accent-brass)] rounded"></div>
              <span>TileShop</span>
            </Link>
            <p className="text-sm text-[var(--color-text-tertiary)]">
              © {new Date().getFullYear()} TileShop. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-wrap justify-center gap-6 text-sm text-[var(--color-text-tertiary)]">
          <Link href="/privacy" className="hover:text-[var(--color-text-primary)] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--color-text-primary)] transition-colors">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-[var(--color-text-primary)] transition-colors">
            Cookie Policy
          </Link>
          <Link href="/accessibility" className="hover:text-[var(--color-text-primary)] transition-colors">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}
