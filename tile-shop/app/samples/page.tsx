'use client';

import { useState } from 'react';
import { mockProducts } from '@/lib/data';
import Button from '@/components/Button';
import { Package, Truck, X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SamplesPage() {
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const maxSamples = 5;

  const toggleSample = (productId: string) => {
    if (selectedSamples.includes(productId)) {
      setSelectedSamples(selectedSamples.filter(id => id !== productId));
    } else if (selectedSamples.length < maxSamples) {
      setSelectedSamples([...selectedSamples, productId]);
    }
  };

  const availableProducts = mockProducts.filter(p => p.sampleAvailable);

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-emerald)]/10 mb-4">
            <Package className="w-8 h-8 text-[var(--color-accent-emerald)]" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Free Samples</h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Select up to {maxSamples} tile samples to see and feel the quality before making your decision.
            Free delivery included!
          </p>
        </div>

        {/* Sample Counter */}
        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 mb-8 shadow-[var(--shadow-md)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Your Sample Selection</h2>
              <p className="text-sm text-[var(--color-text-tertiary)]">
                {selectedSamples.length} of {maxSamples} samples selected
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: maxSamples }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx < selectedSamples.length
                        ? 'bg-[var(--color-accent-emerald)]'
                        : 'bg-[var(--color-border)]'
                    }`}
                  />
                ))}
              </div>
              {selectedSamples.length > 0 && (
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => {
                    // Handle checkout
                    alert('Sample order functionality would be implemented here');
                  }}
                >
                  Request Samples ({selectedSamples.length})
                </Button>
              )}
            </div>
          </div>

          {selectedSamples.length === maxSamples && (
            <div className="mt-4 p-3 bg-[var(--color-accent-brass)]/10 rounded-lg text-sm">
              You've reached the maximum number of samples. Remove one to add another.
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center">
            <Package className="w-10 h-10 text-[var(--color-accent-emerald)] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Free Samples</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Up to {maxSamples} samples at no cost
            </p>
          </div>
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center">
            <Truck className="w-10 h-10 text-[var(--color-accent-emerald)] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Free Delivery</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Delivered to your door within 3-5 days
            </p>
          </div>
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center">
            <CheckCircle className="w-10 h-10 text-[var(--color-accent-emerald)] mx-auto mb-3" />
            <h3 className="font-semibold mb-2">No Obligation</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Test at home with no commitment to buy
            </p>
          </div>
        </div>

        {/* Available Samples */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Samples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProducts.map((product, idx) => {
              const isSelected = selectedSamples.includes(product.id);
              const canSelect = selectedSamples.length < maxSamples || isSelected;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`relative bg-[var(--color-bg-secondary)] rounded-xl overflow-hidden shadow-[var(--shadow-md)] transition-all ${
                    isSelected ? 'ring-2 ring-[var(--color-accent-emerald)]' : ''
                  } ${!canSelect ? 'opacity-50' : ''}`}
                >
                  <div className="relative aspect-square bg-[var(--color-bg-tertiary)]">
                    <img
                      src={product.images[0]?.src || `https://placehold.co/400x400/F7F7F5/8C8C84?text=${encodeURIComponent(product.name)}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x400/F7F7F5/8C8C84?text=${encodeURIComponent(product.name)}`;
                      }}
                    />
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-[var(--color-accent-emerald)] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-[var(--color-text-tertiary)] mb-3">
                      {product.size} • {product.finish}
                    </p>

                    <button
                      onClick={() => canSelect && toggleSample(product.id)}
                      disabled={!canSelect}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        isSelected
                          ? 'bg-[var(--color-accent-emerald)] text-white hover:bg-[var(--color-accent-emerald-hover)]'
                          : canSelect
                          ? 'border-2 border-[var(--color-border)] hover:border-[var(--color-accent-emerald)] hover:text-[var(--color-accent-emerald)]'
                          : 'border-2 border-[var(--color-border)] cursor-not-allowed'
                      }`}
                    >
                      {isSelected ? (
                        <span className="flex items-center justify-center gap-2">
                          <X className="w-4 h-4" />
                          Remove
                        </span>
                      ) : (
                        'Add Sample'
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-[var(--color-bg-tertiary)] rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Sample Size</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Each sample is approximately 10x10 cm, showing the true color, texture, and finish of the tile.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Delivery Time</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Samples typically arrive within 3-5 business days. You'll receive a tracking number via email.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Testing Tips</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                View samples in the actual room under different lighting conditions. Test how they feel underfoot.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Returns</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                No need to return samples! Keep them for reference or share with your designer or contractor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
