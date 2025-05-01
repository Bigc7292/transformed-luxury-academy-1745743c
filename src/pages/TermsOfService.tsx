import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Terms of Service - Transformed Academy & Salon"
        description="Read our Terms of Service to understand the terms and conditions that govern your use of Transformed Academy & Salon's services and website."
        keywords="terms of service, terms and conditions, salon terms, beauty salon terms, service agreement, cancellation policy, payment terms"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms of Service - Transformed Academy & Salon",
          "description": "Our Terms of Service explain the conditions for using our services and website.",
          "url": "https://transformedacademyhq.co.uk/terms-of-service",
          "mainEntity": {
            "@type": "WebContent",
            "name": "Terms of Service",
            "text": "These Terms of Service govern your use of Transformed Academy & Salon's website and services."
          }
        }}
      />
      <Navbar />

      <div className="container mx-auto px-4 py-12 pt-32 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-serif text-salon-pink-700 mb-8 text-center">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Transformed Academy & Salon. These Terms of Service ("Terms") govern your use of our website (transformedacademyhq.co.uk), services, and products. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">2. Services</h2>
          <p>
            Transformed Academy & Salon offers a range of beauty, aesthetic, and training services. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">3. Appointments and Cancellations</h2>
          <p>
            Appointments can be made through our website, by phone, or in person. We require a minimum of 24 hours' notice for cancellations or rescheduling. Late cancellations or no-shows may result in a cancellation fee or forfeiture of any deposit paid.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">4. Payment Terms</h2>
          <p>
            Payment is required at the time of service unless otherwise specified. For certain services, we may require a deposit at the time of booking. We accept various payment methods as indicated on our website or at our location.
          </p>
          <p>
            Prices for our services are subject to change without notice. We reserve the right to modify or discontinue services without liability to you.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">5. Training Courses</h2>
          <p>
            For training courses, full payment or a deposit (as specified) is required to secure your place. Specific terms and conditions for training courses will be provided at the time of booking.
          </p>
          <p>
            Certificates will only be issued upon successful completion of the course and full payment of course fees.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">6. Health and Safety</h2>
          <p>
            You agree to provide accurate and complete information about your health, medical conditions, allergies, and medications that may affect the services we provide. We reserve the right to refuse service if we believe a service may pose a health or safety risk to you.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">7. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property of Transformed Academy & Salon or our content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written consent.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">8. User Content</h2>
          <p>
            If you submit content to our website (such as reviews, comments, or testimonials), you grant us a non-exclusive, royalty-free, perpetual, irrevocable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content worldwide.
          </p>
          <p>
            You represent and warrant that you own or control all rights to the content you submit and that the content does not infringe upon the rights of any third party.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Transformed Academy & Salon shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your use of or inability to use our services</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from our services</li>
            <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services</li>
          </ul>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">10. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Transformed Academy & Salon, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of our services or your violation of these Terms.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the courts of the United Kingdom.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website. Your continued use of our services after such modifications constitutes your acceptance of the revised Terms.
          </p>

          <h2 className="text-2xl font-serif text-salon-pink-600 mt-8 mb-4">13. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mb-6">
            <strong>Transformed Academy & Salon</strong><br />
            38 Widemarsh St<br />
            Hereford<br />
            Email: info@transformedacademyhq.co.uk<br />
            Phone: 01432 278 174
          </p>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default TermsOfService;
