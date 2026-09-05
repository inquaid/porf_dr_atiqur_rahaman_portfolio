import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionContainer from '../layout/SectionContainer';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaCode,
  FaResearchgate,
} from 'react-icons/fa';
import { SiCodeforces, SiCodechef } from 'react-icons/si';
import { IconWrapper } from '../common/IconWrapper';
import { useSubmitContact } from '../../hooks/useCRM';
import { useProfile } from '../../hooks/useProfile';
import { useSocialLinks } from '../../hooks/useSocialLinks';

const getContactSocialIcon = (platform: string) => {
  const p = (platform || '').toLowerCase();
  if (p.includes('github')) return FaGithub;
  if (p.includes('linkedin')) return FaLinkedin;
  if (p.includes('twitter') || p.includes('x')) return FaTwitter;
  if (p.includes('facebook')) return FaFacebook;
  if (p.includes('instagram')) return FaInstagram;
  if (p.includes('youtube')) return FaYoutube;
  if (p.includes('researchgate')) return FaResearchgate;
  if (p.includes('codeforces')) return SiCodeforces;
  if (p.includes('codechef')) return SiCodechef;
  return FaCode;
};

type ContactSectionProps = {
  id: string;
  isActive: boolean;
};

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionDescription = styled(motion.p)`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 800px;
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 15px;
  padding: 30px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: ${({ theme }) => `${theme.background}80`};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}30`};
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background: ${({ theme }) => `${theme.background}80`};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}30`};
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.buttonGradient};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.hoverGradient};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ContactInfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ContactCard = styled.div`
  background: ${({ theme }) => `${theme.cardBackground}f0`};
  border-radius: 15px;
  padding: 25px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactCardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.metalGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const ContactText = styled.div`
  color: ${({ theme }) => theme.text};
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 2px;
`;

const ContactValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const SocialLinksContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    transform: translateY(-5px);
    background: ${({ theme }) => theme.hoverGradient};
  }
`;

const AlertMessage = styled.div<{ isError: boolean }>`
  background: ${(props) => (props.isError ? `rgba(255, 50, 50, 0.1)` : `rgba(50, 255, 50, 0.1)`)};
  border: 1px solid
    ${(props) => (props.isError ? `rgba(255, 50, 50, 0.5)` : `rgba(50, 255, 50, 0.5)`)};
  color: ${(props) => (props.isError ? `rgba(255, 50, 50, 1)` : `rgba(50, 255, 50, 1)`)};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const ContactSection: React.FC<ContactSectionProps> = ({ id, isActive }) => {
  const form = useRef<HTMLFormElement>(null);
  const { data: profile } = useProfile();
  const { data: contactSocialLinks } = useSocialLinks('contact');

  const contactEmail = profile?.infoGrid?.email || 'azmaininquaidhaque@gmail.com';
  const contactPhone = profile?.infoGrid?.phone || '+8801320356909';
  const contactLocation = profile?.infoGrid?.location || 'Khulna, Bangladesh';

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Initialize with your public key
    emailjs.init('FGP47aN5c8l7acCrq');
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitContactMutation = useSubmitContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Map field names to state properties
    const fieldToStateMap: Record<string, string> = {
      from_name: 'name',
      from_email: 'email',
      subject: 'subject',
      message: 'message',
    };

    const stateField = fieldToStateMap[name] || name;
    setFormData((prev) => ({ ...prev, [stateField]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ message: 'Please complete all required fields.', isError: true });
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ message: 'Please enter a valid email address.', isError: true });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ message: 'Sending your message...', isError: false });

    try {
      // 1. Submit lead directly to Supabase CRM database
      await submitContactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Contact Form',
        message: formData.message,
      });

      // 2. Dispatch EmailJS notification as background delivery if keys are available
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_g9mej5n';
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_dvyqkpc';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'FGP47aN5c8l7acCrq';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Portfolio Contact Form',
        message: formData.message,
      };

      emailjs.send(serviceID, templateID, templateParams, publicKey).catch((err) => {
        // Log silently since DB persistence is already guaranteed
        console.warn('EmailJS secondary delivery status:', err?.text || err?.message);
      });

      setFormStatus({
        message: 'Thank you for your message! It has been received and I will get back to you soon.',
        isError: false,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setFormStatus({
        message: `Failed to submit inquiry: ${err?.message || 'Please try again later'}.`,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer id={id} isActive={isActive}>
      <ContactContent>
        <SectionTitle
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </SectionTitle>

        <SectionDescription
          initial={{ y: -20, opacity: 0 }}
          animate={isActive ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          I&apos;m always open to new opportunities and collaborations. Feel free to reach out if
          you&apos;d like to work together or just say hello!
        </SectionDescription>

        <ContactContainer>
          <ContactForm
            ref={form}
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
            onSubmit={handleSubmit}
          >
            {formStatus && (
              <AlertMessage isError={formStatus.isError}>{formStatus.message}</AlertMessage>
            )}

            <FormGroup>
              <FormLabel htmlFor="name">Name *</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="from_name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">Email *</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="from_email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormInput
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="message">Message *</FormLabel>
              <FormTextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              <IconWrapper icon={FaEnvelope} size={16} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>

          <ContactInfoContainer
            variants={containerVariants}
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
          >
            <ContactCard>
              <ContactCardTitle>Contact Information</ContactCardTitle>

              {contactEmail && (
                <ContactInfoItem>
                  <ContactIcon>
                    <IconWrapper icon={FaEnvelope} size={20} />
                  </ContactIcon>
                  <ContactText>
                    <ContactLabel>Email</ContactLabel>
                    <ContactValue>{contactEmail}</ContactValue>
                  </ContactText>
                </ContactInfoItem>
              )}

              {contactPhone && (
                <ContactInfoItem>
                  <ContactIcon>
                    <IconWrapper icon={FaPhoneAlt} size={20} />
                  </ContactIcon>
                  <ContactText>
                    <ContactLabel>Phone</ContactLabel>
                    <ContactValue>{contactPhone}</ContactValue>
                  </ContactText>
                </ContactInfoItem>
              )}

              {contactLocation && (
                <ContactInfoItem>
                  <ContactIcon>
                    <IconWrapper icon={FaMapMarkerAlt} size={20} />
                  </ContactIcon>
                  <ContactText>
                    <ContactLabel>Location</ContactLabel>
                    <ContactValue>{contactLocation}</ContactValue>
                  </ContactText>
                </ContactInfoItem>
              )}
            </ContactCard>

            <ContactCard>
              <ContactCardTitle>Connect with Me</ContactCardTitle>
              <p>Follow me on social media or check out my profiles.</p>

              <SocialLinksContainer>
                {contactSocialLinks && contactSocialLinks.length > 0
                  ? contactSocialLinks.map((link) => (
                      <SocialLink
                        key={link.id || link.sanityId}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.label}
                      >
                        <IconWrapper icon={getContactSocialIcon(link.platform)} size={22} />
                      </SocialLink>
                    ))
                  : null}
              </SocialLinksContainer>
            </ContactCard>
          </ContactInfoContainer>
        </ContactContainer>
      </ContactContent>
    </SectionContainer>
  );
};

export default ContactSection;
