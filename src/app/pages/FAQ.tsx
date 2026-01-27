import { Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Search } from 'lucide-react';

export function FAQ() {
  const faqCategories = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click the "Get Started" button in the navigation bar, fill out the registration form with your email and password, and verify your email address. You\'ll be ready to start learning immediately!',
        },
        {
          q: 'Do I need to pay to browse courses?',
          a: 'No! Browsing our course catalog is completely free. You only pay when you decide to enroll in a course.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and various local payment methods depending on your country.',
        },
      ],
    },
    {
      category: 'Courses & Learning',
      questions: [
        {
          q: 'How long do I have access to a course?',
          a: 'Once you purchase a course, you have lifetime access to all course materials, including future updates. Learn at your own pace with no time pressure!',
        },
        {
          q: 'Can I download course videos?',
          a: 'Yes! Most courses allow you to download videos for offline viewing. Look for the download icon next to each lecture.',
        },
        {
          q: 'What if I\'m not satisfied with a course?',
          a: 'We offer a 30-day money-back guarantee on all courses. If you\'re not satisfied, request a full refund within 30 days of purchase.',
        },
        {
          q: 'Do I get a certificate upon completion?',
          a: 'Yes! When you complete a course, you\'ll receive a certificate of completion that you can share on LinkedIn and add to your resume.',
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'I\'m having trouble accessing my course. What should I do?',
          a: 'First, try refreshing your browser and clearing your cache. If the issue persists, contact our support team at support@learnflow.com with details about the problem.',
        },
        {
          q: 'Can I access courses on mobile devices?',
          a: 'Absolutely! Our platform is fully responsive and works seamlessly on desktop, tablet, and mobile devices. We also have dedicated mobile apps for iOS and Android.',
        },
        {
          q: 'What are the system requirements?',
          a: 'You need a modern web browser (Chrome, Firefox, Safari, or Edge) and a stable internet connection. Most courses work well with internet speeds of 5 Mbps or higher.',
        },
      ],
    },
    {
      category: 'Account & Billing',
      questions: [
        {
          q: 'How do I update my payment information?',
          a: 'Go to your Account Settings, click on "Billing," and you can update your payment method there.',
        },
        {
          q: 'Can I share my account with others?',
          a: 'Each account is for individual use only and cannot be shared. However, we offer team and enterprise plans for organizations.',
        },
        {
          q: 'How do I cancel my subscription?',
          a: 'You can cancel any subscription from your Account Settings under "Subscriptions." Your access will continue until the end of your billing period.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#9CA3AF] mb-8">
            Find answers to common questions about LearnFlow
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#9CA3AF]" />
              <Input
                placeholder="Search for answers..."
                className="pl-10 bg-[#1F2937] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
              />
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6">{category.category}</h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.category}-${index}`}
                    className="bg-[#1F2937] rounded-xl border border-white/5 px-6"
                  >
                    <AccordionTrigger className="text-[#E5E7EB] hover:text-[#4A90E2] text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#9CA3AF]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-[#1F2937] rounded-2xl p-8 border border-white/5 text-center">
          <h3 className="text-2xl font-bold text-[#E5E7EB] mb-3">Still have questions?</h3>
          <p className="text-[#9CA3AF] mb-6">
            Our support team is here to help you 24/7
          </p>
          <Button className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
