import React from "react";

const HomePricing = () => {
  return (
    <div id="pricing" className="landing-pricing">
      <div className="pricing-topic-shadow">
        <div className="pricing-topic">PRICING</div>
      </div>
      <div className="grid">
        <div className="col-12 lg:col-4">
          <div className="pricing-box">
            <div className="pricing-box-header">
              <h3>Beginner</h3>
              <h2>$5.00</h2>
              <p>per month</p>
            </div>
            <div className="pricing-box-content">
              <ul>
                <li>Responsive</li>
                <li>Push Messages</li>
              </ul>
              <button
                type="button"
                className="p-button p-button-text-only p-widget p-state-default p-corner-all"
              >
                <span className="p-button-text p-c">Buy Now</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="pricing-box">
            <div className="pricing-box-header">
              <h3>Professional</h3>
              <h2>$10.00</h2>
              <p>per month</p>
            </div>
            <div className="pricing-box-content">
              <ul>
                <li>Responsive</li>
                <li>Push Messages</li>
                <li>10 Support Tickets</li>
              </ul>
              <button
                type="button"
                className="p-button p-button-text-only p-widget p-state-default p-corner-all"
              >
                <span className="p-button-text p-c">Buy Now</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 lg:col-4">
          <div className="pricing-box">
            <div className="pricing-box-header">
              <h3>Enterprise</h3>
              <h2>Get a Quote</h2>
              <p>per month</p>
            </div>
            <div className="pricing-box-content">
              <ul>
                <li>Responsive</li>
                <li>Push Messages</li>
                <li>10 Support Tickets</li>
                <li>Free Shipping</li>
              </ul>
              <button
                type="button"
                className="p-button p-button-text-only p-widget p-state-default p-corner-all"
              >
                <span className="p-button-text p-c">Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePricing;
