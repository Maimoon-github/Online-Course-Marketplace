# LearnFlow - Premium Online Course Marketplace

A modern, production-ready online course marketplace built with React, TypeScript, and Tailwind CSS. Designed with a focus on **clarity**, **visual impact**, and **user trust**.

## Design System: "Diplomatic Dark"

### Color Palette

The platform uses a carefully curated dark theme focused on clarity and trust:

- **App Background**: `#111827` - Deep neutral base
- **Primary Surface**: `#1F2937` - Cards and content containers
- **Alt Surface**: `#16213E` - Sections and sidebars
- **Deep Neutral**: `#121212` - Overlays and framing (sparingly)

**Text Colors:**
- Primary Text: `#E5E7EB` - Main content
- Secondary Text: `#9CA3AF` - Descriptions
- Muted Labels: `#B4B4B4` - Optional, less prominent

**Interaction Colors:**
- Primary CTA: `#4A90E2` (Blue) - Main calls-to-action
- Secondary Support: `#66A5AD` (Cyan) - Secondary actions
- Accent/Verified: `#3B8075` (Teal) - Success, positive actions
- Critical/Destructive: `#702006` (Dark Red) - Delete, errors only

## Key Features

### 1. **Bento Grid Layouts**
- Asymmetric, modular tiles for course discovery
- Varying sizes create visual hierarchy
- Responsive on all screen sizes

### 2. **3D & Immersive Graphics**
- Isometric illustrations and animations
- Subtle parallax effects
- SVG-based 3D elements (no heavy libraries)

### 3. **Micro-Animations & Interactions**
- Card hover states: lift, scale, shadow, border
- Smooth page transitions with fade/slide
- Loading skeletons with shimmer effects
- Button interactions with visual feedback
- Form validation with inline feedback

### 4. **Dark Mode + Minimalism**
- Dark theme is default (optimized for modern interfaces)
- Minimal visual noise
- Typography and spacing create hierarchy
- Color used sparingly for CTAs and semantic states

## Components

### Core Components

#### **Button**
Multiple variants for different use cases:
- `default` - Primary CTA (blue)
- `secondary` - Secondary action (cyan)
- `accent` - Success/positive (teal)
- `destructive` - Delete/error (red)
- `ghost` - Subtle action
- `outline` - Bordered action
- `link` - Text-only action
- `muted` - Disabled state

Sizes: `sm`, `default`, `lg`, `icon`, `icon-sm`, `icon-lg`

```tsx
<Button variant="default" size="lg" onClick={handleClick}>
  Get Started
</Button>
```

#### **Skeleton**
Multiple skeleton variants for loading states:
- `Skeleton` - Basic shimmer bar
- `CourseCardSkeleton` - Full course card loading state
- `StatsSkeleton` - Stat card loading state
- `TextSkeleton` - Paragraph text loading
- `AvatarSkeleton` - Profile image loading

```tsx
{isLoading ? <CourseCardSkeleton /> : <CourseCard course={course} />}
```

#### **Layout Components**
- `Container` - Max-width wrapper with padding
- `Section` - Section with spacing and optional title
- `PageHeader` - Consistent page heading
- `Grid` - Responsive grid system
- `Card` - Content card with optional interactivity
- `EmptyState` - No results state

```tsx
<Container>
  <Section title="Featured Courses" subtitle="Handpicked for you">
    <Grid cols={{ base: 1, md: 2, lg: 3 }}>
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </Grid>
  </Section>
</Container>
```

#### **Toast Notifications**
System for user feedback:

```tsx
const { toasts, addToast, removeToast } = useToasts();

const handleSuccess = () => {
  addToast('Course added to cart!', 'success');
};
```

#### **Stepper**
Multi-step process indicator:
- Desktop and mobile layouts
- Click to navigate steps
- Progress tracking

```tsx
<Stepper
  steps={[
    { id: 'info', label: 'Billing', description: 'Your details' },
    { id: 'payment', label: 'Payment', description: 'Payment method' },
    { id: 'confirm', label: 'Confirm', description: 'Review & confirm' },
  ]}
  currentStep={currentStep}
/>
```

#### **Modal & Sidebar**
- `Modal` - Centered modal for important content
- `Sidebar` - Slide-in panel from left or right
- `ConfirmationDialog` - Ask for user confirmation
- `Popover` - Small floating content

#### **3D & Immersive Components**
- `IsometricLearningStack` - 3D book stack animation
- `IsometricGraduationCap` - Animated cap
- `GeometricParticles` - Background particle animation
- `AnimatedCheckmark` - Success animation

## Pages Included

### Public Pages
1. **Home** - Hero, featured courses, categories, CTA
2. **Courses** - Searchable catalog with filters
3. **Course Detail** - Full course information, reviews, instructor
4. **Categories** - Browse courses by topic
5. **Instructors** - Instructor profiles
6. **About** - Platform information
7. **Contact** - Contact form
8. **FAQ** - Frequently asked questions

### Auth Pages
9. **Login/Sign Up** - Authentication with social options
10. **Dashboard** - User overview, progress, stats
11. **My Courses** - Enrolled courses with progress
12. **Profile & Settings** - User preferences

### Commerce Pages
13. **Cart** - Shopping cart management
14. **Checkout** - Multi-step payment process
15. **Order Success** - Confirmation and next steps

### Support Pages
16. **Help/Support** - Support documentation
17. **Terms & Conditions** - Legal terms
18. **Privacy Policy** - Privacy information

## Design Tokens

### Spacing
8px-based scale: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32 (pixels)

### Typography
- Headings: 600 weight (semibold)
- Body text: 400 weight (normal)
- Labels: 500 weight (medium)

### Shadows
Multiple elevation levels from subtle to prominent

### Animations
- Fade: 0.3s ease-out
- Slide: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
- Scale: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)
- Shimmer: 2s infinite loop
- Glow: 2s ease-in-out infinite

## Responsive Design

All components use mobile-first approach:
- **Mobile**: 320px+
- **Tablet**: 768px+ (md breakpoint)
- **Desktop**: 1024px+ (lg breakpoint)
- **Large Desktop**: 1280px+ (xl breakpoint)

## Accessibility

- Strong color contrast for all text
- Keyboard navigation support
- Focus indicators on interactive elements
- Semantic HTML structure
- ARIA labels where needed
- Reduced motion support for animations

## Performance

- Lightweight SVG illustrations (no image bloat)
- Optimized animations using motion library
- Lazy loading for images
- Code splitting per page
- Efficient state management

## Best Practices

### For Developers
1. Use design tokens from `theme.css` - never hardcode colors
2. Leverage Layout components for consistent spacing
3. Prefer Skeleton components for loading states
4. Use Toast for transient feedback
5. Implement proper error boundaries
6. Test responsive behavior on mobile

### For Designers
1. Keep designs within Diplomatic Dark palette
2. Use bento grids for layouts
3. Add micro-interactions for feedback
4. Test contrast ratios for accessibility
5. Consider motion for guidance, not distraction

## Future Enhancements

- [ ] Dark/Light mode toggle
- [ ] Advanced search with facets
- [ ] Wishlist/Saved courses
- [ ] Live instructor sessions
- [ ] Student forums/communities
- [ ] Progress tracking with milestones
- [ ] Certificate downloads
- [ ] Payment integrations (Stripe, PayPal)
- [ ] Email notifications
- [ ] Multi-language support

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to see the application.

## Tech Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS
- **Animations**: motion (Framer Motion)
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Build**: Vite

---

**Created with ❤️ for modern learning experiences**
