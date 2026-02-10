'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import type { Dictionary } from '@/dictionaries';

interface ContactFormClientProps {
  dict: Dictionary;
  locale: string;
}

export default function ContactFormClient({ dict, locale }: ContactFormClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    captchaAnswer: '',
    captchaToken: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(true);
  const isEnglish = locale === 'en';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadCaptcha = useCallback(async () => {
    setIsCaptchaLoading(true);
    try {
      const resp = await fetch('/api/contact/captcha', { cache: 'no-store' });
      if (!resp.ok) {
        throw new Error('Captcha fetch failed');
      }
      const payload = (await resp.json()) as { question: string; token: string };
      setCaptchaQuestion(payload.question);
      setFormData((prev) => ({ ...prev, captchaToken: payload.token, captchaAnswer: '' }));
    } catch {
      setCaptchaQuestion('');
      setFormData((prev) => ({ ...prev, captchaToken: '', captchaAnswer: '' }));
      toast.error(
        isEnglish
          ? 'Could not load captcha. Please refresh the challenge.'
          : 'Captcha kon niet geladen worden. Vernieuw de challenge.'
      );
    } finally {
      setIsCaptchaLoading(false);
    }
  }, [isEnglish]);

  useEffect(() => {
    void loadCaptcha();
  }, [loadCaptcha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        const payload = (await resp.json()) as { userMessage?: string; error?: string };
        toast.error(
          payload.userMessage ||
            (isEnglish
              ? 'We could not send your message. Please try again shortly.'
              : 'Uw bericht kon niet worden verzonden. Probeer het zo opnieuw.')
        );
        if (payload.error?.toLowerCase().includes('captcha')) {
          void loadCaptcha();
        }
        return;
      }

      setFormData({ name: '', email: '', subject: '', message: '', captchaAnswer: '', captchaToken: '' });
      toast.success(
        isEnglish
          ? 'Message sent. Thanks, we will get back to you soon.'
          : 'Bericht verzonden. Bedankt, we nemen snel contact op.'
      );
      void loadCaptcha();
    } catch {
      toast.error(
        isEnglish
          ? 'Network issue detected. Please check your connection and try again.'
          : 'Netwerkprobleem gedetecteerd. Controleer uw verbinding en probeer opnieuw.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="surface-panel animate-slide-in-right hover-glow rounded-2xl p-8">
      <h2 className="text-2xl font-bold">
        <span className="gradient-text-purple">{dict.contact.form.title}</span>
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="animate-fade-in-up stagger-2">
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            {dict.contact.form.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={dict.contact.form.namePlaceholder}
            className="mt-2 block w-full rounded-lg border border-indigo-200 bg-white/90 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover-lift dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>

        <div className="animate-fade-in-up stagger-3">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            {dict.contact.form.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={dict.contact.form.emailPlaceholder}
            className="mt-2 block w-full rounded-lg border border-indigo-200 bg-white/90 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover-lift dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>

        <div className="animate-fade-in-up stagger-4">
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            {dict.contact.form.subject}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder={dict.contact.form.subjectPlaceholder}
            className="mt-2 block w-full rounded-lg border border-indigo-200 bg-white/90 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover-lift dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>

        <div className="animate-fade-in-up stagger-5">
          <label htmlFor="message" className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
            {dict.contact.form.message}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            placeholder={dict.contact.form.messagePlaceholder}
            className="mt-2 block w-full rounded-lg border border-indigo-200 bg-white/90 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover-lift dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>

        <div className="animate-fade-in-up stagger-6">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="captchaAnswer" className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
              {isEnglish ? 'Captcha Challenge' : 'Captcha Challenge'}
            </label>
            <button
              type="button"
              onClick={() => void loadCaptcha()}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
            >
              {isEnglish ? 'Refresh' : 'Vernieuwen'}
            </button>
          </div>
          <div className="mt-2 rounded-lg border border-indigo-200 bg-indigo-50/70 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            {isCaptchaLoading
              ? isEnglish
                ? 'Loading challenge...'
                : 'Challenge laden...'
              : captchaQuestion || (isEnglish ? 'Challenge unavailable. Click refresh.' : 'Challenge niet beschikbaar. Klik vernieuwen.')}
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            {isEnglish ? 'Enter the correct numeric answer.' : 'Voer het juiste numerieke antwoord in.'}
          </p>
          <input
            type="text"
            id="captchaAnswer"
            name="captchaAnswer"
            value={formData.captchaAnswer}
            onChange={handleChange}
            required
            autoComplete="off"
            placeholder={isEnglish ? 'Your answer' : 'Uw antwoord'}
            className="mt-2 block w-full rounded-lg border border-indigo-200 bg-white/90 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover-lift dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
          />
          <input type="hidden" name="captchaToken" value={formData.captchaToken} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isCaptchaLoading || !formData.captchaToken}
          className="btn-gradient btn-press animate-fade-in-up stagger-6 w-full rounded-lg px-6 py-4 text-base font-semibold text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isSubmitting
            ? isEnglish
              ? 'Sending...'
              : 'Verzenden...'
            : dict.contact.form.submit}
        </button>
      </form>
    </div>
  );
}
