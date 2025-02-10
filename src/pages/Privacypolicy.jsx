import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
      <p className="text-center text-gray-600 mb-8">
        Last Updated: February 2025
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to Amebo. Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your information
          when you use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-6">
          <li>Personal information (name, email, phone number, etc.).</li>
          <li>Account details (username, password, etc.).</li>
          <li>Usage data (pages visited, time spent, preferences, etc.).</li>
          <li>Cookies and tracking technologies.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6">
          <li>Provide and improve our services.</li>
          <li>Send updates, security alerts, and promotional materials.</li>
          <li>Analyze user behavior to enhance user experience.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Data Protection & Security</h2>
        <p>
          We implement appropriate security measures to protect your data
          against unauthorized access, alteration, or destruction. However, no
          online platform is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Sharing Your Information</h2>
        <p>We do not sell or rent your personal data. However, we may share it with:</p>
        <ul className="list-disc pl-6">
          <li>Trusted third-party services (e.g., payment processors).</li>
          <li>Law enforcement when required by law.</li>
          <li>Business partners for service improvements.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Your Rights & Choices</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6">
          <li>Access, update, or delete your data.</li>
          <li>Opt-out of marketing communications.</li>
          <li>Disable cookies in your browser settings.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage
          users to check this page regularly for any updates.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us at <a href="mailto:adebisitimileyin23@gmail.com" className="text-blue-600 underline">support@amebo.com</a>.
        </p>
      </section>

      <footer className="text-center mt-8 text-sm text-gray-500">
        &copy; 2025 Amebo. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
