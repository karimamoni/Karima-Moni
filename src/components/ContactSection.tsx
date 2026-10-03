import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageCircle, Send, CheckCircle2, Phone, Clock, MapPin, Loader2, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService = '' }) => {
  const { data, addLead } = useCms();
  const { contactInfo } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: preselectedService || 'Facebook Ads',
    budget: '$500 – $1,000',
    projectDetails: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [highlightService, setHighlightService] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const serviceSelectRef = useRef<HTMLSelectElement>(null);

  // Sync if preselectedService changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
      setHighlightService(true);

      // Smooth scroll to contact
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }

      // Briefly focus name input after scrolling
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 500);

      const highlightTimer = setTimeout(() => {
        setHighlightService(false);
      }, 3500);

      return () => {
        clearTimeout(timer);
        clearTimeout(highlightTimer);
      };
    }
  }, [preselectedService]);

  const serviceOptions = [
    'Facebook Marketing',
    'Facebook Ads',
    'Google Ads',
    'SEO',
    'Social Media Management',
    'Lead Generation',
    'Email Marketing',
    'Content Marketing',
    'YouTube Marketing',
    'Graphic Design',
    'AI Services',
    'Video Editing',
    'Other',
  ];

  const budgetOptions = [
    'Under $300',
    '$300 – $500',
    '$500 – $1,000',
    '$1,000 – $2,500',
    '$2,500+',
    'Flexible / Undecided',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      // Save lead directly into persistent server database
      const res = await addLead({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        service: formData.service,
        budget: formData.budget,
        projectDetails: formData.projectDetails,
        notes: 'Submitted via public portfolio contact form.',
      });

      if (res.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          service: 'Facebook Ads',
          budget: '$500 – $1,000',
          projectDetails: '',
        });
      } else {
        setErrorMessage('Could not record your inquiry. Please try again or message via WhatsApp.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error. Please try again or reach out on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const rawWa = contactInfo.whatsappNumber.replace(/[^0-9]/g, '');
  const cleanWhatsappNumber = rawWa.startsWith('880')
    ? rawWa
    : rawWa.startsWith('0')
    ? `880${rawWa.slice(1)}`
    : `880${rawWa}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative pb-28 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Channels & Trust */}
          <div className="lg:col-span-5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#003088] mb-2">
              Start a Conversation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] tracking-tight mb-4">
              Let's Talk
            </h2>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Have a question or a project in mind? Feel free to get in touch. Whether you need strategic campaign management, visual identity design, or AI workflows, I'm here to help your brand grow.
            </p>

            {/* Quick Action Channels */}
            <div className="space-y-4 mb-8">
              {/* WhatsApp direct card */}
              <a
                href={`https://wa.me/${cleanWhatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl bg-[#F7F9FC] border border-slate-200/90 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">WhatsApp Direct Chat</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {contactInfo.whatsappNumber}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700">Instant Chat →</span>
              </a>

              {/* Email direct card */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center justify-between p-4 rounded-xl bg-[#F7F9FC] border border-slate-200/90 hover:border-[#003088] hover:bg-blue-50/30 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-[#003088]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email Address</span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-[#003088] transition-colors">
                      {contactInfo.email}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#003088]">Send Email →</span>
              </a>
            </div>

            {/* Working Details */}
            <div className="p-4 rounded-xl bg-[#F7F9FC] border border-slate-200/80 space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#003088] shrink-0" />
                <span>{contactInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F4B820] shrink-0" />
                <span>{contactInfo.workingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Available for consultation & video discovery calls</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Project Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F7F9FC] p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="py-12 px-6 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Project Request Received!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out. Your project inquiry has been securely stored in Karima Moni's CMS inbox. You will receive a response within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 text-xs font-bold text-[#003088] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {highlightService && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-xs text-[#003088] font-semibold animate-in fade-in duration-300">
                      <Sparkles className="w-4 h-4 text-[#F4B820]" />
                      <span>Selected Service: {formData.service}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-800 mb-1.5">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mahmudul Hasan"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:ring-1 focus:ring-[#003088] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:ring-1 focus:ring-[#003088] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WhatsApp */}
                    <div>
                      <label htmlFor="whatsapp" className="block text-xs font-bold text-slate-800 mb-1.5">
                        WhatsApp Number <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        id="whatsapp"
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="e.g. +880 17XX-XXXXXX"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:ring-1 focus:ring-[#003088] transition-all"
                      />
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold text-slate-800 mb-1.5">
                        Select a Service <span className="text-rose-500">*</span>
                      </label>
                      <select
                        ref={serviceSelectRef}
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border rounded-lg focus:outline-hidden focus:border-[#003088] focus:ring-1 focus:ring-[#003088] transition-all ${
                          highlightService
                            ? 'border-[#003088] ring-2 ring-[#003088]/20 bg-blue-50/30'
                            : 'border-slate-300'
                        }`}
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-bold text-slate-800 mb-1.5">
                      Your Budget Range
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:ring-1 focus:ring-[#003088] transition-all"
                    >
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="projectDetails" className="block text-xs font-bold text-slate-800 mb-1.5">
                      Project Details <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="projectDetails"
                      rows={4}
                      required
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Tell me about your business goals, target audience, timeline, or current challenges..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#003088] focus:ring-1 focus:ring-[#003088] transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-[#003088] hover:bg-[#00205c] rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#F4B820]" />
                        <span>Submitting Request to Karima Moni...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Project Request →</span>
                        <Send className="w-4 h-4 text-[#F4B820]" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    Inquiries are stored directly in Karima Moni's verified lead registry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
