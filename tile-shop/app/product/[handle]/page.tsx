'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/data';
import { formatPrice, calculateTileQuantity } from '@/lib/utils';
import Button from '@/components/Button';
import { ShoppingCart, Heart, Ruler, Package, Truck, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = mockProducts.find(p => p.handle === params.handle);

  if (!product) {
    notFound();
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [currentImage, setCurrentImage] = useState(0);
  const [areaSize, setAreaSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const calculation = areaSize ? calculateTileQuantity(
    parseFloat(areaSize),
    parseInt(product.size.split('x')[0]),
    parseInt(product.size.split('x')[1])
  ) : null;

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] mb-8">
        <Link href="/" className="hover:text-[var(--color-text-primary)]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/shop" className="hover:text-[var(--color-text-primary)]">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[var(--color-text-primary)]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)]"
          >
            <img
              src={product.images[currentImage]?.src || `https://placehold.co/800x800/F7F7F5/8C8C84?text=${encodeURIComponent(product.name)}`}
              alt={product.images[currentImage]?.alt || product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/800x800/F7F7F5/8C8C84?text=${encodeURIComponent(product.name)}`;
              }}
            />
          </motion.div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImage
                      ? 'border-[var(--color-accent-emerald)]'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text-tertiary)]'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/200x200/F7F7F5/8C8C84?text=${idx + 1}`;
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex gap-2 mb-4">
            {product.isBestSeller && (
              <span className="px-3 py-1 text-xs font-semibold bg-[var(--color-accent-brass)] text-white rounded-full">
                Best Seller
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 text-xs font-semibold bg-[var(--color-accent-emerald)] text-white rounded-full">
                New
              </span>
            )}
            {product.sampleAvailable && (
              <span className="px-3 py-1 text-xs font-semibold border border-[var(--color-border)] rounded-full">
                Sample Available
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(selectedVariant.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xl text-[var(--color-text-tertiary)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm text-[var(--color-text-tertiary)]">per m²</span>
          </div>

          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border-2 rounded-lg transition-all ${
                      selectedVariant.id === variant.id
                        ? 'border-[var(--color-accent-emerald)] bg-[var(--color-accent-emerald)]/5'
                        : 'border-[var(--color-border)] hover:border-[var(--color-text-tertiary)]'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Quantity (cartons)</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[var(--color-border)] rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-[var(--color-border)] py-2 focus:outline-none"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-[var(--color-text-tertiary)]">
                {product.piecesPerCarton} tiles per carton • {product.coveragePerCarton} m² coverage
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button size="lg" variant="primary" className="flex-1">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            {product.sampleAvailable && (
              <Link href="/samples" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  Order Sample
                </Button>
              </Link>
            )}
            <Button size="lg" variant="ghost" className="px-4">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Stock Status */}
          <div className={`flex items-center gap-2 mb-8 text-sm ${
            product.inStock ? 'text-[var(--color-accent-emerald)]' : 'text-[var(--color-accent-terracotta)]'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              product.inStock ? 'bg-[var(--color-accent-emerald)]' : 'bg-[var(--color-accent-terracotta)]'
            }`}></div>
            {product.inStock ? 'In Stock - Ships within 2-3 days' : 'Out of Stock'}
          </div>

          {/* Calculator */}
          <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-[var(--color-accent-emerald)]" />
              <h3 className="font-semibold">Tile Calculator</h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Enter your room area to calculate how many tiles you need (includes 10% wastage)
            </p>
            <div className="flex gap-3 mb-4">
              <input
                type="number"
                value={areaSize}
                onChange={(e) => setAreaSize(e.target.value)}
                placeholder="Enter area in m²"
                className="flex-1 px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
              />
              <Button variant="primary">Calculate</Button>
            </div>
            {calculation && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-tertiary)]">Tiles needed:</span>
                  <span className="font-semibold">{calculation.tilesNeeded} tiles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-tertiary)]">Cartons required:</span>
                  <span className="font-semibold">{calculation.cartons} cartons</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--color-border)]">
                  <span className="text-[var(--color-text-tertiary)]">Estimated total:</span>
                  <span className="font-bold text-lg">{formatPrice(calculation.cartons * selectedVariant.price)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Trust Icons */}
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <Package className="w-6 h-6 mx-auto mb-2 text-[var(--color-accent-emerald)]" />
              <div className="font-medium">Free Samples</div>
            </div>
            <div>
              <Truck className="w-6 h-6 mx-auto mb-2 text-[var(--color-accent-emerald)]" />
              <div className="font-medium">Fast Delivery</div>
            </div>
            <div>
              <Shield className="w-6 h-6 mx-auto mb-2 text-[var(--color-accent-emerald)]" />
              <div className="font-medium">10-Year Warranty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-[var(--color-bg-secondary)] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Size</div>
            <div className="font-semibold">{product.size} cm</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Thickness</div>
            <div className="font-semibold">{product.thickness} mm</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Material</div>
            <div className="font-semibold">{product.material}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Finish</div>
            <div className="font-semibold">{product.finish}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Edge</div>
            <div className="font-semibold">{product.edge}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">PEI Rating</div>
            <div className="font-semibold">{product.pei}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Slip Rating</div>
            <div className="font-semibold">{product.slipRating}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Water Absorption</div>
            <div className="font-semibold">{product.waterAbsorption}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Underfloor Heating</div>
            <div className="font-semibold">{product.underfloorHeating ? 'Compatible' : 'Not Compatible'}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Pieces per Carton</div>
            <div className="font-semibold">{product.piecesPerCarton}</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Coverage per Carton</div>
            <div className="font-semibold">{product.coveragePerCarton} m²</div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-tertiary)] mb-1">Weight per Carton</div>
            <div className="font-semibold">{product.weightPerCarton} kg</div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
          <h3 className="font-semibold mb-3">Suitable Applications</h3>
          <div className="flex flex-wrap gap-2">
            {product.applications.map(app => (
              <span
                key={app}
                className="px-3 py-1.5 bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)] rounded-full text-sm"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
