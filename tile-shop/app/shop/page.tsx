'use client';

import { useState, useMemo } from 'react';
import { mockProducts, sortOptions } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('bestseller');

  const materials = ['Porcelain', 'Ceramic', 'Natural Stone', 'Mosaic'];
  const finishes = ['Matte', 'Glossy', 'Textured', 'Polished'];
  const applications = ['Indoor', 'Outdoor', 'Bathroom', 'Kitchen', 'Commercial'];

  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(p => selectedMaterials.includes(p.material));
    }

    if (selectedFinishes.length > 0) {
      filtered = filtered.filter(p => selectedFinishes.includes(p.finish));
    }

    if (selectedApplications.length > 0) {
      filtered = filtered.filter(p =>
        p.applications.some(app => selectedApplications.includes(app))
      );
    }

    if (inStockOnly) {
      filtered = filtered.filter(p => p.inStock);
    }

    // Sort
    switch (sortBy) {
      case 'bestseller':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedMaterials, selectedFinishes, selectedApplications, inStockOnly, sortBy]);

  const toggleFilter = (value: string, state: string[], setState: (v: string[]) => void) => {
    if (state.includes(value)) {
      setState(state.filter(v => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedFinishes([]);
    setSelectedApplications([]);
    setInStockOnly(false);
  };

  const activeFilterCount = selectedMaterials.length + selectedFinishes.length + selectedApplications.length + (inStockOnly ? 1 : 0);

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shop All Tiles</h1>
        <p className="text-[var(--color-text-secondary)]">
          Browse our complete collection of premium floor and wall tiles
        </p>
      </div>

      {/* Filters & Sort Bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-[var(--color-accent-emerald)] text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-[var(--color-text-tertiary)]">
            {filteredProducts.length} products
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-[var(--color-text-tertiary)]">Active filters:</span>
          {selectedMaterials.map(m => (
            <button
              key={m}
              onClick={() => toggleFilter(m, selectedMaterials, setSelectedMaterials)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent-emerald)] text-white text-sm rounded-full"
            >
              {m}
              <X className="w-3 h-3" />
            </button>
          ))}
          {selectedFinishes.map(f => (
            <button
              key={f}
              onClick={() => toggleFilter(f, selectedFinishes, setSelectedFinishes)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent-emerald)] text-white text-sm rounded-full"
            >
              {f}
              <X className="w-3 h-3" />
            </button>
          ))}
          {selectedApplications.map(a => (
            <button
              key={a}
              onClick={() => toggleFilter(a, selectedApplications, setSelectedApplications)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent-emerald)] text-white text-sm rounded-full"
            >
              {a}
              <X className="w-3 h-3" />
            </button>
          ))}
          {inStockOnly && (
            <button
              onClick={() => setInStockOnly(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent-emerald)] text-white text-sm rounded-full"
            >
              In Stock Only
              <X className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--color-accent-terracotta)] hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block overflow-hidden"
            >
              <div className="w-[280px] space-y-6">
                {/* Material Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Material</h3>
                  <div className="space-y-2">
                    {materials.map(material => (
                      <label key={material} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
                          className="w-4 h-4 accent-[var(--color-accent-emerald)]"
                        />
                        <span className="text-sm">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Finish Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Finish</h3>
                  <div className="space-y-2">
                    {finishes.map(finish => (
                      <label key={finish} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFinishes.includes(finish)}
                          onChange={() => toggleFilter(finish, selectedFinishes, setSelectedFinishes)}
                          className="w-4 h-4 accent-[var(--color-accent-emerald)]"
                        />
                        <span className="text-sm">{finish}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Application Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Application</h3>
                  <div className="space-y-2">
                    {applications.map(app => (
                      <label key={app} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedApplications.includes(app)}
                          onChange={() => toggleFilter(app, selectedApplications, setSelectedApplications)}
                          className="w-4 h-4 accent-[var(--color-accent-emerald)]"
                        />
                        <span className="text-sm">{app}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={() => setInStockOnly(!inStockOnly)}
                      className="w-4 h-4 accent-[var(--color-accent-emerald)]"
                    />
                    <span className="text-sm font-medium">In Stock Only</span>
                  </label>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-[var(--color-accent-terracotta)] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-[var(--color-text-tertiary)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Try adjusting your filters to see more results
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
