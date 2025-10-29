'use client';

import { Product } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-shadow"
    >
      <Link href={`/product/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-tertiary)]">
          {product.images.length > 0 && (
            <motion.img
              key={currentImage}
              src={product.images[currentImage].src}
              alt={product.images[currentImage].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onError={(e) => {
                // Placeholder fallback
                e.currentTarget.src = `https://placehold.co/600x600/F7F7F5/8C8C84?text=${encodeURIComponent(product.name)}`;
              }}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestSeller && (
              <span className="px-2 py-1 text-xs font-semibold bg-[var(--color-accent-brass)] text-white rounded">
                Best Seller
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-1 text-xs font-semibold bg-[var(--color-accent-emerald)] text-white rounded">
                New
              </span>
            )}
            {product.compareAtPrice && (
              <span className="px-2 py-1 text-xs font-semibold bg-[var(--color-accent-terracotta)] text-white rounded">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
              className={cn(
                'p-2 rounded-full backdrop-blur-sm transition-colors',
                isFavorite
                  ? 'bg-[var(--color-accent-terracotta)] text-white'
                  : 'bg-white/80 text-[var(--color-text-primary)] hover:bg-white'
              )}
              aria-label="Add to favorites"
            >
              <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
            </button>
            <button
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-[var(--color-text-primary)] hover:bg-white transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Image Switcher */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImage(idx);
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    idx === currentImage
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  )}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Sample Available Badge */}
          {product.sampleAvailable && (
            <div className="absolute bottom-3 right-3 px-2 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm rounded">
              Sample Available
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.handle}`}>
          <div className="mb-2">
            <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-emerald)] transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
              {product.size} • {product.finish} • {product.material}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[var(--color-text-primary)]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[var(--color-text-tertiary)] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className={cn(
              'text-xs font-medium',
              product.inStock ? 'text-[var(--color-accent-emerald)]' : 'text-[var(--color-accent-terracotta)]'
            )}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>
        </Link>

        {/* Variant Switcher */}
        {product.variants.length > 1 && (
          <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
            <div className="flex gap-2 flex-wrap">
              {product.variants.slice(0, 3).map((variant) => (
                <button
                  key={variant.id}
                  className="px-2 py-1 text-xs border border-[var(--color-border)] rounded hover:border-[var(--color-text-primary)] transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {variant.finish || variant.size}
                </button>
              ))}
              {product.variants.length > 3 && (
                <span className="px-2 py-1 text-xs text-[var(--color-text-tertiary)]">
                  +{product.variants.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
