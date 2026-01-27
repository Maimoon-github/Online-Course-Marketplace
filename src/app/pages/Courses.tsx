import { useState } from 'react';
import { Search, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Slider } from '@/app/components/ui/slider';
import { CourseCard, Course } from '@/app/components/CourseCard';
import { motion, AnimatePresence } from 'motion/react';

interface CoursesProps {
  onNavigate?: (page: string, data?: any) => void;
  initialFilters?: {
    search?: string;
    category?: string;
  };
}

export function Courses({ onNavigate, initialFilters }: CoursesProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.category ? [initialFilters.category] : []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('popular');

  // Mock data
  const allCourses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp 2026',
      instructor: 'Dr. Angela Yu',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      rating: 4.8,
      reviewCount: 45280,
      studentCount: 234567,
      duration: '52 hours',
      level: 'Beginner',
      price: 89.99,
      originalPrice: 129.99,
      category: 'Development',
      isBestseller: true,
    },
    {
      id: '2',
      title: 'Machine Learning & AI Masterclass',
      instructor: 'Andrew Ng',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      rating: 4.9,
      reviewCount: 32150,
      studentCount: 156432,
      duration: '38 hours',
      level: 'Advanced',
      price: 99.99,
      category: 'Data Science',
      isNew: true,
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      rating: 4.7,
      reviewCount: 18920,
      studentCount: 89234,
      duration: '24 hours',
      level: 'Intermediate',
      price: 79.99,
      originalPrice: 119.99,
      category: 'Design',
      isBestseller: true,
    },
    {
      id: '4',
      title: 'Digital Marketing Mastery',
      instructor: 'Neil Patel',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      rating: 4.6,
      reviewCount: 25340,
      studentCount: 112456,
      duration: '18 hours',
      level: 'Beginner',
      price: 69.99,
      category: 'Marketing',
    },
    {
      id: '5',
      title: 'Python Programming Masterclass',
      instructor: 'Tim Buchalka',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
      rating: 4.8,
      reviewCount: 38920,
      studentCount: 189234,
      duration: '46 hours',
      level: 'Beginner',
      price: 84.99,
      originalPrice: 139.99,
      category: 'Development',
      isBestseller: true,
    },
    {
      id: '6',
      title: 'Data Science & Analytics Bootcamp',
      instructor: 'Jose Portilla',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      rating: 4.7,
      reviewCount: 29340,
      studentCount: 145678,
      duration: '42 hours',
      level: 'Intermediate',
      price: 94.99,
      category: 'Data Science',
    },
    {
      id: '7',
      title: 'React & Next.js - The Complete Guide',
      instructor: 'Maximilian Schwarzmüller',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      rating: 4.9,
      reviewCount: 41230,
      studentCount: 198765,
      duration: '48 hours',
      level: 'Intermediate',
      price: 89.99,
      originalPrice: 129.99,
      category: 'Development',
      isNew: true,
    },
    {
      id: '8',
      title: 'Graphic Design Masterclass',
      instructor: 'Lindsay Marsh',
      thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      rating: 4.6,
      reviewCount: 15890,
      studentCount: 67234,
      duration: '28 hours',
      level: 'Beginner',
      price: 74.99,
      category: 'Design',
    },
  ];

  const categories = ['Development', 'Design', 'Business', 'Marketing', 'Data Science', 'Languages'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const ratings = ['4.5+', '4.0+', '3.5+'];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleRating = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedRatings([]);
    setPriceRange([0, 200]);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedLevels.length > 0 ||
    selectedRatings.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 200 ||
    searchQuery;

  const activeFilterCount =
    selectedCategories.length + selectedLevels.length + selectedRatings.length;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-2">
            Explore Courses
          </h1>
          <p className="text-[#9CA3AF]">
            {allCourses.length.toLocaleString()} courses available
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9CA3AF]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for courses..."
              className="pl-10 bg-[#1F2937] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            className="border-white/10 text-[#E5E7EB] hover:bg-[#1F2937] lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="size-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-[#4A90E2] border-0">{activeFilterCount}</Badge>
            )}
          </Button>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#9CA3AF] whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#1F2937] border border-white/10 rounded-lg text-[#E5E7EB] focus:border-[#4A90E2] focus:outline-none focus:ring-2 focus:ring-[#4A90E2]/20"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-[#9CA3AF]">Active filters:</span>
            {selectedCategories.map((cat) => (
              <Badge
                key={cat}
                className="bg-[#4A90E2]/20 text-[#4A90E2] border-[#4A90E2]/30 cursor-pointer hover:bg-[#4A90E2]/30"
                onClick={() => toggleCategory(cat)}
              >
                {cat}
                <X className="size-3 ml-1" />
              </Badge>
            ))}
            {selectedLevels.map((level) => (
              <Badge
                key={level}
                className="bg-[#66A5AD]/20 text-[#66A5AD] border-[#66A5AD]/30 cursor-pointer hover:bg-[#66A5AD]/30"
                onClick={() => toggleLevel(level)}
              >
                {level}
                <X className="size-3 ml-1" />
              </Badge>
            ))}
            {selectedRatings.map((rating) => (
              <Badge
                key={rating}
                className="bg-[#3B8075]/20 text-[#3B8075] border-[#3B8075]/30 cursor-pointer hover:bg-[#3B8075]/30"
                onClick={() => toggleRating(rating)}
              >
                {rating} stars
                <X className="size-3 ml-1" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-[#9CA3AF] hover:text-[#E5E7EB]"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="w-full lg:w-64 shrink-0 space-y-6"
              >
                {/* Category Filter */}
                <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                  <h3 className="font-semibold text-[#E5E7EB] mb-4">Category</h3>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <Checkbox
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="border-white/20 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]"
                        />
                        <span className="text-sm text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                  <h3 className="font-semibold text-[#E5E7EB] mb-4">Level</h3>
                  <div className="space-y-3">
                    {levels.map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer group">
                        <Checkbox
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => toggleLevel(level)}
                          className="border-white/20 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]"
                        />
                        <span className="text-sm text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                  <h3 className="font-semibold text-[#E5E7EB] mb-4">Rating</h3>
                  <div className="space-y-3">
                    {ratings.map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                        <Checkbox
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => toggleRating(rating)}
                          className="border-white/20 data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]"
                        />
                        <span className="text-sm text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">
                          {rating} stars
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                  <h3 className="font-semibold text-[#E5E7EB] mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-[#9CA3AF]">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Courses Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard
                    course={course}
                    onCourseClick={(id) => onNavigate?.('course-detail', { id })}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button variant="outline" className="border-white/10 text-[#E5E7EB] hover:bg-[#1F2937]">
                Previous
              </Button>
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? 'default' : 'outline'}
                  className={
                    page === 1
                      ? 'bg-[#4A90E2] hover:bg-[#4A90E2]/90'
                      : 'border-white/10 text-[#E5E7EB] hover:bg-[#1F2937]'
                  }
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" className="border-white/10 text-[#E5E7EB] hover:bg-[#1F2937]">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
