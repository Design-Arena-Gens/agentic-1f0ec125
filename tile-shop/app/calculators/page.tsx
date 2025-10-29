'use client';

import { useState } from 'react';
import { calculateTileQuantity, formatPrice } from '@/lib/utils';
import Button from '@/components/Button';
import { Calculator, Ruler, DollarSign } from 'lucide-react';

export default function CalculatorsPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [tileWidth, setTileWidth] = useState('60');
  const [tileLength, setTileLength] = useState('60');
  const [tilePrice, setTilePrice] = useState('45');
  const [wasteFactor, setWasteFactor] = useState('10');

  const area = length && width ? parseFloat(length) * parseFloat(width) : 0;

  const calculation = area > 0 ? calculateTileQuantity(
    area,
    parseFloat(tileWidth),
    parseFloat(tileLength),
    parseFloat(wasteFactor) / 100
  ) : null;

  const totalCost = calculation ? calculation.cartons * parseFloat(tilePrice) : 0;

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-accent-emerald)]/10 mb-4">
            <Calculator className="w-8 h-8 text-[var(--color-accent-emerald)]" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Tile Calculator</h1>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Calculate exactly how many tiles you need for your project, including wastage allowance
          </p>
        </div>

        <div className="bg-[var(--color-bg-secondary)] rounded-xl p-8 shadow-[var(--shadow-lg)]">
          <div className="space-y-8">
            {/* Room Dimensions */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-5 h-5 text-[var(--color-accent-emerald)]" />
                <h2 className="text-xl font-semibold">Room Dimensions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Length (meters)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g., 5.5"
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
                    step="0.1"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Width (meters)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="e.g., 4.0"
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>
              {area > 0 && (
                <div className="mt-3 p-3 bg-[var(--color-accent-emerald)]/10 rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">Total Area: </span>
                  <span className="font-semibold">{area.toFixed(2)} m²</span>
                </div>
              )}
            </div>

            {/* Tile Specifications */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-[var(--color-accent-emerald)]" />
                <h2 className="text-xl font-semibold">Tile Specifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tile Width (cm)</label>
                  <input
                    type="number"
                    value={tileWidth}
                    onChange={(e) => setTileWidth(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tile Length (cm)</label>
                  <input
                    type="number"
                    value={tileLength}
                    onChange={(e) => setTileLength(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Wastage */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-[var(--color-accent-emerald)]" />
                <h2 className="text-xl font-semibold">Pricing & Wastage</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price per Carton ($)</label>
                  <input
                    type="number"
                    value={tilePrice}
                    onChange={(e) => setTilePrice(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Wastage Factor (%)</label>
                  <select
                    value={wasteFactor}
                    onChange={(e) => setWasteFactor(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-emerald)]"
                  >
                    <option value="5">5% (Straight lay, experienced installer)</option>
                    <option value="10">10% (Standard, recommended)</option>
                    <option value="15">15% (Diagonal lay, complex pattern)</option>
                    <option value="20">20% (Intricate pattern, inexperienced)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            {calculation && (
              <div className="bg-gradient-to-br from-[var(--color-accent-emerald)] to-[var(--color-accent-brass)] text-white rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Your Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Tiles Needed</div>
                    <div className="text-3xl font-bold">{calculation.tilesNeeded}</div>
                    <div className="text-xs opacity-75 mt-1">including {wasteFactor}% wastage</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Cartons Required</div>
                    <div className="text-3xl font-bold">{calculation.cartons}</div>
                    <div className="text-xs opacity-75 mt-1">{calculation.tilesPerCarton} tiles per carton</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Estimated Total</div>
                    <div className="text-3xl font-bold">{formatPrice(totalCost)}</div>
                    <div className="text-xs opacity-75 mt-1">excluding delivery</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-start gap-2 text-sm opacity-90">
                    <span>💡</span>
                    <p>
                      <strong>Tip:</strong> Always order a few extra cartons for replacements and future repairs.
                      Tile batches can vary slightly in color and texture.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!calculation && (
              <div className="text-center py-8 text-[var(--color-text-tertiary)]">
                Enter your room dimensions to see the calculation
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
            <h3 className="font-semibold mb-3">Common Tile Sizes</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Small Format:</span>
                <span className="text-[var(--color-text-tertiary)]">20x20, 30x30 cm</span>
              </li>
              <li className="flex justify-between">
                <span>Medium Format:</span>
                <span className="text-[var(--color-text-tertiary)]">40x60, 60x60 cm</span>
              </li>
              <li className="flex justify-between">
                <span>Large Format:</span>
                <span className="text-[var(--color-text-tertiary)]">60x120, 80x160 cm</span>
              </li>
              <li className="flex justify-between">
                <span>Planks:</span>
                <span className="text-[var(--color-text-tertiary)]">15x90, 20x120 cm</span>
              </li>
            </ul>
          </div>

          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
            <h3 className="font-semibold mb-3">When to Add Extra Wastage</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>• Rooms with many corners or angles</li>
              <li>• Diagonal or herringbone patterns</li>
              <li>• Working with large format tiles</li>
              <li>• First-time DIY installation</li>
              <li>• Tiles with complex patterns to match</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
