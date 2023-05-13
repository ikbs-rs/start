import React from 'react';
import './tc.css';

const NewsletterSection = () => {
  return (
    <section id="newsletter">
      <div className="tc-container">
        <div className="title">
          <h2>Newsletter</h2>
        </div>
        <div className="content">
          <p>Budite uvek u toku sa našim vestima i novostima. Ostavite vašu email adresu i prijavite se za naš newsletter.</p>
        </div>
        <form id="newsletterForm">
          <div className="form-input">
            <input type="email" name="newsletter_email" id="newsletter_email" className="reset_email" placeholder="Vaš e-mail" />
          </div>
          <div className="form-submit">
            <button type="submit" className="tc-btn dark" id="newsletter_button">Prijavi se</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
