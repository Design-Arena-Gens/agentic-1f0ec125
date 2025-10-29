import Link from 'next/link';
import { mockCollections } from '@/lib/data';

export default function CollectionsPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Tile Collections</h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Curated collections of premium tiles, each designed to bring a unique aesthetic to your space
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockCollections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.handle}`}>
            <div className="group">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)] mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-[var(--color-accent-emerald)]/0 group-hover:bg-[var(--color-accent-emerald)]/10 transition-colors duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full mb-3">
                    {collection.style}
                  </span>
                  <h2 className="text-white text-2xl font-bold">{collection.name}</h2>
                </div>
              </div>
              <p className="text-[var(--color-text-secondary)] line-clamp-2 group-hover:text-[var(--color-text-primary)] transition-colors">
                {collection.description}
              </p>
              <p className="text-sm text-[var(--color-text-tertiary)] mt-2">
                {collection.products.length} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
