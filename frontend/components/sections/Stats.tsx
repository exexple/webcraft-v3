'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { staggerScrollVariant, slideUpOnScrollVariant } from '@/lib/animations';

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 5, suffix: 'x', label: 'Average ROI' },
  { value: 3, suffix: 'yrs', label: 'In Business' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-5xl font-extrabold text-white tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-section-normal bg-gray-900/50 border-y border-white/10">
      <Container size="xl">
        <motion.div
          variants={staggerScrollVariant}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-spacing-xl"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={slideUpOnScrollVariant}
              className="text-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-gray-400 text-sm mt-spacing-md">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
