import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import SEO from '../components/SEO';

const ComplaintsPolicy: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
  const reviewDate = nextYearDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SEO
        title="Complaints Procedure Policy - Transformed Academy & Salon"
        description="Read our Complaints Procedure Policy to understand how we handle and resolve client complaints fairly and efficiently."
        keywords="complaints policy, complaints procedure, customer care, clinic policy, data protection, Transformed Academy"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Complaints Procedure Policy - Transformed Academy & Salon",
          "description": "Our Complaints Procedure Policy outlines how complaints are managed to ensure they are handled fairly, consistently, and in a timely manner.",
          "url": "https://transformedacademyhq.co.uk/complaints-policy"
        }}
      />
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12 pt-28 md:pt-32 max-w-4xl">
        <h1 className="text-2xl md:text-4xl font-serif text-gold-700 mb-6 md:mb-8 text-center">Complaints Procedure Policy</h1>

        <div className="prose prose-zinc prose-sm md:prose-lg max-w-none overflow-x-hidden">
          <div className="bg-gold-50/50 border border-gold-200/50 rounded-lg p-6 mb-8 text-sm md:text-base">
            <h3 className="text-gold-700 font-serif font-medium mt-0 mb-3">Clinic & Policy Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><strong>Clinic Name:</strong> Transformed Academy HQ</div>
              <div><strong>Address:</strong> Unit R05 Cardiff Bay Business Centre, CF24 5BS</div>
              <div><strong>Complaints Lead / Registered Manager:</strong> Kayla (CEO)</div>
              <div><strong>Effective Date:</strong> {currentDate}</div>
              <div><strong>Review Date:</strong> {reviewDate}</div>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">1. Purpose</h2>
          <p>
            This policy outlines how complaints are managed to ensure they are handled fairly, consistently, and in a timely manner. We are committed to providing high-quality care and view complaints as an opportunity to improve our services.
          </p>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">2. Definition of a Complaint</h2>
          <p>
            A complaint is any expression of dissatisfaction, whether verbal or written, about the service, treatment, or staff.
          </p>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">3. How to Make a Complaint</h2>
          <p>Complaints can be made via:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>In person:</strong> Visit our salon at Unit R05 Cardiff Bay Business Centre, CF24 5BS</li>
            <li><strong>Telephone:</strong> +44 7716 402303</li>
            <li><strong>Email:</strong> info@transformedacademy.co.uk</li>
            <li><strong>Written letter:</strong> Send to our Cardiff clinic address</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">4. Complaints Lead</h2>
          <p>The designated person responsible for handling and reviewing complaints is:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Name:</strong> Kayla</li>
            <li><strong>Role:</strong> Chief Executive Officer & Registered Complaints Manager</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">5. Process</h2>
          
          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">Step 1: Acknowledgement</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Complaints will be acknowledged within 3 working days.</li>
            <li>The complainant will receive confirmation that their complaint is being investigated.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">Step 2: Investigation</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>A thorough investigation will be carried out.</li>
            <li>Relevant records will be reviewed (consultation forms, treatment notes, etc.).</li>
            <li>Staff involved may be asked to provide statements.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">Step 3: Response</h3>
          <p>A formal written response will be provided within 10–20 working days. The response will include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Findings of the investigation</li>
            <li>Outcome and explanation</li>
            <li>Any actions taken</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">Step 4: Resolution</h3>
          <p>Where appropriate, we may offer:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>An apology</li>
            <li>Corrective treatment</li>
            <li>Refund (in line with clinic policy)</li>
            <li>Referral for further medical care</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">6. Escalation</h2>
          <p>
            If the complainant is not satisfied with the outcome, they may escalate their complaint to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The Care Quality Commission (for regulated services)</li>
            <li>The relevant professional body (if applicable)</li>
          </ul>
          <p>Contact details for escalation bodies will be provided upon request.</p>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">7. Record Keeping</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>All complaints will be documented and stored securely in accordance with medical record standards.</li>
            <li>A complaints log will be maintained.</li>
            <li>Records will include: Date of complaint, Details of complaint, Outcome, and Actions taken.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">8. Confidentiality</h2>
          <p>
            All complaints will be handled in confidence and in accordance with data protection laws (GDPR) and guidance from the Information Commissioner's Office (ICO).
          </p>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">9. Learning & Improvement</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Complaints will be reviewed regularly by the clinic lead.</li>
            <li>Trends will be analysed to improve overall clinical standards.</li>
            <li>Systemic improvements will be implemented where necessary.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">10. Duty of Candour</h2>
          <p>
            We are committed to being open and honest with clients when something goes wrong, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Providing a clear explanation of what occurred.</li>
            <li>Offering a sincere and formal apology.</li>
            <li>Taking appropriate action to correct the outcome and prevent recurrence.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">11. Review</h2>
          <p>This policy will be reviewed annually or sooner if clinical regulations require.</p>
          
          <div className="border-t border-gold-200/50 mt-10 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <strong>Signed:</strong> Kayla (CEO)
              </div>
              <div>
                <strong>Name:</strong> Kayla
              </div>
              <div>
                <strong>Date:</strong> {currentDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default ComplaintsPolicy;
