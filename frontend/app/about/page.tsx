import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Target, Award, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Webcraft Studio — our team, mission, and values.',
};

const values = [
  {
    icon: Target,
    title: 'Results Driven',
    desc: 'We measure success by the business impact we create, not just aesthetics.',
    color: '#00d4ff',
  },
  {
    icon: Award,
    title: 'Quality First',
    desc: 'Every line of code, every pixel is crafted with intention and precision.',
    color: '#64ff6b',
  },
  {
    icon: Users,
    title: 'Transparent Process',
    desc: 'Clear communication and complete visibility throughout your project.',
    color: '#a78bfa',
  },
];

const team = [
  {
    name: 'Manas Pratim Bordoloi',
    role: 'Founder & Lead Developer',
    avatar: 'MPB',
    bio: 'Full-stack developer with expertise in Next.js, React, and modern web technologies. Passionate about building high-performance digital experiences.',
    accent: '#00d4ff',
  },
  {
    name: 'Alex Sharma',
    role: 'UI/UX Design Lead',
    avatar: 'AS',
    bio: 'Creates intuitive, beautiful interfaces that balance aesthetics with conversion optimization.',
    accent: '#a78bfa',
  },
  {
    name: 'Jordan Chen',
    role: 'Full-Stack Engineer',
    avatar: 'JC',
    bio: 'Specializes in performance optimization, scalable architecture, and enterprise integrations.',
    accent: '#64ff6b',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16" style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #050818 0%, #0a0e27 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.08)', color: '#a78bfa' }}>
            About Us
          </span>
          <h1 className="text-5xl font-bold text-white mb-5" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            We&apos;re a Team of{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Craftspeople
            </span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
            Webcraft Studio was founded with one mission: to bridge the gap between beautiful design
            and high-performance engineering. We create digital experiences that not only look stunning
            but drive real business results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl p-7 group transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                <v.icon size={22} style={{ color: v.color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-5" style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}>
            Meet the Team
          </span>
          <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>The People Behind the Magic</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl p-7 text-center group transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${member.accent}, ${member.accent}80)`, boxShadow: `0 0 20px ${member.accent}30` }}>
                {member.avatar}
              </div>
              <h3 className="text-white font-bold mb-1">{member.name}</h3>
              <div className="text-sm mb-3" style={{ color: member.accent }}>{member.role}</div>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button size="lg" className="btn-glow-anim">Work With Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
