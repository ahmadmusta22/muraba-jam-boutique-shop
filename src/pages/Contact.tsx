
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Info } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Your message has been sent!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-6xl mx-auto">
          {/* Page title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-semibold mb-4">{t('nav.contact')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you! Get in touch with our team for inquiries, feedback, or collaboration opportunities.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact information */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 p-3 rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Olive Grove Road<br />
                      Tunis, Tunisia 1002
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone Number</h3>
                    <p className="text-muted-foreground">
                      +216 71 234 567<br />
                      Mon-Fri, 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Address</h3>
                    <p className="text-muted-foreground">
                      info@muraba.com<br />
                      orders@muraba.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-3 rounded-full bg-primary/10">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {/* Social media icons would go here */}
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-3 bg-muted/20 p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-serif font-semibold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto px-8">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
          
          {/* Map section */}
          <div className="mt-16">
            <div className="rounded-lg overflow-hidden border border-border h-[400px] bg-muted/20 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Find Us on the Map</h3>
                <p className="text-muted-foreground">
                  123 Olive Grove Road, Tunis, Tunisia 1002
                </p>
                {/* In a real implementation, you would integrate with a maps API like Google Maps */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
