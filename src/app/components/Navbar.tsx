import { Search, ShoppingCart, User, Menu, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { motion } from 'motion/react';

interface NavbarProps {
  isLoggedIn?: boolean;
  cartCount?: number;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function Navbar({ isLoggedIn = false, cartCount = 0, onNavigate, currentPage = 'home' }: NavbarProps) {
  const navItems = [
    { label: 'Courses', value: 'courses' },
    { label: 'Categories', value: 'categories' },
    { label: 'Instructors', value: 'instructors' },
    { label: 'About', value: 'about' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#111827]/80"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#4A90E2] blur-lg opacity-50 group-hover:opacity-75 transition-opacity rounded-full" />
              <GraduationCap className="size-8 text-[#4A90E2] relative" />
            </div>
            <span className="font-semibold text-xl text-[#E5E7EB] hidden sm:block">
              LearnFlow
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate?.(item.value)}
                className={`text-sm font-medium transition-colors relative group ${
                  currentPage === item.value
                    ? 'text-[#E5E7EB]'
                    : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
                }`}
              >
                {item.label}
                {currentPage === item.value && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-[#4A90E2]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9CA3AF]" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-[#1F2937] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937]"
                  onClick={() => onNavigate?.('cart')}
                >
                  <ShoppingCart className="size-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-[#4A90E2] text-xs border-0">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937]"
                  onClick={() => onNavigate?.('dashboard')}
                >
                  <User className="size-5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-[#E5E7EB] hover:bg-[#1F2937] hidden sm:flex"
                  onClick={() => onNavigate?.('login')}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
                  onClick={() => onNavigate?.('login')}
                >
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#1F2937]"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
