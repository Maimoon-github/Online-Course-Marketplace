import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useState } from 'react';

interface CartProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function Cart({ onNavigate }: CartProps) {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      title: 'Complete Web Development Bootcamp 2026',
      instructor: 'Dr. Angela Yu',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviewCount: 45280,
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      price: 79.99,
      originalPrice: 119.99,
      rating: 4.7,
      reviewCount: 18920,
    },
  ]);

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0),
    0
  );
  const total = subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="size-24 rounded-full bg-[#1F2937] flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="size-12 text-[#9CA3AF]" />
          </div>
          <h2 className="text-2xl font-bold text-[#E5E7EB] mb-3">Your cart is empty</h2>
          <p className="text-[#9CA3AF] mb-8">
            Explore our courses and add your favorites to get started
          </p>
          <Button
            className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
            onClick={() => onNavigate?.('courses')}
          >
            Browse Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#E5E7EB] mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1F2937] rounded-xl p-6 border border-white/5"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-[#16213E]">
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <button
                      onClick={() => onNavigate?.('course-detail', { id: item.id })}
                      className="font-semibold text-[#E5E7EB] hover:text-[#4A90E2] transition-colors mb-1 text-left"
                    >
                      {item.title}
                    </button>
                    <p className="text-sm text-[#9CA3AF] mb-2">By {item.instructor}</p>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <span>{item.rating} ⭐</span>
                      <span>({item.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="text-right">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-bold text-[#E5E7EB]">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-[#9CA3AF] line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#702006] hover:text-[#702006] hover:bg-[#702006]/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="size-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5 sticky top-24">
              <h3 className="font-semibold text-[#E5E7EB] mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-[#3B8075]">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-[#E5E7EB]">Total</span>
                <span className="text-2xl font-bold text-[#E5E7EB]">${total.toFixed(2)}</span>
              </div>

              <Button
                className="w-full bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white h-12 mb-3"
                onClick={() => onNavigate?.('checkout')}
              >
                Proceed to Checkout
                <ArrowRight className="size-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/10 text-[#E5E7EB] hover:bg-[#16213E]"
                onClick={() => onNavigate?.('courses')}
              >
                Continue Shopping
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                  <div className="size-5 rounded-full bg-[#3B8075]/20 flex items-center justify-center">
                    <span className="text-[#3B8075]">✓</span>
                  </div>
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                  <div className="size-5 rounded-full bg-[#3B8075]/20 flex items-center justify-center">
                    <span className="text-[#3B8075]">✓</span>
                  </div>
                  <span>Instant Access After Purchase</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                  <div className="size-5 rounded-full bg-[#3B8075]/20 flex items-center justify-center">
                    <span className="text-[#3B8075]">✓</span>
                  </div>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
