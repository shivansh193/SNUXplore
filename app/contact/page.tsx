// components/ContactPage.tsx
"use client";

import React, { useState } from "react";

// --- SOLUTION: Moved component definitions outside ---
// By defining these here, they are created only once and not on every re-render,
// which solves the input focus issue.

const ThemedInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    {...props}
    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
  />
);

const ThemedTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => (
  <textarea
    {...props}
    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
  />
);

// --- Main Page Component ---
export default function ContactPage() {
  // Replace with your email address if needed
  const RECIPIENT_EMAIL = "sk262@snu.edu.in";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMailtoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Contact Form: ${formData.firstName} ${formData.lastName}`
    );

    const body = encodeURIComponent(
      `You have a new message from the SNUxplore contact form:

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Their Email: ${formData.email}
----------------------------------

Message:
${formData.message}
`
    );

    const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-[#1C1C1C] min-h-screen text-white pt-16 pb-24 font-sans">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold">
          <span className="text-yellow-400">Get in </span>
          <span className="text-orange-500">Touch</span>
        </h1>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto px-4">
          Have a question, suggestion, or feedback? We'd love to hear from you.
          Fill out the form below to reach our team.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <form
          onSubmit={handleMailtoSubmit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                First Name
              </label>
              <ThemedInput
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Last Name
              </label>
              <ThemedInput
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Your Email Address
            </label>
            <ThemedInput
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Message
            </label>
            <ThemedTextarea
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message here..."
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-lg mt-2 hover:opacity-90 transition-opacity"
            >
              Open in Email & Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}