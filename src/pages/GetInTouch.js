import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./../styles/GetInTouch.css";

const GetInTouch = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [popupMessage, setPopupMessage] = useState(""); // ✅ Now handles both success & error messages
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Secure credentials using environment variables
  const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

console.log("Service ID:", process.env.REACT_APP_EMAILJS_SERVICE_ID);
console.log("Template ID:", process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
console.log("Public Key:", process.env.REACT_APP_EMAILJS_PUBLIC_KEY);


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate email format
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Added simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      setPopupMessage("⚠️ Please fill out all fields.");
      setShowPopup(true);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setPopupMessage("⚠️ Please enter a valid email address.");
      setShowPopup(true);
      return;
    }

    // Send email using EmailJS
    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          setPopupMessage("✅ Your message has been sent successfully!");
          setShowPopup(true);
          setFormData({ name: "", email: "", message: "" }); // ✅ Clears the form after submission
        },
        (error) => {
          console.error("Error sending email:", error.text);
          setPopupMessage("❌ Failed to send message. Please try again later.");
          setShowPopup(true);
        }
      );
  };

  return (
    <section id="contact" className="get-in-touch-section">
      <h2 className="get-in-touch-title">Get in Touch</h2>
      <form className="get-in-touch-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="send-message-button">
          Send Message
        </button>
      </form>

      {/* ✅ Improved Popup for both success & error messages */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button className="close-popup-button" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GetInTouch;
