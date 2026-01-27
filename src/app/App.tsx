import { useState } from 'react';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { Courses } from '@/app/pages/Courses';
import { CourseDetail } from '@/app/pages/CourseDetail';
import { Login } from '@/app/pages/Login';
import { Dashboard } from '@/app/pages/Dashboard';
import { MyCourses } from '@/app/pages/MyCourses';
import { Cart } from '@/app/pages/Cart';
import { Checkout } from '@/app/pages/Checkout';
import { About } from '@/app/pages/About';
import { Contact } from '@/app/pages/Contact';
import { FAQ } from '@/app/pages/FAQ';

type Page =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'categories'
  | 'instructors'
  | 'about'
  | 'contact'
  | 'login'
  | 'dashboard'
  | 'my-courses'
  | 'cart'
  | 'checkout'
  | 'faq'
  | 'terms'
  | 'privacy';

interface PageData {
  [key: string]: any;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<PageData>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(2);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    if (data) {
      setPageData(data);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simulate login for dashboard/my-courses
    if (page === 'dashboard' || page === 'my-courses') {
      setIsLoggedIn(true);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'courses':
        return <Courses onNavigate={handleNavigate} initialFilters={pageData} />;
      case 'course-detail':
        return <CourseDetail courseId={pageData.id} onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'my-courses':
        return <MyCourses onNavigate={handleNavigate} />;
      case 'cart':
        return <Cart onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQ />;
      case 'terms':
      case 'privacy':
        return <PolicyPage type={currentPage} onNavigate={handleNavigate} />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-[#E5E7EB] mb-4">Coming Soon</h1>
              <p className="text-[#9CA3AF] mb-8">
                This page is under construction. Check back soon!
              </p>
              <button
                onClick={() => handleNavigate('home')}
                className="px-6 py-3 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white rounded-lg font-semibold transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#E5E7EB]">
      <Navbar
        isLoggedIn={isLoggedIn}
        cartCount={cartCount}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      <main className="min-h-screen">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

// Simple Policy Page Component
function PolicyPage({ type, onNavigate }: { type: 'terms' | 'privacy'; onNavigate: (page: string) => void }) {
  const isTerms = type === 'terms';

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#E5E7EB] mb-8">
          {isTerms ? 'Terms of Service' : 'Privacy Policy'}
        </h1>

        <div className="bg-[#1F2937] rounded-2xl p-8 border border-white/5">
          <p className="text-[#9CA3AF] mb-6">Last updated: January 27, 2026</p>

          <div className="space-y-8 text-[#9CA3AF]">
            <section>
              <h2 className="text-2xl font-semibold text-[#E5E7EB] mb-4">1. Introduction</h2>
              <p>
                Welcome to LearnFlow. These {isTerms ? 'terms of service' : 'privacy policy'} govern
                your use of our platform and services. By accessing or using LearnFlow, you agree to
                be bound by these {isTerms ? 'terms' : 'policies'}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#E5E7EB] mb-4">
                2. {isTerms ? 'User Accounts' : 'Information We Collect'}
              </h2>
              <p>
                {isTerms
                  ? 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.'
                  : 'We collect information that you provide directly to us, including when you create an account, enroll in courses, make purchases, or communicate with us. This may include your name, email address, payment information, and learning preferences.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#E5E7EB] mb-4">
                3. {isTerms ? 'Course Access and Usage' : 'How We Use Your Information'}
              </h2>
              <p>
                {isTerms
                  ? 'Upon purchasing a course, you receive a non-exclusive, non-transferable license to access the course content for personal, non-commercial use. You may not share, reproduce, or distribute course materials without authorization.'
                  : 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and provide personalized learning experiences.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#E5E7EB] mb-4">
                4. {isTerms ? 'Refund Policy' : 'Data Security'}
              </h2>
              <p>
                {isTerms
                  ? 'We offer a 30-day money-back guarantee on course purchases. If you are not satisfied with a course, you may request a full refund within 30 days of purchase. Refunds are processed to the original payment method within 5-10 business days.'
                  : 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#E5E7EB] mb-4">
                5. {isTerms ? 'Limitation of Liability' : 'Your Rights'}
              </h2>
              <p>
                {isTerms
                  ? 'To the fullest extent permitted by law, LearnFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform or services.'
                  : 'You have the right to access, update, or delete your personal information at any time through your account settings. You may also opt out of marketing communications and request a copy of your data.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#E5E7EB] mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about {isTerms ? 'these terms' : 'this privacy policy'},
                please contact us at:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Email: legal@learnflow.com</li>
                <li>Address: 123 Learning Street, San Francisco, CA 94105</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#4A90E2] hover:text-[#4A90E2]/80 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}