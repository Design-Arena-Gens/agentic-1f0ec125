import Link from 'next/link';
import { mockGuides } from '@/lib/data';
import { Clock, BookOpen } from 'lucide-react';

export default function GuidesPage() {
  const categories = ['All', 'Installation', 'Selection', 'Maintenance', 'Design', 'Technical'];

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-emerald)]/10 mb-4">
          <BookOpen className="w-8 h-8 text-[var(--color-accent-emerald)]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Tile Guides & Resources</h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Expert advice, how-to guides, and inspiration to help you choose and install the perfect tiles
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-12 justify-center flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full transition-colors ${
              category === 'All'
                ? 'bg-[var(--color-accent-emerald)] text-white'
                : 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent-emerald)]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockGuides.map((guide) => (
          <Link key={guide.id} href={`/guides/${guide.slug}`}>
            <div className="group bg-[var(--color-bg-secondary)] rounded-xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-all">
              <div className="relative aspect-video bg-[var(--color-bg-tertiary)]">
                <div className="absolute inset-0 bg-[var(--color-accent-emerald)]/0 group-hover:bg-[var(--color-accent-emerald)]/10 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium rounded-full">
                    {guide.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-[var(--color-text-tertiary)]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {guide.readTime} min read
                  </div>
                  <span>•</span>
                  <span>{new Date(guide.publishedAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-accent-emerald)] transition-colors line-clamp-2">
                  {guide.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Topics */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Tile Installation',
            'Grouting Tips',
            'Choosing Colors',
            'Bathroom Design',
            'Kitchen Backsplash',
            'Outdoor Tiles',
            'Maintenance Guide',
            'Pattern Ideas',
          ].map((topic) => (
            <Link
              key={topic}
              href={`/guides?topic=${topic.toLowerCase().replace(' ', '-')}`}
              className="p-4 bg-[var(--color-bg-secondary)] rounded-lg text-center hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <span className="font-medium">{topic}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
