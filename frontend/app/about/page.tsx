import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Award, Target, Eye, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Webcraft Studio — our team, mission, and values.',
};

const team = [
  { name: 'Manas Pratim Bordoloi', role: 'Founder & Lead Developer', avatar: 'MPB', bio: 'Visionary developer with 5+ years building premium web experiences for global brands. Passionate about performance and design.', color: '#00d4ff' },
  { name: 'Alex Chen', role: 'UI/UX Lead Designer', avatar: 'AC', bio: 'Creates intuitive, beautiful interfaces that convert visitors into customers with a keen eye for detail.', color: '#64ff6b' },
  { name: 'Jordan Smith', role: 'Full-Stack Engineer', avatar: 'JS', bio: 'Specializes in performance optimization and scalable architecture for complex web applications.', color: '#00d4ff' },
];

const values = [
  { icon: Award, title: 'Quality First', desc: 'Every line of code, every pixel is crafted with intention and precision.', color: '#00d4ff' },
  { icon: Target, title: 'Results Driven', desc: 'We measure success by the impact we create for your business.', color: '#64ff6b' },
  { icon: Eye, title: 'Transparent Process', desc: 'Clear communication and complete visibility throughout your project.', color: '#00d4ff' },
];

const milestones = [
  { year: '2021', title: 'Founded', desc: 'Started with a vision to build premium web experiences' },
  { year: '2022', title: 'First 10 Clients', desc: 'Delivered exceptional results for our first major clients' },
  { year: '2023', title: '25+ Projects', desc: 'Scaled our team and expanded our service offerings' },
  { year: '2024', title: '50+ Projects', desc: 'Established as a trusted digital agency globally' },
];

export default function AboutPage() {
  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(0,212,255,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ border: '1px solid rgba(0,212,255,0.3)', background: 'rgba(0,212,255,0.08)', color: '#00d4ff' }}
          >
            About Us
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            We&apos;re a Team of{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #64ff6b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Craftspeople
            </span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#b0b5c3' }}>
            Webcraft Studio was founded with one mission: to bridge the gap between beautiful design
            and high-performance engineering. We create digital experiences that not only look stunning
            but drive real business results.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {values.map(v => (
            <div
              key={v.title}
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(26, 31, 58, 0.6)', border: `1px solid ${v.color}20` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                <v.icon size={22} style={{ color: v.color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-sm" style={{ color: '#b0b5c3' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div
          className="rounded-3xl p-10 mb-20 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(100,255,107,0.06) 100%)', border: '1px solid rgba(0,212,255,0.15)' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#b0b5c3' }}>
            To empower businesses with world-class digital experiences that combine{' '}
            <span style={{ color: '#00d4ff' }}>stunning design</span>,{' '}
            <span style={{ color: '#64ff6b' }}>blazing performance</span>, and{' '}
            <span style={{ color: '#00d4ff' }}>measurable results</span>.
          </p>
        </div>

        {/* Timeline */}
        <h2 className="text-3xl font-bold text-white text-center mb-10">Our Journey</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(26, 31, 58, 0.6)', border: `1px solid ${i % 2 === 0 ? 'rgba(0,212,255,0.2)' : 'rgba(100,255,107,0.2)'}` }}
            >
              <div className="text-3xl font-extrabold mb-2" style={{ color: i % 2 === 0 ? '#00d4ff' : '#64ff6b' }}>{m.year}</div>
              <div className="text-white font-semibold mb-1">{m.title}</div>
              <div className="text-xs" style={{ color: '#b0b5c3' }}>{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="text-3xl font-bold text-white text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {team.map(member => (
            <div
              key={member.name}
              className="p-6 rounded-2xl text-center"
              style={{ background: 'rgba(26, 31, 58, 0.6)', border: `1px solid ${member.color}20` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
                style={{ background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`, border: `2px solid ${member.color}50`, color: member.color }}
              >
                {member.avatar}
              </div>
              <h3 className="text-white font-bold mb-1">{member.name}</h3>
              <div className="text-sm mb-3 font-medium" style={{ color: member.color }}>{member.role}</div>
              <p className="text-sm" style={{ color: '#b0b5c3' }}>{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="rounded-2xl p-8 mb-12" style={{ background: 'rgba(26, 31, 58, 0.6)', border: '1px solid rgba(0,212,255,0.1)' }}>
          <h2 className="text-2xl font-bold text-white mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Next.js & React specialists with 5+ years experience',
              'Proven track record: 50+ successful projects delivered',
              'Average 5x ROI improvement for our clients',
              '98% client satisfaction rate across all projects',
              'Full-stack expertise from design to deployment',
              'Ongoing support and maintenance included',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#64ff6b' }} />
                <span className="text-sm" style={{ color: '#b0b5c3' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact">
            <Button size="lg">Work With Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
