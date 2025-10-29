'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { mockProducts, mockCollections, mockGuides } from '@/lib/data';
import { ArrowRight, Calculator, Truck, Shield, Wrench } from 'lucide-react';

export default function Home() {
  const featuredProducts = mockProducts.filter(p => p.isBestSeller || p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--color-bg-tertiary)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-emerald)]/20 to-[var(--color-accent-brass)]/20"></div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Transform Your Space<br />
            <span className="text-[var(--color-accent-emerald)]">With Premium Tiles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto"
          >
            Discover our curated collection of porcelain, ceramic, and natural stone tiles.
            Premium quality, stunning designs, delivered to your door.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link href="/shop">
              <Button size="lg" variant="primary">
                Explore Collections <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/samples">
              <Button size="lg" variant="outline">
                Order Samples
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop by Style */}
      <section className="section-padding bg-[var(--color-bg-primary)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Style</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Find the perfect tiles to match your aesthetic
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Modern', 'Classic', 'Industrial', 'Minimal'].map((style, idx) => (
              <Link
                key={style}
                href={`/shop?style=${style.toLowerCase()}`}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative aspect-square rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="text-white font-semibold text-xl">{style}</h3>
                  </div>
                  <div className="absolute inset-0 bg-[var(--color-accent-emerald)]/0 group-hover:bg-[var(--color-accent-emerald)]/10 transition-colors duration-300"></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
              <p className="text-[var(--color-text-secondary)]">
                Our most popular tiles, loved by homeowners and professionals
              </p>
            </div>
            <Link href="/shop?sort=bestseller" className="hidden md:block">
              <Button variant="outline">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop?sort=bestseller">
              <Button variant="outline">
                View All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Room */}
      <section className="section-padding bg-[var(--color-bg-primary)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Room</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Browse tiles perfect for every space in your home
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Kitchen', 'Bathroom', 'Living Room', 'Outdoor', 'Commercial', 'Bedroom'].map((room, idx) => (
              <Link
                key={room}
                href={`/shop?room=${room.toLowerCase().replace(' ', '-')}`}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-lg">{room}</h3>
                  </div>
                  <div className="absolute inset-0 bg-[var(--color-accent-emerald)]/0 group-hover:bg-[var(--color-accent-emerald)]/10 transition-colors duration-300"></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Sample Delivery', description: 'Order up to 5 samples with free shipping' },
              { icon: Shield, title: '10-Year Warranty', description: 'All tiles covered by comprehensive warranty' },
              { icon: Calculator, title: 'Free Calculators', description: 'Estimate tiles needed and total cost' },
              { icon: Wrench, title: 'Installation Support', description: 'Expert guidance and professional services' },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-emerald)]/10 mb-4">
                  <feature.icon className="w-8 h-8 text-[var(--color-accent-emerald)]" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section-padding bg-[var(--color-bg-primary)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collections</h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Curated tile collections for every design vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockCollections.map((collection, idx) => (
              <Link key={collection.id} href={`/collections/${collection.handle}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)] mb-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-[var(--color-accent-emerald)]/0 group-hover:bg-[var(--color-accent-emerald)]/10 transition-colors duration-300"></div>
                  </div>
                  <h3 className="font-semibold text-xl mb-2 group-hover:text-[var(--color-accent-emerald)] transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {collection.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Guides */}
      <section className="section-padding bg-[var(--color-bg-secondary)]">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Guides & Inspiration</h2>
              <p className="text-[var(--color-text-secondary)]">
                Expert tips and design ideas for your next project
              </p>
            </div>
            <Link href="/guides" className="hidden md:block">
              <Button variant="outline">
                View All Guides <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockGuides.map((guide, idx) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)] mb-4">
                    <div className="absolute inset-0 bg-[var(--color-accent-emerald)]/0 group-hover:bg-[var(--color-accent-emerald)]/10 transition-colors duration-300"></div>
                  </div>
                  <div className="flex items-center gap-3 mb-2 text-sm text-[var(--color-text-tertiary)]">
                    <span>{guide.category}</span>
                    <span>•</span>
                    <span>{guide.readTime} min read</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--color-accent-emerald)] transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {guide.excerpt}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-[var(--color-accent-emerald)] to-[var(--color-accent-brass)] text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Sure Where to Start?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Order free samples or use our tile calculator to estimate your project needs
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/samples">
                <Button size="lg" variant="secondary">
                  Order Free Samples
                </Button>
              </Link>
              <Link href="/calculators">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-accent-emerald)]">
                  Use Calculator
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
