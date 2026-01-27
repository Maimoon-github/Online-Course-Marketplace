import { CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CheckoutProps {
  onNavigate?: (page: string) => void;
}

export function Checkout({ onNavigate }: CheckoutProps) {
  const [step, setStep] = useState<'payment' | 'success'>('payment');

  const cartItems = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp 2026',
      price: 89.99,
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      price: 79.99,
    },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="size-24 rounded-full bg-gradient-to-br from-[#3B8075] to-[#66A5AD] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-12 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-[#E5E7EB] mb-4">Purchase Successful!</h1>
          <p className="text-lg text-[#9CA3AF] mb-8">
            Thank you for your purchase. You now have access to your courses!
          </p>

          <div className="bg-[#1F2937] rounded-xl p-8 border border-white/5 mb-8">
            <h3 className="font-semibold text-[#E5E7EB] mb-4">Order Details</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-[#9CA3AF]">
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#E5E7EB]">Total Paid</span>
              <span className="text-2xl font-bold text-[#E5E7EB]">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
              onClick={() => onNavigate?.('dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-white/10 text-[#E5E7EB] hover:bg-[#1F2937]"
              onClick={() => onNavigate?.('my-courses')}
            >
              Start Learning
            </Button>
          </div>

          <p className="text-sm text-[#9CA3AF] mt-8">
            A confirmation email has been sent to your inbox with your receipt and course access details.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#E5E7EB] mb-8">Secure Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Information */}
              <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                <h2 className="text-xl font-semibold text-[#E5E7EB] mb-6">Billing Information</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Country</label>
                  <select className="w-full px-3 py-2 bg-[#16213E] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                <h2 className="text-xl font-semibold text-[#E5E7EB] mb-6">Payment Method</h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9CA3AF]" />
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="pl-10 bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                      Expiry Date
                    </label>
                    <Input
                      placeholder="MM/YY"
                      className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#E5E7EB] mb-2">CVV</label>
                    <Input
                      placeholder="123"
                      className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-[#4A90E2]/10 border border-[#4A90E2]/20 rounded-lg text-sm text-[#9CA3AF]">
                  <Lock className="size-4 text-[#4A90E2]" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white h-12"
              >
                Complete Purchase - ${total.toFixed(2)}
              </Button>

              <p className="text-xs text-center text-[#9CA3AF]">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5 sticky top-24">
              <h3 className="font-semibold text-[#E5E7EB] mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <div className="text-sm text-[#E5E7EB] mb-1">{item.title}</div>
                    <div className="text-sm text-[#9CA3AF]">${item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-[#E5E7EB]">Total</span>
                <span className="text-2xl font-bold text-[#E5E7EB]">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
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
                  <span>Full Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
