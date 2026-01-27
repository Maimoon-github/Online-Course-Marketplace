import { Star, Users, Clock, Heart, TrendingUp, Award } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useState } from 'react';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice?: number;
  category: string;
  isBestseller?: boolean;
  isNew?: boolean;
  progress?: number;
}

interface CourseCardProps {
  course: Course;
  onCourseClick?: (id: string) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function CourseCard({ course, onCourseClick, variant = 'default' }: CourseCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    onCourseClick?.(course.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group bg-[#1F2937] rounded-xl overflow-hidden border border-white/5 hover:border-[#4A90E2]/30 hover:shadow-2xl hover:shadow-[#4A90E2]/10 transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#16213E]">
        <ImageWithFallback
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#16213E] to-[#1F2937] animate-pulse" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {course.isBestseller && (
            <Badge className="bg-[#3B8075] text-white border-0 gap-1">
              <TrendingUp className="size-3" />
              Bestseller
            </Badge>
          )}
          {course.isNew && (
            <Badge className="bg-[#4A90E2] text-white border-0">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-[#702006] text-white border-0">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 size-9 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
        >
          <Heart
            className={`size-4 transition-colors ${
              isWishlisted ? 'fill-[#4A90E2] text-[#4A90E2]' : 'text-white'
            }`}
          />
        </button>

        {/* Level Badge */}
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-black/40 backdrop-blur-sm text-white border-0">
            {course.level}
          </Badge>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course.progress !== undefined && course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              className="h-full bg-[#4A90E2]"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-[#4A90E2] font-medium">{course.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[#E5E7EB] mb-2 line-clamp-2 group-hover:text-[#4A90E2] transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-[#9CA3AF] mb-3">{course.instructor}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1 text-[#E5E7EB]">
            <Star className="size-4 fill-[#4A90E2] text-[#4A90E2]" />
            <span className="font-medium">{course.rating.toFixed(1)}</span>
            <span className="text-[#9CA3AF]">({course.reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 text-[#9CA3AF]">
            <Users className="size-4" />
            <span>{course.studentCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-[#9CA3AF]">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-xl text-[#E5E7EB]">
              ${course.price}
            </span>
            {course.originalPrice && (
              <span className="text-sm text-[#9CA3AF] line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>

          {course.progress !== undefined ? (
            <Button
              size="sm"
              className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onCourseClick?.(course.id);
              }}
            >
              Continue
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
