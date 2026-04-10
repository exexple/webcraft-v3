'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const baseInputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '0.75rem',
  padding: '0.875rem 1rem',
  color: 'white',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'all 0.2s ease',
};

function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = 'rgba(0,212,255,0.4)';
  e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)';
}

function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
  e.target.style.boxShadow = 'none';
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to send message');
      }
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const inputClass = 'w-full rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 placeholder-shown:text-slate-500';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 rounded-xl text-sm" style={{ background: 'rgba(100,255,107,0.08)', border: '1px solid rgba(100,255,107,0.2)', color: '#64ff6b' }}>
          <CheckCircle size={18} />
          <span>Message sent! We&apos;ll get back to you within 24 hours.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-xl text-sm" style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171' }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
            placeholder="Your Name *"
            className={inputClass}
            style={baseInputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.name && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.name.message}</p>}
        </div>
        <div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' },
            })}
            type="email"
            placeholder="Email Address *"
            className={inputClass}
            style={baseInputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {errors.email && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <input
          {...register('phone')}
          type="tel"
          placeholder="Phone Number (optional)"
          className={inputClass}
          style={baseInputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div>
        <textarea
          {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
          rows={5}
          placeholder="Tell us about your project *"
          className={`${inputClass} resize-none`}
          style={baseInputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {errors.message && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        loading={status === 'loading'}
        className="w-full btn-glow-anim"
        size="lg"
      >
        Send Message
      </Button>
    </form>
  );
}
