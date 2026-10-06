import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { contactInfo } from '../../data/mockData';

interface FormState {
    name: string;
    company: string;
    email: string;
    message: string;
}

const EMPTY_FORM: FormState = { name: '', company: '', email: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const setField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        setErrors(err => ({ ...err, [field]: undefined }));
    };

    const validate = (): boolean => {
        const nextErrors: Partial<Record<keyof FormState, string>> = {};
        if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
        if (!form.email.trim()) nextErrors.email = 'Please enter your email.';
        else if (!EMAIL_RE.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
        if (!form.message.trim()) nextErrors.message = 'Tell us a bit about your requirements.';
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('sending');
        window.setTimeout(() => {
            setStatus('sent');
        }, 900);
    };

    const sendAnother = () => {
        setForm(EMPTY_FORM);
        setErrors({});
        setStatus('idle');
    };

    const fields: { id: keyof FormState; label: string; type: string; placeholder: string }[] = [
        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
        { id: 'company', label: 'Company', type: 'text', placeholder: 'Acme Foods Ltd.' },
        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
    ];

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--clr-bg)' }}>
            <Header />
            <main className="flex-grow">
                <div className="py-16 text-center border-b" style={{ backgroundColor: 'var(--clr-bg-alt)', borderColor: 'var(--clr-border)' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: 'var(--clr-primary)' }}>
                        Contact Us
                    </h1>
                    <p style={{ color: 'var(--clr-text-muted)', marginTop: '0.75rem' }}>
                        Request a wholesale quote or get in touch with our export team
                    </p>
                </div>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact info */}
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, color: 'var(--clr-text)', marginBottom: '1.5rem' }}>
                                Our Office
                            </h2>
                            <ul className="space-y-5">
                                {[
                                    { icon: MapPin, label: `Office: ${contactInfo.officeAddress}` },
                                    { icon: MapPin, label: `Factory: ${contactInfo.factoryAddress}` },
                                    { icon: Phone, label: contactInfo.phone },
                                    { icon: Mail, label: contactInfo.email },
                                    { icon: Clock, label: 'Mon – Fri: 8:00 AM – 6:00 PM (ICT)' },
                                ].map(({ icon: Icon, label }) => (
                                    <li key={label} className="flex items-start gap-3">
                                        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--clr-primary)' }} />
                                        <span style={{ color: 'var(--clr-text-muted)' }}>{label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Enquiry form */}
                        <div className="relative rounded-xl p-8 shadow-sm border overflow-hidden"
                            style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)', minHeight: '480px' }}>
                            <AnimatePresence mode="wait">
                                {status === 'sent' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-12"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.6, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                                            className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                                            style={{ backgroundColor: 'rgba(57,109,52,0.12)' }}
                                        >
                                            <CheckCircle2 className="w-9 h-9" style={{ color: 'var(--clr-accent)' }} />
                                        </motion.div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--clr-text)', marginBottom: '0.5rem' }}>
                                            Enquiry Sent
                                        </h3>
                                        <p style={{ color: 'var(--clr-text-muted)', maxWidth: '340px', marginBottom: '1.75rem' }}>
                                            Thanks, {form.name.split(' ')[0] || 'there'} — our export team will get back to you shortly.
                                        </p>
                                        <Button variant="outline" onClick={sendAnother}>Send Another Enquiry</Button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-5"
                                        onSubmit={handleSubmit}
                                        noValidate
                                    >
                                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, color: 'var(--clr-text)' }}>
                                            Send an Enquiry
                                        </h2>
                                        {fields.map(f => (
                                            <div key={f.id}>
                                                <label htmlFor={f.id} className="block text-sm font-medium mb-1" style={{ color: 'var(--clr-text)' }}>
                                                    {f.label}{f.id !== 'company' && <span style={{ color: 'var(--clr-primary)' }}> *</span>}
                                                </label>
                                                <input
                                                    id={f.id}
                                                    type={f.type}
                                                    placeholder={f.placeholder}
                                                    value={form[f.id]}
                                                    onChange={setField(f.id)}
                                                    className="w-full border rounded px-4 py-2.5 text-sm focus:outline-none transition-colors"
                                                    style={{
                                                        borderColor: errors[f.id] ? 'var(--clr-accent-red)' : 'var(--clr-border)',
                                                        backgroundColor: 'var(--clr-bg)',
                                                        color: 'var(--clr-text)',
                                                    }}
                                                />
                                                {errors[f.id] && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-xs mt-1"
                                                        style={{ color: 'var(--clr-accent-red)' }}
                                                    >
                                                        {errors[f.id]}
                                                    </motion.p>
                                                )}
                                            </div>
                                        ))}
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: 'var(--clr-text)' }}>
                                                Message<span style={{ color: 'var(--clr-primary)' }}> *</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={4}
                                                placeholder="Tell us about your requirements..."
                                                value={form.message}
                                                onChange={setField('message')}
                                                className="w-full border rounded px-4 py-2.5 text-sm focus:outline-none resize-none transition-colors"
                                                style={{
                                                    borderColor: errors.message ? 'var(--clr-accent-red)' : 'var(--clr-border)',
                                                    backgroundColor: 'var(--clr-bg)',
                                                    color: 'var(--clr-text)',
                                                }}
                                            />
                                            {errors.message && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-xs mt-1"
                                                    style={{ color: 'var(--clr-accent-red)' }}
                                                >
                                                    {errors.message}
                                                </motion.p>
                                            )}
                                        </div>
                                        <Button variant="primary" size="lg" className="w-full" type="submit" disabled={status === 'sending'}>
                                            {status === 'sending' ? (
                                                <span className="flex items-center gap-2">
                                                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                                </span>
                                            ) : (
                                                'Send Enquiry'
                                            )}
                                        </Button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
