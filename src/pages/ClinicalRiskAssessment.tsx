import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import SEO from '../components/SEO';

const ClinicalRiskAssessment: React.FC = () => {
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

  // Risk data structure to feed standard risk assessment tables
  const preControlRisks = [
    { hazard: "Infection / cross-contamination", likelihood: 3, severity: 4, rating: 12 },
    { hazard: "Needle-stick injury", likelihood: 3, severity: 3, rating: 9 },
    { hazard: "Vascular occlusion", likelihood: 2, severity: 5, rating: 10 },
    { hazard: "Anaphylaxis / allergic reaction", likelihood: 2, severity: 5, rating: 10 },
    { hazard: "Intravascular injection complications (e.g. blindness risk)", likelihood: 1, severity: 5, rating: 5 },
    { hazard: "Bruising, swelling, pain", likelihood: 4, severity: 2, rating: 8 },
    { hazard: "Incorrect product placement / dosing error", likelihood: 2, severity: 3, rating: 6 },
    { hazard: "Poor patient selection (contraindications missed)", likelihood: 3, severity: 4, rating: 12 },
    { hazard: "Inadequate consent", likelihood: 2, severity: 3, rating: 6 },
    { hazard: "Sharps and clinical waste hazards", likelihood: 3, severity: 3, rating: 9 },
    { hazard: "Emergency situation mismanagement", likelihood: 2, severity: 5, rating: 10 },
    { hazard: "Medicines management errors", likelihood: 2, severity: 4, rating: 8 }
  ];

  const postControlRisks = [
    { hazard: "Infection / cross-contamination", likelihood: 1, severity: 4, rating: 4 },
    { hazard: "Needle-stick injury", likelihood: 1, severity: 3, rating: 3 },
    { hazard: "Vascular occlusion", likelihood: 1, severity: 5, rating: 5 },
    { hazard: "Anaphylaxis / allergic reaction", likelihood: 1, severity: 5, rating: 5 },
    { hazard: "Intravascular injection complications (e.g. blindness risk)", likelihood: 1, severity: 5, rating: 5 },
    { hazard: "Bruising, swelling, pain", likelihood: 3, severity: 2, rating: 6 },
    { hazard: "Incorrect product placement / dosing error", likelihood: 1, severity: 3, rating: 3 },
    { hazard: "Poor patient selection (contraindications missed)", likelihood: 1, severity: 4, rating: 4 },
    { hazard: "Inadequate consent", likelihood: 1, severity: 3, rating: 3 },
    { hazard: "Sharps and clinical waste hazards", likelihood: 1, severity: 3, rating: 3 },
    { hazard: "Emergency situation mismanagement", likelihood: 1, severity: 5, rating: 5 },
    { hazard: "Medicines management errors", likelihood: 1, severity: 4, rating: 4 }
  ];

  const getRiskColor = (rating: number) => {
    if (rating >= 10) return 'text-red-600 bg-red-50 font-bold';
    if (rating >= 6) return 'text-amber-600 bg-amber-50 font-medium';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SEO
        title="Clinical Risk Assessment - Transformed Academy & Salon"
        description="Review our CQC-aligned Aesthetic Clinic Risk Assessment for injectable treatments, outlining clinical controls and safety measures."
        keywords="clinical risk assessment, aesthetic clinic safety, injectable treatments, CQC guidelines, vascular occlusion, patient safety, Transformed Academy"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Clinical Risk Assessment - Transformed Academy & Salon",
          "description": "Our Aesthetic Clinic Risk Assessment outlines regulated activities, identified hazards, and control measures for injectable treatments.",
          "url": "https://transformedacademyhq.co.uk/clinical-risk-assessment"
        }}
      />
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12 pt-28 md:pt-32 max-w-4xl">
        <h1 className="text-2xl md:text-4xl font-serif text-gold-700 mb-6 md:mb-8 text-center">Clinical Risk Assessment</h1>
        <h2 className="text-lg md:text-xl font-sans text-gray-500 mb-6 text-center uppercase tracking-wider">Injectable Treatments (CQC-Aligned)</h2>

        <div className="prose prose-zinc prose-sm md:prose-lg max-w-none overflow-x-hidden">
          
          {/* Section 1: Overview */}
          <div className="bg-gold-50/50 border border-gold-200/50 rounded-lg p-6 mb-8 text-sm md:text-base">
            <h3 className="text-gold-700 font-serif font-medium mt-0 mb-3">Assessment Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><strong>Clinic Name:</strong> Transformed Academy HQ</div>
              <div><strong>Location:</strong> Unit R05 Cardiff Bay Business Centre, CF24 5BS</div>
              <div><strong>Registered Manager:</strong> Kayla (CEO)</div>
              <div><strong>Assessment Date:</strong> {currentDate}</div>
              <div><strong>Review Date:</strong> {reviewDate}</div>
              <div><strong>Assessor Name & Role:</strong> Kayla (Clinic Lead & Educator)</div>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">1. Regulated Activity</h2>
          <p>
            Administration of botulinum toxin, dermal fillers, skin boosters, and other injectable cosmetic procedures under medical oversight and qualified practitioner delivery.
          </p>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">2. Description of Procedure</h2>
          <p>Brief outline of the injectable treatment process at Transformed Academy HQ:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Consultation and consent:</strong> Patient details registered, expectations discussed, written & verbal consent obtained.</li>
            <li><strong>Medical history review & contraindications:</strong> Review of allergies, current medicines, previous surgeries, and contraindications.</li>
            <li><strong>Product preparation:</strong> Selection of licensed product, verification of batch numbers and expiry dates.</li>
            <li><strong>Injection procedure:</strong> Cleansing and aseptic preparation, markings, and delivery using correct technique (needle/cannula).</li>
            <li><strong>Aftercare advice:</strong> Handout and explanation of post-procedure instructions, complication warnings, and emergency contacts.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">3. Hazards Identified (Injectable-Specific)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm bg-zinc-50 p-4 rounded-lg">
            <div>• Infection / cross-contamination</div>
            <div>• Needle-stick injury</div>
            <div>• Vascular occlusion</div>
            <div>• Anaphylaxis / allergic reaction</div>
            <div>• Intravascular injection complications (e.g. blindness risk)</div>
            <div>• Bruising, swelling, pain</div>
            <div>• Incorrect product placement / dosing error</div>
            <div>• Poor patient selection (contraindications missed)</div>
            <div>• Inadequate consent</div>
            <div>• Sharps and clinical waste hazards</div>
            <div>• Emergency situation mismanagement</div>
            <div>• Medicines management errors</div>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">4. Persons at Risk</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Patients / Clients</li>
            <li>Practitioners (including prescribers)</li>
            <li>Other clinic staff</li>
            <li>Visitors / Models</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">5. Pre-Control Risk Scoring</h2>
          <div className="overflow-x-auto my-4 border border-zinc-200 rounded-lg">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Hazard</th>
                  <th className="px-4 py-3 text-center font-semibold text-zinc-700 w-24">Likelihood (1–5)</th>
                  <th className="px-4 py-3 text-center font-semibold text-zinc-700 w-24">Severity (1–5)</th>
                  <th className="px-4 py-3 text-center font-semibold text-zinc-700 w-28">Risk Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {preControlRisks.map((item, idx) => (
                  <tr key={`pre-${idx}`}>
                    <td className="px-4 py-3 text-gray-800">{item.hazard}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.likelihood}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.severity}</td>
                    <td className={`px-4 py-3 text-center ${getRiskColor(item.rating)}`}>{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">6. Control Measures (CQC Key Lines of Enquiry – Safe)</h2>
          
          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">A. Safe Care & Treatment</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Full medical consultation prior to treatment covering allergies, medications, and contraindications.</li>
            <li>Documented informed consent (written + verbal) detailing the risks of vascular occlusion and complications.</li>
            <li>In-depth facial anatomy knowledge and complications management training for all practitioners.</li>
            <li>Use of licensed, traceable products sourced from reputable aesthetic pharmacies.</li>
            <li>Batch numbers and expiry dates of all products injected are recorded in patient records.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">B. Infection Prevention & Control</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Strict hand hygiene protocol and single-use clinically sterile equipment.</li>
            <li>Required use of Personal Protective Equipment (PPE) including sterile gloves, aprons, and face shields.</li>
            <li>Skin cleansing of treatment area with appropriate medical antiseptic (e.g. Chlorhexidine).</li>
            <li>Clean clinical environment aligned with Health Technical Memorandum (HTM) 01-05 principles.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">C. Medicines Management</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Prescription obtained legally (Patient Specific Direction or equivalent) before administering prescription-only medicines (e.g. botulinum toxin, Hyalase).</li>
            <li>Secure, locked storage of medicines and aesthetic consumables.</li>
            <li>Cold chain maintained in medical refrigeration where required, with daily temperature logging.</li>
            <li>Expiry dates checked prior to clinical setup.</li>
            <li>Clear audit trail from pharmacy delivery to patient administration.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">D. Staff Competence</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Practitioners fully certified in injectables and aesthetic complication management.</li>
            <li>Regular Continuous Professional Development (CPD) and clinical mentoring.</li>
            <li>Basic Life Support (BLS) and anaphylaxis management training kept active and up to date.</li>
            <li>Active medical indemnity and public liability insurance in place.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">E. Emergency Preparedness</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Emergency complications kit fully stocked and checked monthly (including Adrenaline/Epinephrine, Hyaluronidase, and Saline).</li>
            <li>Vascular occlusion pathway protocol and anaphylaxis guides accessible at all times in treatment rooms.</li>
            <li>Clear referral pathways established (e.g. immediate referral to ophthalmology in event of visual disturbance).</li>
          </ul>

          <h3 className="text-lg md:text-xl font-serif text-gold-500 mt-4 mb-2">F. Safety Systems</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Incident reporting system for adverse reactions and clinical near-misses.</li>
            <li>Duty of candour followed at all times (explaining errors, apologies, and correcting the outcome).</li>
            <li>Safeguarding policies and awareness established for vulnerable groups.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">7. Further Action Required</h2>
          <div className="overflow-x-auto my-4 border border-zinc-200 rounded-lg">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Action Needed</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700 w-36">Responsible</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700 w-32">Deadline</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700 w-28">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="px-4 py-3 text-gray-800">Monthly check and audit of emergency hyaluronidase kit expiry dates</td>
                  <td className="px-4 py-3 text-gray-600">Kayla (CEO)</td>
                  <td className="px-4 py-3 text-gray-600">Monthly recurring</td>
                  <td className="px-4 py-3 text-green-600 font-semibold bg-green-50 text-center">Active</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-800">Staff complications pathway mock scenario testing</td>
                  <td className="px-4 py-3 text-gray-600">All Clinic Staff</td>
                  <td className="px-4 py-3 text-gray-600">Bi-annually</td>
                  <td className="px-4 py-3 text-green-600 font-semibold bg-green-50 text-center">Active</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">8. Revised Risk Scoring (Post-Control)</h2>
          <div className="overflow-x-auto my-4 border border-zinc-200 rounded-lg">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Hazard</th>
                  <th className="px-4 py-3 text-center font-semibold text-zinc-700 w-24">Revised Likelihood</th>
                  <th className="px-4 py-3 text-center font-semibold text-zinc-700 w-24">Revised Severity</th>
                  <th className="px-4 py-3 text-center font-semibold text-zinc-700 w-28">Final Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {postControlRisks.map((item, idx) => (
                  <tr key={`post-${idx}`}>
                    <td className="px-4 py-3 text-gray-800">{item.hazard}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.likelihood}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{item.severity}</td>
                    <td className={`px-4 py-3 text-center ${getRiskColor(item.rating)}`}>{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">9. Documentation & Record Keeping (CQC Well-Led / Effective)</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Patient digital medical records stored securely and encrypted in compliance with GDPR.</li>
            <li>High-resolution before/after clinical photographs taken with explicit patient consent.</li>
            <li>Detailed records of product name, batch number, site, volume injected, and technique stored for at least 10 years.</li>
            <li>Adverse event and complications logs maintained securely.</li>
            <li>Regular audit schedule of clinic procedures and medical records.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">10. Patient Experience (CQC Caring / Responsive)</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Comprehensive aftercare sheets printed and emailed to patients post-procedure.</li>
            <li>A 24/48 hour post-treatment follow-up checklist in place for checking swelling, discomfort, or tissue signs.</li>
            <li>A standard complaint-handling policy in place to ensure issues are resolved.</li>
            <li>Accessible 24/7 emergency contact lines for patients concerned about vascular signs.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">11. Sign-Off</h2>
          <div className="border border-gold-200/50 rounded-lg p-6 mb-8 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Assessor Signature:</strong> Kayla (Clinic Lead)
              </div>
              <div>
                <strong>Date:</strong> {currentDate}
              </div>
              <div>
                <strong>Registered Manager Signature:</strong> Kayla (CEO)
              </div>
              <div>
                <strong>Date:</strong> {currentDate}
              </div>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-serif text-gold-600 mt-6 md:mt-8 mb-3 md:mb-4">12. Review Log</h2>
          <div className="overflow-x-auto my-4 border border-zinc-200 rounded-lg">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Review Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Changes Made</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700 w-48">Reviewed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="px-4 py-3 text-gray-800">{currentDate}</td>
                  <td className="px-4 py-3 text-gray-600">Initial policy compilation and CQC alignment review completed.</td>
                  <td className="px-4 py-3 text-gray-600">Kayla (CEO)</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default ClinicalRiskAssessment;
