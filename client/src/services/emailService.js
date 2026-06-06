import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_WELCOME = import.meta.env.VITE_EMAILJS_TEMPLATE_WELCOME;
const TEMPLATE_COURSE_ENROLLED = import.meta.env.VITE_EMAILJS_TEMPLATE_COURSE_ENROLLED;
const TEMPLATE_REFERRAL = import.meta.env.VITE_EMAILJS_TEMPLATE_REFERRAL;

// Send welcome email
export const sendWelcomeEmail = async (email, username) => {
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_WELCOME, {
      to_email: email,
      user_name: username,
      reply_to: 'support@skilwhop.com.ng',
    });
    return { success: true, messageId: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send course enrollment confirmation
export const sendCourseEnrollmentEmail = async (email, username, courseName) => {
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_COURSE_ENROLLED, {
      to_email: email,
      user_name: username,
      course_name: courseName,
      reply_to: 'support@skilwhop.com.ng',
    });
    return { success: true, messageId: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send referral bonus email
export const sendReferralBonusEmail = async (email, username, referredUserName) => {
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_REFERRAL, {
      to_email: email,
      user_name: username,
      referred_user: referredUserName,
      commission_amount: '₦5,000',
      reply_to: 'support@skilwhop.com.ng',
    });
    return { success: true, messageId: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  try {
    const response = await emailjs.send(SERVICE_ID, 'contact_form', {
      from_email: contactData.email,
      from_name: contactData.name,
      message: contactData.message,
      reply_to: contactData.email,
    });
    return { success: true, messageId: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
