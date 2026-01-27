# LearnFlow Developer Guide

## Overview

This guide provides comprehensive information for developers working with the LearnFlow UI/UX system.

## Quick Navigation

- **Design System**: See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Implementation Details**: See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Main README**: See [README.md](./README.md)

## Getting Started

### Installation
```bash
npm install
npm run dev
```

### Project Structure
```
src/
├── app/
│   ├── App.tsx                 # Main app router
│   ├── components/
│   │   ├── ui/                 # Radix UI components
│   │   ├── Layout.tsx          # Layout components
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── Footer.tsx          # Footer
│   │   ├── BentoGrid.tsx       # Bento grid layout
│   │   ├── CourseCard.tsx      # Course card component
│   │   ├── Isometric3D.tsx     # 3D SVG elements
│   │   ├── Toast.tsx           # Notifications
│   │   ├── Loading.tsx         # Loading states
│   │   ├── Stepper.tsx         # Step indicator
│   │   └── Modal.tsx           # Dialogs
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Courses.tsx
│   │   ├── CourseDetail.tsx
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── MyCourses.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── FAQ.tsx
│   └── figma/
│       └── ImageWithFallback.tsx
├── styles/
│   ├── theme.css               # Design system tokens
│   ├── tailwind.css
│   ├── fonts.css
│   └── index.css
└── main.tsx
```

## Design System Usage

### Using Colors

Always use CSS variables from `theme.css` instead of hardcoding hex values:

```tsx
// ✅ Good
<div className="bg-[#1F2937]">   // Using Tailwind with our color system
<div className="text-[#E5E7EB]">

// Color variable structure:
// Background colors: --app-bg, --surface-primary, --surface-alt, --surface-deep
// Text colors: --text-primary, --text-secondary, --text-muted
// Action colors: --action-primary, --action-secondary, --accent-calm, --critical
```

### Typography Scale

```tsx
// Font sizes (use Tailwind classes)
<h1 className="text-5xl font-bold">Main Heading (3rem)</h1>
<h2 className="text-4xl font-bold">Section Heading (2.25rem)</h2>
<h3 className="text-3xl font-semibold">Subsection (1.875rem)</h3>
<p className="text-base">Body text (1rem)</p>
<span className="text-sm">Secondary text (0.875rem)</span>
<span className="text-xs">Muted text (0.75rem)</span>

// Font weights
<p className="font-bold">700 weight</p>
<p className="font-semibold">600 weight</p>
<p className="font-medium">500 weight</p>
<p className="font-normal">400 weight</p>
```

### Spacing System

```tsx
// 8px-based modular scale
<div className="p-4">     {/* 1rem / 16px */}
<div className="p-6">     {/* 1.5rem / 24px */}
<div className="p-8">     {/* 2rem / 32px */}
<div className="mt-4">    {/* margin-top */}
<div className="gap-6">   {/* gap between items */}
```

### Shadows & Elevation

```tsx
// Shadow utilities
<div className="shadow-sm">      {/* Subtle shadow */}
<div className="shadow-base">    {/* Default shadow */}
<div className="shadow-md">      {/* Medium shadow */}
<div className="shadow-lg">      {/* Large shadow */}
<div className="shadow-glow-primary"> {/* Glow effect */}

// Or use CSS shadow variables:
box-shadow: var(--shadow-lg);
box-shadow: var(--shadow-glow-primary);
```

## Component Usage Patterns

### Button Component

```tsx
import { Button } from '@/app/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="default">Primary CTA</Button>
<Button variant="secondary">Secondary action</Button>
<Button variant="accent">Success action</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Subtle</Button>
<Button variant="outline">Bordered</Button>
<Button variant="link">Text only</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="default">Normal</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon button</Button>

// With state
<Button disabled>Disabled</Button>
<Button isLoading>Loading...</Button>
```

### Layout Components

```tsx
import { Container, Section, PageHeader, Grid, Card, EmptyState } from '@/app/components/Layout';

// Container - max-width wrapper
<Container size="default">
  <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="default">
    {items.map(item => <Card key={item.id}>{item}</Card>)}
  </Grid>
</Container>

// Section - with spacing and title
<Section title="Featured Courses" subtitle="Handpicked for you">
  <Grid>{courses}</Grid>
</Section>

// PageHeader - consistent page heading
<PageHeader 
  title="Your Cart"
  subtitle="2 courses selected"
  action={<Button>Continue Shopping</Button>}
/>

// EmptyState - no results feedback
<EmptyState
  icon={ShoppingCart}
  title="Cart is empty"
  description="Browse our courses and add your favorites"
  action={<Button onClick={handleBrowse}>Browse Courses</Button>}
/>
```

### Toast Notifications

```tsx
import { useToasts, ToastContainer } from '@/app/components/Toast';

export function MyComponent() {
  const { toasts, addToast, removeToast } = useToasts();

  const handleAction = async () => {
    try {
      await saveData();
      addToast('Data saved successfully!', 'success');
    } catch (error) {
      addToast('Failed to save data', 'error');
    }
  };

  return (
    <>
      <button onClick={handleAction}>Save</button>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

// Toast types: 'success' | 'error' | 'info' | 'warning'
addToast('Message', 'success', 5000, {
  label: 'Undo',
  onClick: () => console.log('Undo clicked')
});
```

### Skeleton Loaders

```tsx
import { 
  Skeleton, 
  CourseCardSkeleton, 
  StatsSkeleton, 
  TextSkeleton,
  AvatarSkeleton 
} from '@/app/components/ui/skeleton';

// Use in loading state
{isLoading ? <CourseCardSkeleton /> : <CourseCard course={course} />}

// Multiple skeletons
{isLoading && Array(3).fill(0).map((_, i) => (
  <CourseCardSkeleton key={i} />
))}

// Other skeleton variants
<StatsSkeleton />      {/* Stat card loading */}
<TextSkeleton />       {/* Paragraph text loading */}
<AvatarSkeleton />     {/* Avatar image loading */}
```

### Stepper Component

```tsx
import { Stepper } from '@/app/components/Stepper';

const [currentStep, setCurrentStep] = useState(0);

const steps = [
  { id: 'billing', label: 'Billing', description: 'Your details' },
  { id: 'payment', label: 'Payment', description: 'Payment method' },
  { id: 'review', label: 'Review', description: 'Order summary' },
];

<Stepper
  steps={steps}
  currentStep={currentStep}
  onStepClick={setCurrentStep}
/>

// Render step content
{currentStep === 0 && <BillingForm />}
{currentStep === 1 && <PaymentForm />}
{currentStep === 2 && <ReviewOrder />}
```

### Modal Components

```tsx
import { Modal, Sidebar, ConfirmationDialog } from '@/app/components/Modal';

// Modal
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Course Information"
  size="lg"
>
  <CourseContent />
</Modal>

// Sidebar
<Sidebar
  isOpen={isOpen}
  onClose={handleClose}
  title="Filters"
  side="right"
>
  <FilterPanel />
</Sidebar>

// Confirmation Dialog
<ConfirmationDialog
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleDelete}
  title="Delete Course"
  description="This action cannot be undone."
  confirmText="Delete"
  isDangerous={true}
/>
```

### Loading States

```tsx
import { 
  LoadingSpinner, 
  PageLoader, 
  ProgressBar, 
  SkeletonGrid 
} from '@/app/components/Loading';

// Inline spinner
<LoadingSpinner size="md" />

// Full page loader
{isLoadingPage && <PageLoader />}

// Progress indicator
<ProgressBar value={65} animated />

// Skeleton grid for listings
{isLoading ? <SkeletonGrid cols={3} rows={2} /> : <CoursesGrid />}
```

### 3D & Isometric Elements

```tsx
import { 
  IsometricLearningStack,
  IsometricGraduationCap,
  GeometricParticles,
  AnimatedCheckmark
} from '@/app/components/Isometric3D';

// Use in hero sections
<IsometricLearningStack />

// Success states
<AnimatedCheckmark />

// Background animations
<GeometricParticles count={5} />

// Decorative elements
<IsometricGraduationCap />
```

## Creating New Components

### Component Template

```tsx
import { motion } from 'motion/react';
import { cn } from '@/app/components/ui/utils';

interface MyComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

export function MyComponent({
  title,
  description,
  onClick,
  className,
}: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-[#1F2937] rounded-lg border border-white/5',
        'p-6 cursor-pointer transition-all',
        'hover:border-[#4A90E2]/30 hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[#9CA3AF]">{description}</p>
      )}
    </motion.div>
  );
}
```

## Best Practices

### 1. Always Use Design Tokens
```tsx
// ✅ Good - uses design system colors
<div className="bg-[#1F2937] text-[#E5E7EB]">

// ❌ Bad - random colors
<div className="bg-gray-800 text-white">
```

### 2. Responsive Mobile-First
```tsx
// ✅ Good - starts mobile, enhances
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ Bad - desktop-first
<div className="grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
```

### 3. Add Micro-Interactions
```tsx
// ✅ Good - smooth feedback
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button>Click me</Button>
</motion.div>

// ❌ Bad - no feedback
<Button>Click me</Button>
```

### 4. Use Skeleton Loading States
```tsx
// ✅ Good - shows loading progress
{isLoading ? <CourseCardSkeleton /> : <CourseCard />}

// ❌ Bad - no visual feedback
{isLoading ? <div /> : <CourseCard />}
```

### 5. Accessible Components
```tsx
// ✅ Good - keyboard accessible
<button
  onClick={handleClick}
  className="focus:ring-2 focus:ring-[#4A90E2]"
  aria-label="Save course"
>
  Save
</button>

// ❌ Bad - not accessible
<div onClick={handleClick} className="cursor-pointer">
  Save
</div>
```

## Common Patterns

### Form Field Pattern
```tsx
<div>
  <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
    Email
  </label>
  <Input
    type="email"
    placeholder="you@example.com"
    className="bg-[#16213E] border-white/10 text-[#E5E7EB]"
  />
</div>
```

### Card List Pattern
```tsx
<div className="space-y-4">
  {items.map((item) => (
    <Card key={item.id} interactive gradient>
      <h3 className="font-semibold text-[#E5E7EB] mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-[#9CA3AF]">{item.description}</p>
    </Card>
  ))}
</div>
```

### Empty State Pattern
```tsx
{items.length === 0 ? (
  <EmptyState
    icon={ShoppingCart}
    title="No items"
    description="Start adding courses"
    action={<Button onClick={handleBrowse}>Browse</Button>}
  />
) : (
  <ItemsList items={items} />
)}
```

## Performance Tips

1. **Use Skeleton Loading**: Always show loading state with skeletons
2. **Lazy Load Images**: Use ImageWithFallback component
3. **Code Split Pages**: Import pages dynamically
4. **Optimize Animations**: Use CSS over JavaScript
5. **Tree Shake Dependencies**: Only import what you use

## Accessibility Checklist

- [ ] Color contrast ratio meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus visible indicators present
- [ ] ARIA labels on interactive elements
- [ ] Semantic HTML structure used
- [ ] Error messages clear and helpful
- [ ] Forms are properly labeled
- [ ] Reduced motion is respected

## Testing

### Component Testing
```tsx
// Test button variant
<Button variant="destructive">Delete</Button>

// Test loading state
<CourseCardSkeleton />

// Test empty state
<EmptyState title="No courses" />
```

### Accessibility Testing
- Use keyboard navigation (Tab, Enter, Space)
- Test with screen reader (NVDA, JAWS)
- Check color contrast with WAVE tool
- Test with browser dev tools (Lighthouse)

## Debugging

### Check Colors
Use the browser DevTools to inspect actual applied colors vs design tokens.

### Check Spacing
Use the DOM inspector to verify margins, padding, and gaps match the 8px scale.

### Check Animations
Open Performance tab to ensure animations run at 60fps.

### Check Responsive
Use Device Toolbar to test at multiple screen sizes.

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Radix UI Docs](https://www.radix-ui.com)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

## Support

For questions about the design system or components, refer to:
1. DESIGN_SYSTEM.md for complete reference
2. Component source code for implementation details
3. Example pages for usage patterns

---

**Last Updated**: January 2026
**Version**: 1.0
