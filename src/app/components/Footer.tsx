import { GraduationCap, Twitter, Linkedin, Github, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const footerLinks = {
    Platform: [
      { label: 'Courses', value: 'courses' },
      { label: 'Categories', value: 'categories' },
      { label: 'Instructors', value: 'instructors' },
      { label: 'Become an Instructor', value: 'instructor-signup' },
    ],
    Company: [
      { label: 'About Us', value: 'about' },
      { label: 'Contact', value: 'contact' },
      { label: 'Careers', value: 'careers' },
      { label: 'Blog', value: 'blog' },
    ],
    Support: [
      { label: 'Help Center', value: 'faq' },
      { label: 'FAQ', value: 'faq' },
      { label: 'Terms of Service', value: 'terms' },
      { label: 'Privacy Policy', value: 'privacy' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#16213E]/50 mt-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="size-8 text-[#4A90E2]" />
              <span className="font-semibold text-xl text-[#E5E7EB]">LearnFlow</span>
            </div>
            <p className="text-[#9CA3AF] text-sm mb-4 max-w-sm">
              Empowering learners worldwide with premium, expert-led courses. 
              Master new skills, advance your career, and achieve your goals.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="size-9 rounded-lg bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:text-[#4A90E2] hover:bg-[#1F2937]/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-[#E5E7EB] mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.value}>
                    <button
                      onClick={() => onNavigate?.(link.value)}
                      className="text-sm text-[#9CA3AF] hover:text-[#4A90E2] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#9CA3AF]">
            © {new Date().getFullYear()} LearnFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate?.('terms')}
              className="text-sm text-[#9CA3AF] hover:text-[#4A90E2] transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => onNavigate?.('privacy')}
              className="text-sm text-[#9CA3AF] hover:text-[#4A90E2] transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate?.('cookies')}
              className="text-sm text-[#9CA3AF] hover:text-[#4A90E2] transition-colors"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
