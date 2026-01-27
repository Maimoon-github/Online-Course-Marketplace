import { Search, TrendingUp, Users, Award, Zap, Globe, BookOpen, Star, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { BentoGrid, BentoItem } from '@/app/components/BentoGrid';
import { CourseCard, Course } from '@/app/components/CourseCard';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HomeProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function Home({ onNavigate }: HomeProps) {
  // Mock data
  const featuredCourses: Course[] = [
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
  ];

  const categories = [
    { name: 'Development', icon: BookOpen, count: 1234, color: 'from-blue-500/20 to-blue-600/20' },
    { name: 'Design', icon: Award, count: 892, color: 'from-purple-500/20 to-purple-600/20' },
    { name: 'Business', icon: TrendingUp, count: 645, color: 'from-green-500/20 to-green-600/20' },
    { name: 'Marketing', icon: Users, count: 534, color: 'from-orange-500/20 to-orange-600/20' },
    { name: 'Data Science', icon: Zap, count: 423, color: 'from-cyan-500/20 to-cyan-600/20' },
    { name: 'Languages', icon: Globe, count: 356, color: 'from-pink-500/20 to-pink-600/20' },
  ];

  const stats = [
    { value: '50M+', label: 'Students Worldwide', icon: Users },
    { value: '15K+', label: 'Expert Instructors', icon: Award },
    { value: '100K+', label: 'Premium Courses', icon: BookOpen },
    { value: '4.8/5', label: 'Average Rating', icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Bento Grid Layout */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#3B8075]/20 text-[#3B8075] border-[#3B8075]/30">
            Trusted by millions of learners
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#E5E7EB] mb-6 max-w-4xl mx-auto">
            Master Skills,
            <br />
            <span className="bg-gradient-to-r from-[#4A90E2] via-[#66A5AD] to-[#3B8075] bg-clip-text text-transparent">
              Transform Your Career
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
            Learn from world-class instructors. 100,000+ courses in development, design, business, and more.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#9CA3AF]" />
              <Input
                placeholder="What do you want to learn today?"
                className="pl-12 pr-32 h-14 bg-[#1F2937] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20 text-base"
              />
              <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
                onClick={() => onNavigate?.('courses')}
              >
                Explore
              </Button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-[#9CA3AF]">Popular:</span>
            {['Web Development', 'UI/UX Design', 'Python', 'Marketing'].map((topic) => (
              <button
                key={topic}
                className="px-3 py-1 rounded-full bg-[#1F2937] text-sm text-[#E5E7EB] hover:bg-[#4A90E2]/20 hover:text-[#4A90E2] border border-white/5 hover:border-[#4A90E2]/30 transition-all"
                onClick={() => onNavigate?.('courses', { search: topic })}
              >
                {topic}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid - Categories & Features */}
        <BentoGrid className="mb-16">
          {/* Large Feature - Video Preview */}
          <BentoItem className="md:col-span-2 lg:col-span-2 md:row-span-2">
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-[#E5E7EB] mb-4">
                World-Class Learning Experience
              </h3>
              <div className="flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-[#4A90E2]/20 to-[#3B8075]/20 mb-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Students learning"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="size-16 rounded-full bg-[#4A90E2] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                    <Play className="size-8 text-white ml-1" fill="white" />
                  </button>
                </div>
              </div>
              <p className="text-[#9CA3AF]">
                Join millions of learners mastering new skills with our expert instructors
              </p>
            </div>
          </BentoItem>

          {/* Stats Grid */}
          {stats.slice(0, 2).map((stat, index) => (
            <BentoItem key={stat.label} gradient="bg-gradient-to-br from-[#4A90E2] to-[#3B8075]">
              <div className="flex flex-col items-center text-center py-4">
                <stat.icon className="size-8 text-[#4A90E2] mb-3" />
                <div className="text-3xl font-bold text-[#E5E7EB] mb-2">{stat.value}</div>
                <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
              </div>
            </BentoItem>
          ))}

          {/* Categories */}
          {categories.slice(0, 2).map((category) => (
            <BentoItem key={category.name}>
              <button
                onClick={() => onNavigate?.('courses', { category: category.name })}
                className="w-full text-left group"
              >
                <div className={`size-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="size-6 text-[#E5E7EB]" />
                </div>
                <h4 className="font-semibold text-[#E5E7EB] mb-1 group-hover:text-[#4A90E2] transition-colors">
                  {category.name}
                </h4>
                <p className="text-sm text-[#9CA3AF]">{category.count} courses</p>
              </button>
            </BentoItem>
          ))}

          {/* More Stats */}
          {stats.slice(2).map((stat) => (
            <BentoItem key={stat.label} gradient="bg-gradient-to-br from-[#3B8075] to-[#66A5AD]">
              <div className="flex flex-col items-center text-center py-4">
                <stat.icon className="size-8 text-[#4A90E2] mb-3" />
                <div className="text-3xl font-bold text-[#E5E7EB] mb-2">{stat.value}</div>
                <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
              </div>
            </BentoItem>
          ))}
        </BentoGrid>
      </section>

      {/* Featured Courses */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#16213E]/30 rounded-3xl mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#E5E7EB] mb-2">Featured Courses</h2>
            <p className="text-[#9CA3AF]">Handpicked courses to help you excel</p>
          </div>
          <Button
            variant="ghost"
            className="text-[#4A90E2] hover:bg-[#4A90E2]/10"
            onClick={() => onNavigate?.('courses')}
          >
            View All
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard
                course={course}
                onCourseClick={(id) => onNavigate?.('course-detail', { id })}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Categories */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#E5E7EB] mb-4">Explore Top Categories</h2>
          <p className="text-[#9CA3AF]">Discover courses across all major disciplines</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onNavigate?.('courses', { category: category.name })}
              className="bg-[#1F2937] rounded-xl p-6 border border-white/5 hover:border-[#4A90E2]/30 hover:shadow-lg hover:shadow-[#4A90E2]/10 transition-all group"
            >
              <div className={`size-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                <category.icon className="size-6 text-[#E5E7EB]" />
              </div>
              <h4 className="font-semibold text-[#E5E7EB] mb-1 group-hover:text-[#4A90E2] transition-colors">
                {category.name}
              </h4>
              <p className="text-xs text-[#9CA3AF]">{category.count} courses</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-[#4A90E2] to-[#3B8075] rounded-3xl p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of learners and start your journey today with a 7-day free trial
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-[#4A90E2] hover:bg-white/90 font-semibold"
                onClick={() => onNavigate?.('login')}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => onNavigate?.('courses')}
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
