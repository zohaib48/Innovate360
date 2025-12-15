import React from 'react';
import NavbarComponent from '../components/NavbarComponent/NavbarComponent';
import FooterSection from '../components/FooterSection/FooterSection';
import ConnectSection from '../components/ConnectSection/ConnectSection';
import CalWidget from '../components/CalWidget/CalWidget';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <NavbarComponent />

      <div className="contact-content">
        <ConnectSection />
        {/* <CalWidget /> */}
      </div>

      <FooterSection />
    </div>
  );
}

export default Contact;
