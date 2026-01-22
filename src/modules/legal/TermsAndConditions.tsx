import React from "react";

import LegalLayout from "./LegalLayout";

const TermsAndConditions: React.FC = () => {
  return (
    <LegalLayout title="Terms & Conditions">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          1. Introduction
        </h2>
        <p>
          Welcome to{" "}
          <span className="text-primary-green">ProBetPredictions</span>. By
          accessing or using our website and services, you{" "}
          <span className="text-primary-green">
            agree to comply with and be bound by these Terms & Conditions
          </span>
          . If you do not agree, please do not use our platform.
        </p>
        <p className="mt-4">
          <span className="text-primary-green">ProBetPredictions</span> is an
          informational football analytics platform providing live scores,
          statistics, insights, and predictions strictly for{" "}
          <span className="text-primary-green">
            educational and analytical purposes
          </span>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          2. No Betting or Gambling Promotion
        </h2>
        <p>
          <span className="text-primary-green">ProBetPredictions</span>{" "}
          <span className="text-primary-green">
            does not promote, facilitate, or encourage betting or gambling in
            any form
          </span>
          . All predictions, statistics, and insights are provided for
          informational and analytical purposes only.
        </p>
        <p className="mt-4">
          Users are{" "}
          <span className="text-primary-green">solely responsible</span> for how
          they interpret or use the information displayed on the platform.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          3. Use of Content
        </h2>
        <p>
          All content on{" "}
          <span className="text-primary-green">ProBetPredictions</span>,
          including data, text, graphics, and predictions:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Is provided for personal, non-commercial use</li>
          <li>
            <span className="text-primary-green">
              May not be copied, redistributed, or resold without permission
            </span>
          </li>
          <li>Should not be used as guaranteed or professional advice</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          4. Accuracy of Information
        </h2>
        <p>
          We strive to provide accurate and up-to-date football data. However,{" "}
          <span className="text-primary-green">ProBetPredictions</span>{" "}
          <span className="text-primary-green">
            does not guarantee the completeness, accuracy, or timeliness
          </span>{" "}
          of any information displayed.
        </p>
        <p className="mt-4">
          We are not responsible for errors, delays, or missing data caused by
          third-party data providers.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          5. User Accounts
        </h2>
        <p>
          Users are responsible for maintaining the confidentiality of their
          account credentials.{" "}
          <span className="text-primary-green">ProBetPredictions</span> is not
          liable for unauthorized account usage.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          6. Limitation of Liability
        </h2>
        <p>
          <span className="text-primary-green">ProBetPredictions</span>{" "}
          <span className="text-primary-green">
            shall not be held liable for any losses, damages, or decisions made
          </span>{" "}
          based on the information provided on the platform.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          7. Modifications
        </h2>
        <p>
          We reserve the right to update or modify these Terms & Conditions at
          any time. <span className="text-primary-green">Continued use</span> of
          the platform indicates acceptance of the updated terms.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">8. Contact</h2>
        <p>
          For questions regarding these terms, contact us at:
          <br />
          📧{" "}
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
    </LegalLayout>
  );
};

export default TermsAndConditions;
