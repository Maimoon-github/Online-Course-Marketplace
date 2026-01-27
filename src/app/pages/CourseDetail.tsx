import { Star, Users, Clock, Globe, Award, CheckCircle2, Play, Download, Heart, Share2, ChevronDown, BookOpen } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Progress } from '@/app/components/ui/progress';
import { CourseCard, Course } from '@/app/components/CourseCard';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useState } from 'react';

interface CourseDetailProps {
  courseId?: string;
  onNavigate?: (page: string, data?: any) => void;
}

export function CourseDetail({ courseId, onNavigate }: CourseDetailProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock course data
  const course = {
    id: courseId || '1',
    title: 'Complete Web Development Bootcamp 2026',
    subtitle: 'From Zero to Full-Stack Developer - HTML, CSS, JavaScript, React, Node.js, and More',
    instructor: {
      name: 'Dr. Angela Yu',
      title: 'Lead Developer & Instructor',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      bio: '10+ years of experience teaching web development to over 500,000 students worldwide.',
      students: 523456,
      courses: 12,
      rating: 4.8,
    },
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    previewVideo: '#',
    rating: 4.8,
    reviewCount: 45280,
    studentCount: 234567,
    duration: '52 hours',
    level: 'Beginner',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Development',
    language: 'English',
    lastUpdated: 'January 2026',
    isBestseller: true,
    certificateIncluded: true,
    outcomes: [
      'Build 16+ real-world projects including full-stack web applications',
      'Master HTML5, CSS3, JavaScript, React, and Node.js from scratch',
      'Understand modern web development workflows and best practices',
      'Deploy your applications to production using cloud platforms',
      'Learn responsive design and mobile-first development',
      'Build RESTful APIs and work with databases',
    ],
    requirements: [
      'No programming experience needed - beginner friendly',
      'A computer with internet connection',
      'Willingness to learn and practice coding',
    ],
    curriculum: [
      {
        title: 'Introduction to Web Development',
        lessons: 12,
        duration: '2 hours',
        lectures: [
          { title: 'What is Web Development?', duration: '10:24', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:32', preview: true },
          { title: 'Your First HTML Page', duration: '12:18', preview: false },
        ],
      },
      {
        title: 'HTML & CSS Fundamentals',
        lessons: 24,
        duration: '6 hours',
        lectures: [],
      },
      {
        title: 'JavaScript Essentials',
        lessons: 32,
        duration: '8 hours',
        lectures: [],
      },
      {
        title: 'React & Modern Frontend',
        lessons: 28,
        duration: '10 hours',
        lectures: [],
      },
      {
        title: 'Node.js & Backend Development',
        lessons: 26,
        duration: '9 hours',
        lectures: [],
      },
      {
        title: 'Full-Stack Projects',
        lessons: 18,
        duration: '12 hours',
        lectures: [],
      },
    ],
    reviews: [
      {
        id: '1',
        author: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
        rating: 5,
        date: '2 days ago',
        comment: 'Absolutely fantastic course! Angela explains everything so clearly and the projects are engaging and practical. I went from zero coding knowledge to building my own web applications in just 3 months.',
        helpful: 234,
      },
      {
        id: '2',
        author: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
        rating: 5,
        date: '1 week ago',
        comment: 'Best investment I\'ve made in my career. The course is comprehensive, up-to-date, and the support from the instructor is amazing. Highly recommended!',
        helpful: 189,
      },
      {
        id: '3',
        author: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Great course overall. Very detailed and well-structured. Would love to see more advanced topics covered in future updates.',
        helpful: 142,
      },
    ],
  };

  const relatedCourses: Course[] = [
    {
      id: '2',
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
      id: '3',
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
  ];

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#16213E]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-4">
                <button onClick={() => onNavigate?.('home')} className="hover:text-[#4A90E2]">
                  Home
                </button>
                <span>/</span>
                <button onClick={() => onNavigate?.('courses')} className="hover:text-[#4A90E2]">
                  Courses
                </button>
                <span>/</span>
                <span className="text-[#E5E7EB]">{course.category}</span>
              </div>

              {/* Title & Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {course.isBestseller && (
                  <Badge className="bg-[#3B8075] text-white border-0">Bestseller</Badge>
                )}
                <Badge className="bg-[#4A90E2]/20 text-[#4A90E2] border-[#4A90E2]/30">
                  {course.category}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-3">
                {course.title}
              </h1>
              <p className="text-lg text-[#9CA3AF] mb-6">{course.subtitle}</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-1 text-[#E5E7EB]">
                  <Star className="size-5 fill-[#4A90E2] text-[#4A90E2]" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-[#9CA3AF]">
                    ({course.reviewCount.toLocaleString()} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#9CA3AF]">
                  <Users className="size-5" />
                  <span>{course.studentCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1 text-[#9CA3AF]">
                  <Clock className="size-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-[#9CA3AF]">
                  <Globe className="size-5" />
                  <span>{course.language}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="size-12 border-2 border-[#4A90E2]">
                  <AvatarImage src={course.instructor.avatar} />
                  <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-[#9CA3AF]">Created by</p>
                  <button
                    className="font-semibold text-[#E5E7EB] hover:text-[#4A90E2] transition-colors"
                    onClick={() => onNavigate?.('instructor', { id: course.instructor.name })}
                  >
                    {course.instructor.name}
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <p className="text-sm text-[#9CA3AF]">
                Last updated {course.lastUpdated}
              </p>
            </div>

            {/* Right - Purchase Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1F2937] rounded-xl border border-white/5 overflow-hidden sticky top-24"
              >
                {/* Preview */}
                <div className="relative aspect-video bg-[#16213E] group cursor-pointer">
                  <ImageWithFallback
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="size-16 rounded-full bg-[#4A90E2] flex items-center justify-center">
                      <Play className="size-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 text-white text-sm font-medium">
                    Preview this course
                  </span>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-4xl font-bold text-[#E5E7EB]">${course.price}</span>
                    <span className="text-xl text-[#9CA3AF] line-through">
                      ${course.originalPrice}
                    </span>
                    <Badge className="bg-[#702006] text-white border-0">{discount}% OFF</Badge>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3 mb-6">
                    <Button
                      className="w-full bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white h-12"
                      onClick={() => onNavigate?.('checkout', { courseId: course.id })}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/10 text-[#E5E7EB] hover:bg-[#1F2937]/50 h-12"
                      onClick={() => onNavigate?.('cart', { add: course.id })}
                    >
                      Add to Cart
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-[#9CA3AF] hover:text-[#4A90E2] hover:bg-[#4A90E2]/10"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`size-4 mr-2 ${isWishlisted ? 'fill-[#4A90E2] text-[#4A90E2]' : ''}`} />
                      Wishlist
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-[#9CA3AF] hover:text-[#4A90E2] hover:bg-[#4A90E2]/10"
                    >
                      <Share2 className="size-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Includes */}
                  <div className="space-y-2 pt-6 border-t border-white/10">
                    <h4 className="font-semibold text-[#E5E7EB] mb-3">This course includes:</h4>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Clock className="size-4 text-[#4A90E2]" />
                      <span>{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Download className="size-4 text-[#4A90E2]" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Award className="size-4 text-[#4A90E2]" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <Globe className="size-4 text-[#4A90E2]" />
                      <span>Full lifetime access</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-[#1F2937] border border-white/5 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* What You'll Learn */}
                <div>
                  <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6">What you'll learn</h2>
                  <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="size-5 text-[#3B8075] shrink-0 mt-0.5" />
                          <span className="text-[#E5E7EB]">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6">Requirements</h2>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#9CA3AF]">
                        <span className="text-[#4A90E2] mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#E5E7EB]">Course Curriculum</h2>
                  <p className="text-sm text-[#9CA3AF]">
                    {course.curriculum.reduce((acc, section) => acc + section.lessons, 0)} lectures • {course.duration}
                  </p>
                </div>

                {course.curriculum.map((section, index) => (
                  <div key={index} className="bg-[#1F2937] rounded-xl border border-white/5 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-6 hover:bg-[#1F2937]/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <ChevronDown className="size-5 text-[#9CA3AF]" />
                        <div className="text-left">
                          <h3 className="font-semibold text-[#E5E7EB] mb-1">{section.title}</h3>
                          <p className="text-sm text-[#9CA3AF]">
                            {section.lessons} lectures • {section.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="instructor">
                <div className="bg-[#1F2937] rounded-xl p-8 border border-white/5">
                  <div className="flex items-start gap-6 mb-6">
                    <Avatar className="size-24 border-2 border-[#4A90E2]">
                      <AvatarImage src={course.instructor.avatar} />
                      <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#E5E7EB] mb-1">
                        {course.instructor.name}
                      </h3>
                      <p className="text-[#9CA3AF] mb-4">{course.instructor.title}</p>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="size-4 fill-[#4A90E2] text-[#4A90E2]" />
                            <span className="font-semibold text-[#E5E7EB]">
                              {course.instructor.rating}
                            </span>
                          </div>
                          <span className="text-sm text-[#9CA3AF]">Instructor Rating</span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#E5E7EB] mb-1">
                            {course.instructor.students.toLocaleString()}
                          </div>
                          <span className="text-sm text-[#9CA3AF]">Students</span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#E5E7EB] mb-1">
                            {course.instructor.courses}
                          </div>
                          <span className="text-sm text-[#9CA3AF]">Courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#9CA3AF] leading-relaxed">{course.instructor.bio}</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#E5E7EB]">Student Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="size-6 fill-[#4A90E2] text-[#4A90E2]" />
                    <span className="text-2xl font-bold text-[#E5E7EB]">{course.rating}</span>
                    <span className="text-[#9CA3AF]">
                      ({course.reviewCount.toLocaleString()} ratings)
                    </span>
                  </div>
                </div>

                {course.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-[#1F2937] rounded-xl p-6 border border-white/5"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-[#E5E7EB]">{review.author}</h4>
                          <span className="text-sm text-[#9CA3AF]">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-4 ${
                                i < review.rating
                                  ? 'fill-[#4A90E2] text-[#4A90E2]'
                                  : 'text-[#9CA3AF]'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-[#9CA3AF] mb-3">{review.comment}</p>
                        <button className="text-sm text-[#9CA3AF] hover:text-[#4A90E2] transition-colors">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Courses */}
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-[#E5E7EB] mb-6">Related Courses</h3>
              <div className="space-y-4">
                {relatedCourses.map((relatedCourse) => (
                  <CourseCard
                    key={relatedCourse.id}
                    course={relatedCourse}
                    variant="compact"
                    onCourseClick={(id) => onNavigate?.('course-detail', { id })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
