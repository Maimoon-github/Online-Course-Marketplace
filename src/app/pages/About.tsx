import { Users, Award, Globe, Heart, Target, Zap } from 'lucide-react';
import { BentoGrid, BentoItem } from '@/app/components/BentoGrid';
import { motion } from 'motion/react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Student-First',
      description: 'Everything we do is designed to help learners succeed and achieve their goals.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards for course content and instructor expertise.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Making world-class education accessible to everyone, everywhere.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge learning technology.',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const stats = [
    { value: '50M+', label: 'Active Students' },
    { value: '190+', label: 'Countries Reached' },
    { value: '15K+', label: 'Expert Instructors' },
    { value: '100K+', label: 'Premium Courses' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#16213E] to-[#111827] py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#E5E7EB] mb-6">
              Empowering Learners
              <br />
              <span className="bg-gradient-to-r from-[#4A90E2] to-[#3B8075] bg-clip-text text-transparent">
                Around the World
              </span>
            </h1>
            <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
              We're on a mission to make high-quality education accessible to everyone. Join millions of learners transforming their careers and lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1F2937] rounded-xl p-6 border border-white/5 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-6">Our Mission</h2>
            <p className="text-lg text-[#9CA3AF] mb-4">
              LearnFlow was founded with a simple but powerful vision: to democratize education and empower individuals to achieve their full potential through accessible, high-quality learning.
            </p>
            <p className="text-lg text-[#9CA3AF] mb-4">
              We believe that everyone deserves access to world-class education, regardless of their background or circumstances. That's why we've built a platform that connects learners with expert instructors from around the globe.
            </p>
            <p className="text-lg text-[#9CA3AF]">
              Today, we're proud to serve over 50 million students worldwide, offering more than 100,000 courses across hundreds of topics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#4A90E2]/20 to-[#3B8075]/20 border border-white/5" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[#16213E]/30 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4">Our Values</h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1F2937] rounded-xl p-8 border border-white/5"
            >
              <div className={`size-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4`}>
                <value.icon className="size-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#E5E7EB] mb-3">{value.title}</h3>
              <p className="text-[#9CA3AF]">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-4">
            Join Our Global Team
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto mb-8">
            We're always looking for passionate, talented individuals to help us achieve our mission
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#4A90E2] to-[#3B8075] rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Want to make an impact?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore career opportunities and help shape the future of online learning
          </p>
          <button className="px-8 py-3 bg-white text-[#4A90E2] rounded-lg font-semibold hover:bg-white/90 transition-colors">
            View Open Positions
          </button>
        </div>
      </section>
    </div>
  );
}
