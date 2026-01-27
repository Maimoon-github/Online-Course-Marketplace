import { BookOpen, Award, Clock, TrendingUp, Play, BarChart3, Target } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { CourseCard, Course } from '@/app/components/CourseCard';
import { BentoGrid, BentoItem } from '@/app/components/BentoGrid';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate?: (page: string, data?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  // Mock data
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
      completedDate: 'December 2025',
      certificate: '#',
    },
    {
      id: 'c2',
      title: 'Git & GitHub Essentials',
      instructor: 'Colt Steele',
      completedDate: 'November 2025',
      certificate: '#',
    },
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { label: 'Courses Completed', value: '5', icon: Award, color: 'from-green-500 to-green-600' },
    { label: 'Hours Learned', value: '248', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { label: 'Current Streak', value: '15 days', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const recommendations: Course[] = [
    {
      id: 'r1',
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
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-2">
              Welcome back, John!
            </h1>
            <p className="text-[#9CA3AF]">Continue your learning journey</p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <BentoGrid className="mb-12">
          {stats.map((stat, index) => (
            <BentoItem
              key={stat.label}
              gradient={`bg-gradient-to-br ${stat.color}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center py-2"
              >
                <div className={`size-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="size-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#E5E7EB] mb-1">{stat.value}</div>
                <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
              </motion.div>
            </BentoItem>
          ))}
        </BentoGrid>

        {/* Continue Learning */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#E5E7EB]">Continue Learning</h2>
            <Button
              variant="ghost"
              className="text-[#4A90E2] hover:bg-[#4A90E2]/10"
              onClick={() => onNavigate?.('my-courses')}
            >
              View All Courses
            </Button>
          </div>

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
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Activity */}
            <section>
              <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6">Learning Activity</h2>
              <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-[#4A90E2] to-[#3B8075] flex items-center justify-center">
                      <BarChart3 className="size-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#E5E7EB]">Weekly Progress</h3>
                      <p className="text-sm text-[#9CA3AF]">You're doing great!</p>
                    </div>
                  </div>
                  <Badge className="bg-[#3B8075]/20 text-[#3B8075] border-[#3B8075]/30">
                    +23% this week
                  </Badge>
                </div>

                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                    (day, index) => {
                      const hours = [2.5, 1.8, 3.2, 0, 2.1, 4.5, 1.2][index];
                      const maxHours = 5;
                      const percentage = (hours / maxHours) * 100;

                      return (
                        <div key={day}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[#9CA3AF]">{day}</span>
                            <span className="text-sm font-medium text-[#E5E7EB]">
                              {hours > 0 ? `${hours}h` : '-'}
                            </span>
                          </div>
                          <div className="h-2 bg-[#16213E] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className="h-full bg-gradient-to-r from-[#4A90E2] to-[#3B8075] rounded-full"
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </section>

            {/* Completed Courses */}
            <section>
              <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6">Completed Courses</h2>
              <div className="space-y-4">
                {completedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#1F2937] rounded-xl p-6 border border-white/5 hover:border-[#3B8075]/30 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="size-12 rounded-xl bg-gradient-to-br from-[#3B8075] to-[#66A5AD] flex items-center justify-center">
                          <Award className="size-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#E5E7EB] mb-1">{course.title}</h3>
                          <p className="text-sm text-[#9CA3AF] mb-2">{course.instructor}</p>
                          <p className="text-xs text-[#9CA3AF]">Completed {course.completedDate}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3B8075]/30 text-[#3B8075] hover:bg-[#3B8075]/10"
                      >
                        View Certificate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Daily Goal */}
            <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Target className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#E5E7EB]">Daily Goal</h3>
                  <p className="text-sm text-[#9CA3AF]">30 minutes</p>
                </div>
              </div>
              <Progress value={75} className="mb-2" />
              <p className="text-sm text-[#9CA3AF]">22.5 min completed today</p>
            </div>

            {/* Achievements */}
            <div className="bg-[#1F2937] rounded-xl p-6 border border-white/5">
              <h3 className="font-semibold text-[#E5E7EB] mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {[
                  { icon: '🔥', title: '15 Day Streak', desc: 'Keep it up!' },
                  { icon: '⭐', title: 'Fast Learner', desc: 'Completed 3 courses' },
                  { icon: '🎯', title: 'Goal Master', desc: 'Met weekly goals' },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#16213E] rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="text-sm font-medium text-[#E5E7EB]">{achievement.title}</h4>
                      <p className="text-xs text-[#9CA3AF]">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div>
              <h3 className="font-semibold text-[#E5E7EB] mb-4">Recommended for You</h3>
              {recommendations.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  variant="compact"
                  onCourseClick={(id) => onNavigate?.('course-detail', { id })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
