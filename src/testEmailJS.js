// Simple test script to verify EmailJS connectivity
// Run this script with: node src/testEmailJS.js

const emailjs = require('@emailjs/browser');

// Initialize EmailJS
emailjs.init('V_dZNxnm3V-2NJFLO'); // Your Public Key

// Configuration
const serviceId = 'service_g9mej5n';
const templateId = 'template_dvyqkpc'; // Updated template ID

// Test template parameters
const templateParams = {
  from_name: 'Test User',
  from_email: 'test@example.com',
  subject: 'Test EmailJS Connection',
  message: 'This is a test message to verify EmailJS connectivity.'
};

console.log('Sending test email with EmailJS...');
console.log('Service ID:', serviceId);
console.log('Template ID:', templateId);
console.log('Template Params:', templateParams);

// Note: This will likely fail when run from Node.js - EmailJS browser SDK requires a browser environment
// This is just for documentation purposes 