
// Define types for our conversation data
export interface ChatbotResponse {
  keywords: string[];
  response: string;
}

// Create a data structure with predefined responses based on keywords
export const chatbotResponses: ChatbotResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! Welcome to Transformed Academy. How can I assist you with our beauty services today?"
  },
  {
    keywords: ['service', 'treatment', 'offer', 'provide'],
    response: "We offer a range of aesthetic treatments including lip fillers, botox, dermal fillers, jawline contouring, and more. Is there a specific treatment you'd like to know about?"
  },
  {
    keywords: ['price', 'cost', 'fee', 'how much'],
    response: "Our prices vary based on the treatment and amount of product used. Lip fillers start at $350, Botox from $300, and dermal fillers from $400. Would you like to book a consultation for a personalized quote?"
  },
  {
    keywords: ['book', 'appointment', 'schedule', 'reservation'],
    response: "I'd be happy to help you book an appointment! You can schedule directly on our website using the 'Book Now' button, or I can take your details here and our staff will contact you to confirm."
  },
  {
    keywords: ['cancel', 'reschedule', 'change appointment'],
    response: "To cancel or reschedule an appointment, please contact us at least 24 hours in advance. You can call us or reply to your confirmation email with the new requested time."
  },
  {
    keywords: ['lip', 'lips', 'filler'],
    response: "Our lip filler treatments enhance volume and shape using premium hyaluronic acid fillers. Results are visible immediately and typically last 6-12 months. Would you like more information or to see some before/after photos?"
  },
  {
    keywords: ['botox', 'anti-wrinkle', 'wrinkle'],
    response: "Our Botox treatments reduce the appearance of fine lines and wrinkles by relaxing facial muscles. Results develop over 7-14 days and typically last 3-4 months. Is this something you're interested in?"
  },
  {
    keywords: ['dermal', 'filler', 'face', 'volume'],
    response: "Dermal fillers add volume and definition to various facial areas, including cheeks, jawline, and nasolabial folds. We use premium hyaluronic acid products for natural-looking results that last 9-18 months."
  },
  {
    keywords: ['jawline', 'jaw', 'contour'],
    response: "Jawline contouring using dermal fillers creates a more defined profile and balanced facial proportions. This popular treatment enhances facial structure for both men and women with minimal downtime."
  },
  {
    keywords: ['aftercare', 'after', 'care', 'post-treatment', 'recovery'],
    response: "For optimal results and recovery, avoid touching the treated area for 6 hours, skip makeup for 24 hours, avoid strenuous exercise for 48 hours, and stay hydrated. Specific aftercare instructions will be provided for your particular treatment."
  },
  {
    keywords: ['location', 'address', 'where', 'find you'],
    response: "We're located at 123 Beauty Avenue, Suite 200, in the heart of downtown. Free parking is available behind our building, and we're also accessible by public transit."
  },
  {
    keywords: ['hours', 'open', 'time', 'when'],
    response: "Our operating hours are: Monday-Friday 9am-7pm, Saturday 10am-5pm, and Sunday 11am-4pm. We offer extended hours by appointment on Thursdays until 9pm."
  },
  {
    keywords: ['experience', 'qualified', 'certified', 'training'],
    response: "All our practitioners are certified medical professionals with specialized training in aesthetic procedures. Our lead practitioner has over 15 years of experience in the field and regularly trains other professionals."
  },
  {
    keywords: ['pain', 'hurt', 'comfortable', 'discomfort'],
    response: "We prioritize your comfort during all treatments. Most clients report minimal discomfort as we use fine needles, topical numbing creams, and gentle techniques. Many of our fillers also contain lidocaine to further reduce sensation."
  },
  {
    keywords: ['thank', 'thanks'],
    response: "You're very welcome! Is there anything else I can help you with today?"
  }
];

// Function to find the best match based on user input
export const findBestResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // Check each response for keyword matches
  const matches = chatbotResponses.map(item => {
    const matchCount = item.keywords.filter(keyword => input.includes(keyword.toLowerCase())).length;
    return { response: item.response, matchCount };
  });
  
  // Sort by number of matches
  const sortedMatches = matches.sort((a, b) => b.matchCount - a.matchCount);
  
  // If we have matches, return the best one
  if (sortedMatches[0].matchCount > 0) {
    return sortedMatches[0].response;
  }
  
  // Default response if no matches
  return "I'm not sure I understand. Could you rephrase that, or ask about our services, pricing, booking, or aftercare?";
};
