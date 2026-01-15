import React from "react";

import LegalLayout from "./LegalLayout";

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          1. Information We Collect
        </h2>
        <p>We may collect:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Basic account information (name, email)</li>
          <li>Usage data (pages visited, interactions)</li>
          <li>Device and browser information</li>
        </ul>
        <p className="mt-4">
          We <span className="text-primary-green">do not collect</span>{" "}
          sensitive personal or financial data directly.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          2. How We Use Your Data
        </h2>
        <p>Your data is used to:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Improve platform performance</li>
          <li>Enhance user experience</li>
          <li>Provide account-related services</li>
          <li>Communicate important updates</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          3. Data Sharing
        </h2>
        <p>
          We <span className="text-primary-green">do not sell or rent</span>{" "}
          your personal data.
        </p>
        <p className="mt-4">
          We may share limited data with trusted third-party services only for:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Authentication</li>
          <li>Payment processing</li>
          <li>Analytics</li>
        </ul>
        <p className="mt-4">
          All partners{" "}
          <span className="text-primary-green">
            comply with data protection standards
          </span>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">4. Cookies</h2>
        <p>
          We use cookies to improve site functionality and performance. You may{" "}
          <span className="text-primary-green">disable cookies</span> in your
          browser settings if you prefer.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          5. Data Security
        </h2>
        <p>
          We implement{" "}
          <span className="text-primary-green">
            industry-standard security practices
          </span>{" "}
          to protect user data. However, no system is 100% secure.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          6. User Rights
        </h2>
        <p>You may request:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Access to your data</li>
          <li>Data correction</li>
          <li>Data deletion</li>
        </ul>
        <p className="mt-4">
          by contacting{" "}
          <a
            href="mailto:support@probet.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-green hover:underline"
          >
            support@probet.com
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">7. Updates</h2>
        <p>
          This policy may be updated periodically.{" "}
          <span className="text-primary-green">Continued use</span> indicates
          acceptance of changes.
        </p>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
