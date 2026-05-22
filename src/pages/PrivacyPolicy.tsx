import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Privacy Policy - Transformed Academy & Salon"
        description="Read our Privacy Policy to understand how Transformed Academy & Salon collects, uses, and protects your personal information."
        keywords="privacy policy, data protection, personal information, GDPR, cookies, data security, beauty salon privacy"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy - Transformed Academy & Salon",
          "description": "Our Privacy Policy explains how we collect, use, and protect your personal information.",
          "url": "https://transformedacademyhq.co.uk/privacy-policy",
          "mainEntity": {
            "@type": "WebContent",
            "name": "Privacy Policy",
            "text": "This Privacy Policy explains how Transformed Academy & Salon collects, uses, and protects your personal information."
          }
        }}
      />
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12 pt-28 md:pt-32 max-w-4xl">
        <h1 className="text-2xl md:text-4xl font-serif text-gold-700 mb-6 md:mb-8 text-center">Privacy Policy</h1>

        <div className="prose prose-sm md:prose-lg max-w-none overflow-x-hidden">
          <p className="text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">1. Introduction</h2>
          <p>
            Welcome to Transformed Academy & Salon ("we," "our," or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website transformedacademyhq.co.uk, use our services, or communicate with us.
          </p>
          <p>
            By accessing or using our services, you consent to the practices described in this Privacy Policy. If you do not agree with the policies and practices described here, please do not use our services.
          </p>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">2. Information We Collect</h2>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-5 md:mt-6 mb-2 md:mb-3">2.1 Personal Information</h3>
          <p>We may collect personal information that you provide directly to us, including but not limited to:</p>
          <ul className="list-disc pl-4 md:pl-6 mb-3 md:mb-4 text-sm md:text-base">
            <li>Contact information (name, email address, phone number, postal address)</li>
            <li>Booking information (appointment dates, services requested)</li>
            <li>Payment information (processed through secure third-party payment processors)</li>
            <li>Account information (if you create an account)</li>
            <li>Communications you send to us</li>
            <li>Health information relevant to the services you receive</li>
            <li>Photos or videos you provide or that we take with your consent</li>
            <li>Training course enrollment information</li>
          </ul>

          <h3 className="text-xl font-serif text-gold-500 mt-6 mb-3">2.2 Information Collected Automatically</h3>
          <p>When you visit our website, we may automatically collect certain information about your device and usage, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages you visit</li>
            <li>Time and date of your visit</li>
            <li>Time spent on pages</li>
            <li>Referral source</li>
            <li>Click patterns</li>
          </ul>
          <p>We may use cookies, web beacons, and similar technologies to collect this information.</p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and manage appointments and bookings</li>
            <li>Process payments</li>
            <li>Communicate with you about services, promotions, events, and other news</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Personalize your experience</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>Protect against, identify, and prevent fraud and other illegal activity</li>
            <li>Comply with legal obligations</li>
            <li>Maintain appropriate records for internal administrative purposes</li>
            <li>Facilitate training courses and educational programs</li>
          </ul>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">4. Sharing Your Information</h2>
          <p>We may share your personal information in the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., payment processing, appointment scheduling, email delivery).</li>
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, financing, or sale of business assets, your information may be transferred as part of that transaction.</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
            <li><strong>Protection of Rights:</strong> We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, or situations involving potential threats to the safety of any person.</li>
            <li><strong>With Your Consent:</strong> We may share information with your consent or at your direction.</li>
          </ul>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">5. Data Retention</h2>
          <p>
            We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. For example, we may retain certain information for legal, tax, accounting, or business purposes, or to resolve disputes or enforce our agreements.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">6. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Accessing, correcting, or deleting your personal information</li>
            <li>Objecting to our processing of your information</li>
            <li>Requesting restriction of processing</li>
            <li>Data portability</li>
            <li>Withdrawing consent (where processing is based on consent)</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the details provided in the "Contact Us" section below. Please note that we may ask you to verify your identity before responding to such requests.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">7. Cookies and Similar Technologies</h2>
          <p>
            Our website uses cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings and other tools. However, if you block certain cookies, you may not be able to use all the features of our website.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">8. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">9. Third-Party Links and Services</h2>
          <p>
            Our website may contain links to third-party websites, services, or content that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">10. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to delete that information as soon as possible. If you believe we have collected information from a child under 16, please contact us.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">11. International Data Transfers</h2>
          <p>
            Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. By using our services, you consent to the transfer of your information to these countries.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
          </p>

          <h2 className="text-2xl font-serif text-gold-600 mt-8 mb-4">13. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
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

export default PrivacyPolicy;
