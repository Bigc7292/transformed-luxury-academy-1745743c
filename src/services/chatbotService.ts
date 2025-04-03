
import { supabase } from "@/integrations/supabase/client";

// Define types for our conversation data
export interface ChatbotResponse {
  keywords: string[];
  response: string;
}

export interface ChatMessage {
  id?: number;
  text: string;
  isBot: boolean;
}

// Create a data structure with predefined responses based on keywords
export const chatbotResponses: ChatbotResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! Welcome to Transformed Academy and Salon. How can I assist you with our beauty and training services today?"
  },
  {
    keywords: ['service', 'treatment', 'offer', 'provide'],
    response: "We offer a wide range of services including: Hair treatments (extensions, coloring, advanced cutting), Aesthetics (dermal fillers, lip fillers, facials), Beauty treatments (lashes, eyebrows, nails), and Non-surgical procedures (facial and body sculpting). Would you like more information about any specific service?"
  },
  {
    keywords: ['price', 'cost', 'fee', 'how much'],
    response: "Our prices vary based on the treatment and amount of product used. Lip fillers start at £350, Botox from £300, dermal fillers from £400, and hair services from £75. Training courses range from £1,200 to £5,000 depending on level. Would you like to book a consultation for a personalized quote?"
  },
  {
    keywords: ['book', 'appointment', 'schedule', 'reservation'],
    response: "I'd be happy to help you book an appointment! You can schedule directly on our website using the 'Book Consultation' button, or I can take your details here and our staff will contact you to confirm."
  },
  {
    keywords: ['cancel', 'reschedule', 'change appointment'],
    response: "To cancel or reschedule an appointment, please contact us at least 24 hours in advance. You can call us or reply to your confirmation email with the new requested time."
  },
  {
    keywords: ['lip', 'lips', 'filler'],
    response: "Our advanced lip filler treatments enhance volume and shape using premium hyaluronic acid fillers. We're known for our signature lips technique that provides natural-looking results with minimal swelling. Results are visible immediately and typically last 6-12 months. Would you like more information or to see some before/after photos?"
  },
  {
    keywords: ['botox', 'anti-wrinkle', 'wrinkle'],
    response: "Our Botox treatments reduce the appearance of fine lines and wrinkles by relaxing facial muscles. We offer both standard and advanced anti-wrinkle treatments, including specialized techniques for crow's feet, forehead lines, and glabella. Results develop over 7-14 days and typically last 3-4 months."
  },
  {
    keywords: ['dermal', 'filler', 'face', 'volume'],
    response: "Our dermal fillers add volume and definition to various facial areas, including cheeks, jawline, and nasolabial folds. We use premium hyaluronic acid products for natural-looking results that last 9-18 months. Our advanced facial profiling service provides comprehensive enhancement tailored to your facial structure."
  },
  {
    keywords: ['jawline', 'jaw', 'contour'],
    response: "Jawline contouring using dermal fillers creates a more defined profile and balanced facial proportions. This popular treatment enhances facial structure for both men and women with minimal downtime. It's often combined with chin augmentation for full lower face enhancement."
  },
  {
    keywords: ['aftercare', 'after', 'care', 'post-treatment', 'recovery'],
    response: "For optimal results and recovery, avoid touching the treated area for 6 hours, skip makeup for 24 hours, avoid strenuous exercise for 48 hours, and stay hydrated. Avoid alcohol and blood-thinning medications for 24 hours before and after treatment. Specific aftercare instructions will be provided for your particular treatment."
  },
  {
    keywords: ['location', 'address', 'where', 'find you'],
    response: "We're located at 38 Widemarsh St, Hereford. Free parking is available nearby, and we're also accessible by public transit. Our salon offers a luxurious environment with private treatment rooms for your comfort."
  },
  {
    keywords: ['hours', 'open', 'time', 'when'],
    response: "Our operating hours are: Monday-Friday 9am-7pm, Saturday 10am-5pm, and Sunday by appointment only. We offer extended hours by appointment on Thursdays until 9pm."
  },
  {
    keywords: ['experience', 'qualified', 'certified', 'training'],
    response: "All our practitioners are certified medical professionals with specialized training in aesthetic procedures. Our lead practitioner has over 10 years of experience and is a fully qualified Level 5 educator who regularly trains other professionals in advanced aesthetic techniques."
  },
  {
    keywords: ['pain', 'hurt', 'comfortable', 'discomfort'],
    response: "We prioritize your comfort during all treatments. Most clients report minimal discomfort as we use fine needles, topical numbing creams, and gentle techniques. Many of our fillers also contain lidocaine to further reduce sensation. We can also provide cooling therapy and distraction techniques if needed."
  },
  {
    keywords: ['hair', 'extensions', 'coloring', 'cutting', 'blow'],
    response: "Our premium hair services include extensions for added length and volume, expert coloring by our mixologists, advanced precision cutting, bouncy and 90s blow outs for that perfect volume, and specialized hair and scalp treatments to rejuvenate your hair. All services are performed by our highly trained stylists."
  },
  {
    keywords: ['skin', 'facial', 'face', 'boosters', 'treatment'],
    response: "Our advanced skin treatments include professional facials, skin boosters for deep hydration, polynucleotides for rejuvenation, and exosome boosters for cutting-edge results. We analyze your skin condition and recommend personalized treatment plans to address specific concerns like aging, acne, or hyperpigmentation."
  },
  {
    keywords: ['body', 'sculpting', 'fat', 'dissolving', 'booty', 'lift'],
    response: "Our non-surgical body treatments include body sculpting to contour problem areas, fat dissolving injections for targeted fat reduction, and our popular XXXL Booty Lifts for non-surgical enhancement of your curves. These treatments require minimal downtime with visible results after a series of sessions."
  },
  {
    keywords: ['beauty', 'lash', 'brow', 'nail', 'wax'],
    response: "Our beauty treatments include lash extensions and lifting, professional waxing services, eyebrow shaping and lamination, luxury manicures, relaxing pedicures, and comprehensive skin treatments for a complete beauty experience. All services are performed by specialized beauty technicians."
  },
  {
    keywords: ['training', 'course', 'learn', 'teach', 'become', 'career'],
    response: "We offer professional training for beauty specialists through our Transformed Academy. Our courses include the comprehensive 'Start from Scratch Aesthetics Course' for beginners, Anatomy and Physiology Level 4, Anti-Wrinkle Training, Dermal Filler Training, Advanced techniques, Canula Training, and specialized Master Classes in techniques like Liquid Rhinoplasty and 11 Point Face Lift."
  },
  {
    keywords: ['master', 'class', 'masterclass', 'advanced training'],
    response: "Our Master Classes include specialized training in Liquid Rhinoplasty with Pixie Lift, Signature Lips technique, Advanced Skin Boosters using Canula, 11 Point Face Lift, and comprehensive Facial Profiling. These classes are designed for practitioners who already have basic qualifications and want to advance their skills."
  },
  {
    keywords: ['aesthetics', 'course', 'starter', 'begin', 'foundation'],
    response: "Our 'Start from Scratch Aesthetics Course' is a complete training program for beginners in aesthetics. It covers anatomy, consultation techniques, product knowledge, hygiene practices, and hands-on training with models. Upon completion, you'll be fully qualified to perform basic aesthetic procedures safely and effectively."
  },
  {
    keywords: ['thank', 'thanks'],
    response: "You're very welcome! Is there anything else I can help you with regarding our salon services or training academy?"
  },
  {
    keywords: ['contact', 'inquiry', 'question', 'form'],
    response: "I'd be happy to help you get in touch with our team. You can use the contact form in this chat to send your inquiry directly, and a team member will get back to you soon. Or if you prefer, you can call us directly about any treatments you're interested in."
  },
  {
    keywords: ['threads', 'thread', 'lifting', 'apotos', 'cog'],
    response: "We offer advanced thread lifting treatments including Pod and Cog Threads and premium APOTOS Threads. These treatments provide a non-surgical face lift effect by placing dissolvable threads under the skin to lift and tighten. Results are immediate with continued improvement over time as collagen production is stimulated."
  },
  {
    keywords: ['vitamin', 'injection', 'boost', 'supplement'],
    response: "Our vitamin injection treatments boost your health and appearance from within. We offer B12 for energy, vitamin C for immunity and skin brightness, and specialized vitamin cocktails for hair, skin, and overall wellness. These quick treatments have minimal discomfort and provide immediate benefits."
  },
  {
    keywords: ['polynucleotides', 'pdrn', 'rejuvenation'],
    response: "Our polynucleotide treatments are advanced skin rejuvenation solutions that repair and regenerate tissues at the cellular level. These treatments improve skin quality, elasticity, and hydration while reducing fine lines and promoting overall skin health. A series of treatments provides cumulative benefits for lasting results."
  }
];

// Function to find the best response based on user input
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
  return "I'm not sure I understand. Could you rephrase that, or ask about our salon services, training academy, pricing, booking, or aftercare? I'm here to help with any questions about our treatments or courses.";
};

// Save chat messages to the database
export const saveChatConversation = async (userMessage: string, botResponse: string, sessionId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("chat_history")
      .insert({
        user_message: userMessage,
        bot_response: botResponse,
        session_id: sessionId
      });
      
    if (error) {
      console.error("Error saving chat conversation:", error);
    }
  } catch (error) {
    console.error("Error in saveChatConversation:", error);
  }
};

// Get chat history by session ID
export const getChatHistory = async (sessionId: string): Promise<{ user_message: string; bot_response: string; created_at: string }[]> => {
  const { data, error } = await supabase
    .from("chat_history")
    .select("user_message, bot_response, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });
    
  if (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
  
  return data || [];
};

// Get all chat sessions for admin view
export const getAllChatSessions = async (): Promise<{ session_id: string; created_at: string }[]> => {
  const { data, error } = await supabase
    .from("chat_history")
    .select("session_id, created_at")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Error fetching chat sessions:", error);
    return [];
  }
  
  // Get unique session IDs
  const uniqueSessions = Array.from(new Set(data.map(item => item.session_id)))
    .map(sessionId => {
      const session = data.find(item => item.session_id === sessionId);
      return {
        session_id: sessionId,
        created_at: session!.created_at
      };
    });
    
  return uniqueSessions;
};
