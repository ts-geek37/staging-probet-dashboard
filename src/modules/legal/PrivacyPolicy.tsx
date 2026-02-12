import React from "react";
import LegalLayout from "./LegalLayout";

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Privacy Policy
        </h2>
        <p>
          <span className="text-primary-green">Effective Date :</span> 01 January
          2026
        </p>
        <p>
          <span className="text-primary-green">Last Updated :</span> 01 January
          2026
        </p>
        <p className="mt-4">
          This Privacy Policy explains how{" "}
          <span className="text-primary-green">ProBetPredictions</span>{" "}
          collects, uses, and protects personal information when you use our
          platform.
        </p>
        <p className="mt-4">
          By accessing or using the platform, you agree to this Privacy Policy.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          1. Information We Collect
        </h2>
        <p>
          We collect limited personal information necessary to operate the
          platform and manage user subscriptions.
        </p>
        <p className="mt-4">This may include:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Subscription status</li>
          <li>
            Payment information processed through our{" "}
            <span className="text-primary-green">secure payment provider</span>
          </li>
        </ul>
        <p className="mt-4">
          We{" "}
          <span className="text-primary-green">
            do not store
          </span>{" "}
          full payment card details on our servers.
        </p>
      </div>


      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          2. How We Use Information
        </h2>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Provide and maintain the platform</li>
          <li>Manage accounts and VIP memberships</li>
          <li>Process subscription payments</li>
          <li>Respond to inquiries and support requests</li>
          <li>Improve platform performance and user experience</li>
          <li>Maintain security and prevent misuse</li>
        </ul>
        <p className="mt-4">
          We{" "}
          <span className="text-primary-green">
            do not sell or rent personal data to third parties
          </span>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          3. Payment Processing
        </h2>
        <p>
          VIP subscription payments are processed by secure third-party
          providers.
        </p>
        <p className="mt-4">
          We{" "}
          <span className="text-primary-green">
            do not directly collect or store complete credit or debit card
            information
          </span>
          . Payment processors handle such data in accordance with their own
          privacy and security standards.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          4. Data Sharing
        </h2>
        <p>
          We may share limited information with trusted service providers that
          support platform operations, including payment processors,
          authentication services, and hosting providers.
        </p>
        <p className="mt-4">
          These providers are required to protect personal information and use
          it only for authorized purposes.
        </p>
        <p className="mt-4">
          We{" "}
          <span className="text-primary-green">
            do not share personal data for marketing or advertising purposes
          </span>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          5. Data Retention
        </h2>
        <p>
          Personal information is retained only for as long as necessary to:
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>Maintain active accounts</li>
          <li>Fulfill subscription obligations</li>
          <li>Comply with legal requirements</li>
          <li>Resolve disputes and enforce policies</li>
        </ul>
        <p className="mt-4">
          Users may request account deletion by contacting us.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          6. Data Security
        </h2>
        <p>
          We implement reasonable technical and organizational measures to
          protect personal information from unauthorized access, disclosure, or
          misuse.
        </p>
        <p className="mt-4">
          However, no system can guarantee absolute security.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          7. Third Party Links
        </h2>
        <p>
          The platform may contain links to third-party websites. We are not
          responsible for the privacy practices of those external sites. Users
          should review their privacy policies separately.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. The revised
          version will be posted on this page with the updated effective date.
        </p>
        <p className="mt-4">
          Continued use of the platform indicates acceptance of any changes.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">9. Contact Us</h2>
        <p>For privacy-related inquiries, please contact:</p>
        <p className="mt-4">
          <span className="text-primary-green">ProBet Analytics Ltd</span>
          <br />
          71 Sample Street
          <br />
          London
          <br />
          United Kingdom
        </p>
        <p className="mt-4">
          Email :{" "}
          <a
            href="mailto:support@probet.com"
            className="text-primary-green hover:underline"
          >
            support@probet.com
          </a>
        </p>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
