import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { motion } from 'motion/react';

interface ContactProps {
  onNavigate?: (page: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Our support team is here to help',
      value: 'support@learnflow.com',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm PST',
      value: '+1 (555) 123-4567',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: '123 Learning Street, San Francisco, CA 94105',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-4">Get in Touch</h1>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Have a question or need help? We're here for you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1F2937] rounded-xl p-6 border border-white/5 text-center"
            >
              <div className={`size-14 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4`}>
                <method.icon className="size-7 text-white" />
              </div>
              <h3 className="font-semibold text-[#E5E7EB] mb-2">{method.title}</h3>
              <p className="text-sm text-[#9CA3AF] mb-3">{method.description}</p>
              <p className="text-sm text-[#4A90E2] font-medium">{method.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1F2937] rounded-2xl p-8 border border-white/5"
          >
            <h2 className="text-2xl font-bold text-[#E5E7EB] mb-6">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E5E7EB] mb-2">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Subject</label>
                <Input
                  placeholder="How can we help you?"
                  className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E5E7EB] mb-2">Message</label>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="bg-[#16213E] border-white/10 text-[#E5E7EB] placeholder:text-[#9CA3AF] focus:border-[#4A90E2] focus:ring-[#4A90E2]/20"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white h-11"
              >
                <Send className="size-4 mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* FAQ Link */}
            <div className="bg-gradient-to-br from-[#4A90E2] to-[#3B8075] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Need help right away?</h3>
              <p className="text-white/90 mb-6">
                Check out our FAQ section for instant answers to common questions.
              </p>
              <Button
                variant="secondary"
                className="bg-white text-[#4A90E2] hover:bg-white/90"
                onClick={() => onNavigate?.('faq')}
              >
                Visit FAQ
              </Button>
            </div>

            {/* Office Hours */}
            <div className="bg-[#1F2937] rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-semibold text-[#E5E7EB] mb-4">Office Hours</h3>
              <div className="space-y-3 text-[#9CA3AF]">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-[#E5E7EB]">8:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-[#E5E7EB]">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-[#E5E7EB]">Closed</span>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-[#1F2937] rounded-2xl p-8 border border-white/5">
              <h3 className="text-xl font-semibold text-[#E5E7EB] mb-4">Response Time</h3>
              <p className="text-[#9CA3AF]">
                We typically respond to all inquiries within{' '}
                <span className="text-[#4A90E2] font-semibold">24 hours</span> during business days. For urgent matters, please call us directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
