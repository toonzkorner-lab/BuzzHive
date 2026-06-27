import React from 'react';
import './PageDefaults.css';

const ContactPage = () => {
  return (
    <div className="page-wrapper pt-32">
      <div className="container">
        <h1 className="page-title text-gradient">Visit The Hive</h1>
        
        <div className="contact-grid mt-8">
          <div className="glass content-card animate-fade-up">
            <h2 className="text-xl font-bold mb-4 text-primary">Store Location</h2>
            <p className="mb-2">10718 Perrin Beitel Rd</p>
            <p className="mb-4">San Antonio, TX 78217</p>
            
            <h2 className="text-xl font-bold mb-4 mt-6 text-primary">Contact Us</h2>
            <p className="mb-4">
              Phone: <a href="tel:2102513265" className="text-gradient font-bold hover-underline">(210) 251-3265</a>
            </p>
          </div>

          <div className="glass content-card animate-fade-up delay-1">
            <h2 className="text-xl font-bold mb-4 text-primary">Store Hours</h2>
            <ul className="hours-list">
              <li className="flex justify-between mb-2 border-b pb-2">
                <span>Monday - Thursday:</span> <span>10:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between mb-2 border-b pb-2">
                <span>Friday - Saturday:</span> <span>10:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between mb-2 border-b pb-2">
                <span>Sunday:</span> <span>11:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="map-container mt-12 animate-fade-up delay-2">
          <h2 className="text-xl font-bold mb-4 text-primary">Find Us</h2>
          <div className="glass p-2" style={{borderRadius: '16px', overflow: 'hidden', height: '400px'}}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.046187768407!2d-98.41162442436442!3d29.51520667519391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c8b27f311c633%3A0x67399f127bcfeb!2s10718%20Perrin%20Beitel%20Rd%2C%20San%20Antonio%2C%20TX%2078217!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{border:0, borderRadius: '12px'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
