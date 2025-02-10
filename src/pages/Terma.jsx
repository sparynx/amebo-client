import React from 'react'

const Terma = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="space-y-6 text-sm text-gray-600">
        {/* Preamble */}
        <section>
          <p className="mb-4">
            These Terms and Conditions ("Terms", "Agreement") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you", "your", "user") and [Company Name] ("we", "us", "our", "Company"), concerning your access to and use of our website, mobile applications, and any other related services (collectively, the "Platform").
          </p>
          <p>
            You agree that by accessing the Platform, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, you are expressly prohibited from using the Platform and must discontinue use immediately.
          </p>
        </section>

        {/* 1. Definitions */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">1. Definitions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>"Content" refers to any text, graphics, images, music, software, audio, video, information, or other materials appearing on the Platform</li>
            <li>"User Content" means any content submitted, posted, or transmitted by users through the Platform</li>
            <li>"Intellectual Property Rights" means all patent rights, copyright rights, moral rights, rights of publicity, trademark, trade dress and service mark rights, goodwill, trade secret rights, and other intellectual property rights</li>
            <li>"Services" encompasses all applications, software, products, and services offered by [Company Name]</li>
            <li>"Third Party Services" means services or content provided by third parties that may be displayed, included, or made available by the Platform</li>
          </ul>
        </section>

        {/* 2. User Rights and Responsibilities */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">2. User Rights and Responsibilities</h2>
          <p className="mb-4">
            2.1. By using our Platform, you represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>You are at least 18 years of age</li>
            <li>You have the legal capacity to enter into binding contracts</li>
            <li>You will use the Platform in accordance with these Terms</li>
            <li>All information you provide is accurate and truthful</li>
            <li>You will maintain the security of your account</li>
          </ul>

          <p className="mb-4">
            2.2. You are prohibited from:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Using the Platform for any illegal purposes</li>
            <li>Violating any applicable laws or regulations</li>
            <li>Infringing on the rights of others</li>
            <li>Interfering with the Platform's operation</li>
            <li>Creating multiple accounts or false identities</li>
            <li>Harassing, threatening, or intimidating others</li>
          </ul>
        </section>

        {/* 3. Privacy and Data Protection */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">3. Privacy and Data Protection</h2>
          <p className="mb-4">
            3.1. Data Collection
          </p>
          <p className="mb-4">
            We collect and process the following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Personal identification information</li>
            <li>Contact information</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
            <li>Location data (if permitted)</li>
          </ul>

          <p className="mb-4">
            3.2. Data Usage
          </p>
          <p className="mb-4">
            Your data may be used for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Providing and maintaining our services</li>
            <li>Improving user experience</li>
            <li>Communicating with you</li>
            <li>Analyzing usage patterns</li>
            <li>Preventing fraud and abuse</li>
          </ul>
        </section>

        {/* 4. Content Guidelines */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">4. Content Guidelines</h2>
          <p className="mb-4">
            4.1. User-Generated Content
          </p>
          <p className="mb-4">
            When posting content, you must ensure it:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Is accurate and not misleading</li>
            <li>Does not violate any laws or regulations</li>
            <li>Does not infringe on others' rights</li>
            <li>Is not harmful, offensive, or inappropriate</li>
            <li>Does not contain malware or viruses</li>
          </ul>

          <p className="mb-4">
            4.2. Content Removal
          </p>
          <p>
            We reserve the right to remove any content that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Violates these Terms</li>
            <li>Is reported by other users</li>
            <li>May cause legal issues</li>
            <li>Is inappropriate or offensive</li>
            <li>Poses security risks</li>
          </ul>
        </section>

        {/* 5. Intellectual Property */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">5. Intellectual Property</h2>
          <p className="mb-4">
            5.1. Our Rights
          </p>
          <p className="mb-4">
            All Platform content and materials are protected by:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Copyright laws</li>
            <li>Trademark rights</li>
            <li>Patent rights</li>
            <li>Trade secrets</li>
            <li>Other proprietary rights</li>
          </ul>

          <p className="mb-4">
            5.2. License to Use
          </p>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access the Platform</li>
            <li>Use provided features</li>
            <li>View content</li>
            <li>Share permitted materials</li>
          </ul>
        </section>

        {/* 6. Termination */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">6. Termination</h2>
          <p className="mb-4">
            6.1. We may terminate or suspend your access immediately if you:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Breach these Terms</li>
            <li>Violate applicable laws</li>
            <li>Engage in fraudulent activity</li>
            <li>Abuse the Platform or other users</li>
          </ul>

          <p className="mb-4">
            6.2. Upon termination:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your access rights cease immediately</li>
            <li>Your account may be deleted</li>
            <li>Your content may be removed</li>
            <li>You must stop using the Platform</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="mt-8 border-t pt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h2>
          <div className="pl-5">
            <p>Amebo</p>
            <p>Lagos Nigeria</p>
            <p>Email: adebisitimileyin23@gmail.com</p>
            <p>Phone: 09059543322</p>
          </div>
        </section>

        {/* Last Updated */}
        <section className="text-gray-500 text-right mt-8 pt-4 border-t">
          <p>Last Updated: February 10, 2025</p>
        </section>
      </div>
    </div>
  );
}

export default Terma;