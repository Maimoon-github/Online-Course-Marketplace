import { BookOpen, Clock, Award, Play, CheckCircle2, Download } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { CourseCard, Course } from '@/app/components/CourseCard';
import { motion } from 'motion/react';

interface MyCoursesProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function MyCourses({ onNavigate }: MyCoursesProps) {
  const enrolledCourses: Course[] = [
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
      category: 'Development',
      progress: 45,
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      rating: 4.7,
      reviewCount: 18920,
      studentCount: 89234,
      duration: '24 hours',
      level: 'Intermediate',
      price: 79.99,
      category: 'Design',
      progress: 78,
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
      category: 'Development',
      progress: 12,
    },
  ];

  const completedCourses = [
    {
      id: 'c1',
      title: 'JavaScript Fundamentals',
      instructor: 'Jonas Schmedtmann',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
      rating: 4.9,
      reviewCount: 52340,
      studentCount: 245678,
      duration: '28 hours',
      level: 'Beginner' as const,
      price: 79.99,
      category: 'Development',
      completedDate: 'December 2025',
      certificateUrl: '#',
    },
    {
      id: 'c2',
      title: 'Git & GitHub Essentials',
      instructor: 'Colt Steele',
      thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80',
      rating: 4.7,
      reviewCount: 28920,
      studentCount: 134567,
      duration: '12 hours',
      level: 'Beginner' as const,
      price: 49.99,
      category: 'Development',
      completedDate: 'November 2025',
      certificateUrl: '#',
    },
  ];

  const savedCourses: Course[] = [
    {
      id: 's1',
      title: 'Advanced React Patterns',
      instructor: 'Kent C. Dodds',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      rating: 4.9,
      reviewCount: 15230,
      studentCount: 67890,
      duration: '32 hours',
      level: 'Advanced',
      price: 99.99,
      category: 'Development',
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-2">My Learning</h1>
          <p className="text-[#9CA3AF]">Track your progress and continue where you left off</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="in-progress" className="w-full">
          <TabsList className="bg-[#1F2937] border border-white/5 mb-8">
            <TabsTrigger value="in-progress">
              In Progress ({enrolledCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="saved">
              Saved ({savedCourses.length})
            </TabsTrigger>
          </TabsList>

          {/* In Progress */}
          <TabsContent value="in-progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard
                    course={course}
                    onCourseClick={(id) => onNavigate?.('course-player', { id })}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed" className="space-y-4">
            {completedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1F2937] rounded-xl overflow-hidden border border-white/5 hover:border-[#3B8075]/30 transition-all"
              >
                <div className="grid md:grid-cols-[300px,1fr] gap-6 p-6">
                  {/* Thumbnail */}
                  <div className="relative aspect-video md:aspect-[16/10] rounded-lg overflow-hidden bg-[#16213E]">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <Badge className="bg-[#3B8075] text-white border-0 gap-1">
                        <CheckCircle2 className="size-3" />
                        Completed
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-[#E5E7EB] mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-[#9CA3AF] mb-3">By {course.instructor}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#9CA3AF] mb-4">
                        <div className="flex items-center gap-1">
                          <Award className="size-4 text-[#3B8075]" />
                          <span>Certificate earned</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Completed {course.completedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        className="border-[#3B8075]/30 text-[#3B8075] hover:bg-[#3B8075]/10"
                      >
                        <Download className="size-4 mr-2" />
                        Download Certificate
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#16213E]"
                        onClick={() => onNavigate?.('course-detail', { id: course.id })}
                      >
                        View Course
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          {/* Saved */}
          <TabsContent value="saved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard
                    course={course}
                    onCourseClick={(id) => onNavigate?.('course-detail', { id })}
                  />
                </motion.div>
              ))}
            </div>

            {savedCourses.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="size-16 text-[#9CA3AF] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#E5E7EB] mb-2">No saved courses</h3>
                <p className="text-[#9CA3AF] mb-6">
                  Save courses to your wishlist to access them later
                </p>
                <Button
                  className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
                  onClick={() => onNavigate?.('courses')}
                >
                  Browse Courses
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
