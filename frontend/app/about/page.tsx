import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Webcraft Studio — our team, mission, and values.',
};

const team = [
  { name: 'Alex Chen', role: 'Founder & Lead Developer', avatar: 'AC', bio: '8+ years building web applications for global brands.' },
  { name: 'Maya Patel', role: 'UI/UX Designer', avatar: 'MP', bio: 'Creates intuitive, beautiful interfaces that convert.' },
  { name: 'Jordan Smith', role: 'Full-Stack Engineer', avatar: 'JS', bio: 'Specializes in performance optimization and scalable architecture.' },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      <div className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
              About Us
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              We&apos;re a Team of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                Digital Craftspeople
              </span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Webcraft Studio was founded with one mission: to bridge the gap between beautiful design 
              and high-performance engineering. We create digital experiences that not only look stunning 
              but drive real business results.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { title: 'Quality First', desc: 'Every line of code, every pixel is crafted with intention and precision.' },
              { title: 'Results Driven', desc: 'We measure success by the impact we create for your business.' },
              { title: 'Transparent Process', desc: 'Clear communication and complete visibility throughout your project.' },
            ].map(v => (
              <div key={v.title} className="bg-gray-900 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          <h2 className="text-3xl font-bold text-white text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {team.map(member => (
              <div key={member.name} className="bg-gray-900 border border-white/10 rounded-2xl p-6 text-center hover:border-cyan-500/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-white font-bold mb-1">{member.name}</h3>
                <div className="text-cyan-400 text-sm mb-3">{member.role}</div>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button size="lg">Work With Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
