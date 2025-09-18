import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Call us anytime",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@Revéra.com",
      subtitle: "Send us a message",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "123 Luxury Ave, Beverly Hills, CA 90210",
      subtitle: "Visit our showroom",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Sat: 9AM-8PM, Sun: 11AM-6PM",
      subtitle: "We're here to help",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-[#07060a] text-white">
      {/* Header Section */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-[#efeefe] drop-shadow-[0_0_12px_rgba(124,58,237,0.6)]">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[rgba(255,255,255,0.72)]">
            Have questions about our luxury vehicles? Our expert team is here to
            help you find the perfect car for your needs.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass-panel rounded-2xl p-6 text-center border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] transition-all"
              >
                <div className="bg-[rgba(124,58,237,0.12)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-violet-400 drop-shadow-[0_0_6px_rgba(124,58,237,0.6)]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.85)] font-medium mb-1">
                  {info.details}
                </p>
                <p className="text-sm text-[rgba(255,255,255,0.6)]">
                  {info.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="glass-panel rounded-2xl p-8 border border-[rgba(255,255,255,0.08)] shadow-[0_0_20px_rgba(124,58,237,0.15)]">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-[rgba(124,58,237,0.12)] p-2 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                      First Name
                    </label>
                    <Input
                      placeholder="Enter your first name"
                      className="bg-black border border-[rgba(255,255,255,0.15)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                      Last Name
                    </label>
                    <Input
                      placeholder="Enter your last name"
                      className="bg-black border border-[rgba(255,255,255,0.15)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-black border border-[rgba(255,255,255,0.15)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="bg-black border border-[rgba(255,255,255,0.15)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                    I'm interested in
                  </label>
                  <select className="h-10 w-full rounded-md bg-black border border-[rgba(255,255,255,0.15)] text-white px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500">
                    <option>Buying a luxury car</option>
                    <option>Renting a luxury car</option>
                    <option>General inquiries</option>
                    <option>Partnership opportunities</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                    Message
                  </label>
                  <Textarea
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className="bg-black border border-[rgba(255,255,255,0.15)] text-white placeholder:text-[rgba(255,255,255,0.4)]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-500 text-white font-bold shadow-[0_0_15px_rgba(124,58,237,0.6)] hover:shadow-[0_0_25px_rgba(124,58,237,0.9)]"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map + Quick Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="glass-panel rounded-2xl h-64 flex items-center justify-center border border-[rgba(255,255,255,0.08)]">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[rgba(255,255,255,0.6)] mx-auto mb-4" />
                  <p className="text-[rgba(255,255,255,0.7)]">
                    Interactive Map Coming Soon
                  </p>
                  <p className="text-sm text-[rgba(255,255,255,0.5)] mt-2">
                    123 Luxury Ave, Beverly Hills, CA 90210
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="glass-panel rounded-2xl p-6 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-xl font-bold text-white mb-4">
                  Need Immediate Assistance?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-[rgba(255,255,255,0.08)]">
                    <div>
                      <p className="font-medium text-white">Sales Hotline</p>
                      <p className="text-sm text-[rgba(255,255,255,0.6)]">
                        For buying inquiries
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.6)]"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-[rgba(255,255,255,0.08)]">
                    <div>
                      <p className="font-medium text-white">Rental Support</p>
                      <p className="text-sm text-[rgba(255,255,255,0.6)]">
                        For rental assistance
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-[0_0_15px_rgba(77,163,255,0.6)]"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="glass-panel rounded-2xl p-6 border border-[rgba(255,255,255,0.08)]">
                <h3 className="text-xl font-bold text-white mb-4">
                  Business Hours
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[rgba(255,255,255,0.6)]">
                      Monday - Friday
                    </span>
                    <span className="text-white font-medium">
                      9:00 AM - 8:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(255,255,255,0.6)]">
                      Saturday
                    </span>
                    <span className="text-white font-medium">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(255,255,255,0.6)]">
                      Sunday
                    </span>
                    <span className="text-white font-medium">
                      11:00 AM - 5:00 PM
                    </span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[rgba(124,58,237,0.12)] rounded-lg">
                  <p className="text-sm text-violet-300 font-medium">
                    💡 Appointments available outside business hours by request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
