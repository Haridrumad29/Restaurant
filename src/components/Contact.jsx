import React from 'react';

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact__grid">
          <div className="contact-info">
            <div className="contact-info__icon">📞</div>
            <h3 className="contact-info__title">Phone</h3>
            <p className="contact-info__details">+91 73404 53264</p>
          </div>
          <div className="contact-info">
            <div className="contact-info__icon">📧</div>
            <h3 className="contact-info__title">Email</h3>
            <p className="contact-info__details">Jhalaharidrumad@gmail.com</p>
          </div>
          <div className="contact-info">
            <div className="contact-info__icon">📍</div>
            <h3 className="contact-info__title">Address</h3>
            <p className="contact-info__details">95 Jayshree Nagar,teetardi<br />Udaipur City - 313001</p>
          </div>
          <div className="contact-info">
            <div className="contact-info__icon">⏰</div>
            <h3 className="contact-info__title">Hours</h3>
            <p className="contact-info__details">10:00 AM - 12:00 PM<br />All Days</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
