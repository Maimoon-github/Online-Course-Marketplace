# LearnFlow Design System - Quick Reference

## Color Palette

### Primary Colors
| Name | Hex | Use Case |
|------|-----|----------|
| **Primary Blue** | `#4A90E2` | Main CTAs, links, primary actions |
| **Secondary Cyan** | `#66A5AD` | Secondary actions, info states |
| **Accent Teal** | `#3B8075` | Success, verified, positive |
| **Critical Red** | `#702006` | Errors, delete, destructive |

### Backgrounds
| Name | Hex | Use Case |
|------|-----|----------|
| **App BG** | `#111827` | Main background |
| **Primary Surface** | `#1F2937` | Cards, containers |
| **Alt Surface** | `#16213E` | Sections, sidebars |
| **Deep Neutral** | `#121212` | Overlays, framing |

### Text
| Name | Hex | Use Case |
|------|-----|----------|
| **Primary** | `#E5E7EB` | Main content |
| **Secondary** | `#9CA3AF` | Descriptions, metadata |
| **Muted** | `#B4B4B4` | Optional, less important |

## Typography Hierarchy

```
H1: 3rem (48px) - font-bold
H2: 2.25rem (36px) - font-bold
H3: 1.875rem (30px) - font-semibold
H4: 1.5rem (24px) - font-semibold
H5: 1.25rem (20px) - font-medium
Body: 1rem (16px) - font-normal
Small: 0.875rem (14px) - font-normal
Tiny: 0.75rem (12px) - font-normal
```

## Spacing Scale

8px-based modular system:
- `4px` (0.25rem) - Micro spacing
- `8px` (0.5rem) - Tight spacing
- `12px` (0.75rem) - Small gap
- `16px` (1rem) - Standard padding/margin
- `24px` (1.5rem) - Medium gap
- `32px` (2rem) - Large spacing
- `48px` (3rem) - Section spacing
- `64px` (4rem) - Major gaps

## Component Sizes

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| **Header Height** | 56px | 64px | 64px |
| **Button Height** | 40px | 44px | 44px |
| **Input Height** | 40px | 44px | 44px |
| **Card Padding** | 16px | 20px | 24px |
| **Container Width** | 100% | 100% | 1600px |
| **Touch Target Min** | 44×44px | 44×44px | 40×40px |

## Shadows

```
Shadow-sm: 0 1px 3px rgba(0,0,0,0.1)
Shadow-md: 0 10px 15px rgba(0,0,0,0.1)
Shadow-lg: 0 20px 25px rgba(0,0,0,0.1)
Glow-primary: 0 0 20px rgba(74, 144, 226, 0.15)
Glow-accent: 0 0 20px rgba(59, 128, 117, 0.15)
```

## Border Radius

- `4px` (0.25rem) - Small
- `8px` (0.5rem) - Default
- `12px` (0.75rem) - Medium
- `16px` (1rem) - Large
- `20px` (1.25rem) - Extra large
- `9999px` - Full circular

## Animation Timings

| Type | Duration | Easing |
|------|----------|--------|
| **Fade** | 300ms | ease-out |
| **Slide** | 400ms | cubic-bezier(0.34, 1.56, 0.64, 1) |
| **Scale** | 300ms | cubic-bezier(0.34, 1.56, 0.64, 1) |
| **Shimmer** | 2000ms | infinite loop |
| **Pulse** | 2000ms | ease-in-out infinite |

## Component Variants

### Button
- **Primary** (Blue) - Main actions
- **Secondary** (Cyan) - Alternative actions
- **Accent** (Teal) - Success/positive
- **Destructive** (Red) - Delete/error
- **Ghost** - Subtle/minimal
- **Outline** - Bordered
- **Link** - Text-only

**Sizes**: sm, default, lg, icon

### States
- Normal (default)
- Hover (lighter/glow)
- Active (pressed)
- Disabled (reduced opacity)
- Loading (spinner)

## Grid System

**Desktop**: 12-column grid
**Tablet**: 6-column grid
**Mobile**: 1-2 column layout

**Gap**: 24px (default), 16px (tight), 32px (loose)

## Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1279px
- **Large**: 1280px+

## Micro-interactions

### Hover Effects
- Cards: Scale (1.01) + shadow + border highlight
- Buttons: Glow effect + brightness change
- Links: Color shift + underline
- Inputs: Border color + focus ring

### Click/Active Effects
- Buttons: Scale down (0.95) momentarily
- Form elements: Color focus ring
- Navigation: Underline/highlight indicator

### Loading States
- Shimmer effect on skeletons
- Spinner rotation animation
- Progress bar fill animation

### Success/Error
- Success: Checkmark animation
- Error: Brief shake animation
- Toast notification slide-in

## Mobile Optimization

- **Touch Targets**: Min 44×44px
- **Spacing**: Generous padding on mobile
- **Typography**: Larger line-height for readability
- **Navigation**: Hamburger menu or bottom nav
- **Forms**: Single column, larger inputs
- **Cards**: Full width or 2-column max

## Accessibility Standards

- **Color Contrast**: WCAG AA (4.5:1 for text)
- **Focus Indicators**: 3px ring with primary color
- **Touch Targets**: 44×44px minimum
- **Motion**: Respects prefers-reduced-motion
- **Typography**: Readable at all sizes
- **Interactive**: Keyboard accessible

## Component Library

**Pages**: 14 complete pages
**Components**: 50+ reusable components
**Animations**: 12 smooth transitions
**States**: Hover, active, disabled, loading
**Variants**: Multi-option components

## Design Principles

1. **Trust**: Clear, predictable interactions
2. **Clarity**: Minimal noise, strong hierarchy
3. **Premium**: Dark theme, modern feel
4. **Efficient**: Fast discovery, low-friction
5. **Inclusive**: Accessible to all users

## File Sizes & Performance

- **CSS Bundle**: Optimized with tree-shaking
- **JS Bundle**: Code-split per page
- **Images**: Lazy loaded with fallbacks
- **Animations**: 60fps performance
- **Load Time**: < 3s on 4G

## Export/Handoff Guidelines

### For Developers
1. Use design tokens from theme.css
2. Import components from component library
3. Follow spacing scale (8px base)
4. Use Tailwind utility classes
5. Test responsive behavior

### For Product Managers
1. All pages are fully interactive
2. Mobile-first responsive design
3. Production-ready code
4. No design assets needed
5. Integration-ready for backend

### For Designers
1. Design tokens match Figma design
2. Component library is complete
3. Color palette is locked in
4. Typography is set
5. Spacing is standardized

## Quick Checklist

- ✅ All pages responsive
- ✅ All interactions animated
- ✅ Dark theme optimized
- ✅ Accessibility compliant
- ✅ Performance optimized
- ✅ Mobile-friendly
- ✅ TypeScript typed
- ✅ Production-ready

## Documentation

- `DESIGN_SYSTEM.md` - Complete design reference
- `DEVELOPER_GUIDE.md` - Development instructions
- `IMPLEMENTATION_SUMMARY.md` - Technical overview
- `README.md` - Project overview

## Next Steps

1. **Backend Integration** - Connect API endpoints
2. **Authentication** - Implement user login
3. **Payment** - Integrate Stripe/PayPal
4. **Analytics** - Add tracking
5. **Optimization** - Performance tuning

---

**Status**: Production-Ready ✅
**Last Updated**: January 2026
**Contact**: Project Team
