import React, { useState } from 'react';
import { addMessage } from '../utils/db';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addMessage(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'om.maurya0682nmims.in',
      href: 'mailto:om.maurya0682nmims.in'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9653469389',
      href: 'tel:+919653469389'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'www.linkedin.com/in/om-maurya-823016165/',
      href: 'https://www.linkedin.com/in/om-maurya-823016165/'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/om0401',
      href: 'https://github.com/om0401'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-73px)]">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/30 hover:border-primary/50 hover:bg-muted/20 transition-all group"
                  >
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl group-hover:scale-110 transition-transform border border-primary/20">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 backdrop-blur-sm border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
              <CardContent className="pt-6 relative">
                <h3 className="text-foreground mb-2 text-xl">Let's Connect!</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-foreground">Name</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-muted/20 border-border/50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-foreground">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="bg-muted/20 border-border/50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-foreground">Message</label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={6}
                    className="bg-muted/20 border-border/50"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                  disabled={loading}
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
