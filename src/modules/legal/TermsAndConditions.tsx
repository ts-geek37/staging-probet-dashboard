import React from "react";

import LegalLayout from "./LegalLayout";

const TermsAndConditions: React.FC = () => {
  return (
    <LegalLayout title="Terms & Conditions">
      <div>
        <p>
          Welcome to{" "}
          <span className="text-primary-green">ProBetPredictions</span>. These
          Terms and Conditions outline the general guidelines for using our
          platform. By accessing or using{" "}
          <span className="text-primary-green">ProBetPredictions</span>, you
          acknowledge and agree to these terms.
        </p>
        <p className="mt-4">
          Our goal is to keep everything clear, transparent, and easy to
          understand.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          1. About ProBetPredictions
        </h2>
        <p>
          <span className="text-primary-green">ProBetPredictions</span> is a
          football analytics and insights platform. We provide live scores,
          league standings, match insights, football news, and informational
          predictions.
        </p>
        <ul className="list-disc pl-6 mt-4">
          <li>
            <span>We do not operate as a betting platform.</span>
          </li>
          <li>
            <span>We do not offer gambling services.</span>
          </li>
          <li>
            <span>We do not process bets or provide betting odds.</span>
          </li>
          <li>
            All predictions and insights are shared for{" "}
            <span className="text-primary-green">
              informational purposes only.
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          2. Using the Platform
        </h2>
        <p>
          You may use the platform for{" "}
          <span className="text-primary-green">
            personal, non commercial purposes
          </span>
          .
        </p>
        <p className="mt-4">
          If you create an account, you agree to provide accurate information
          and keep your account details secure. You are responsible for activity
          associated with your account.
        </p>
        <p className="mt-4">
          We reserve the right to restrict access in cases of misuse or
          violation of these Terms.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          3. VIP Membership
        </h2>
        <p>
          <span className="text-primary-green">ProBetPredictions</span> offers
          optional VIP subscriptions that provide extended access to prediction
          insights and premium content.
        </p>
        <p className="mt-4">By subscribing, you agree to:</p>
        <ul className="list-disc pl-6 mt-4">
          <li>Pay the applicable subscription fee</li>
          <li>Understand that payment is made in advance</li>
          <li>
            Accept that access is provided for the selected subscription period
          </li>
        </ul>
        <p className="mt-4">
          Payments are securely processed by our{" "}
          <span className="text-primary-green">
            third party payment provider
          </span>
          .
        </p>
        <p className="">
          Subscription plans, pricing, or features may be updated from time to
          time.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          4. Predictions and Content
        </h2>
        <p>
          Predictions, probability indicators, and performance insights are
          based on available data and analytical evaluation.
        </p>
        <p>
          They are{" "}
          <span className="text-primary-green">
            not guarantees of match outcomes
          </span>{" "}
          and should not be considered financial, professional, or betting
          advice.
        </p>
        <p>
          Football outcomes remain unpredictable, and all insights should be
          viewed as <span className="text-primary-green">informational</span>.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          5. Intellectual Property
        </h2>
        <p>
          All platform content, including design, structure, branding, and
          written material, belongs to or is licensed by{" "}
          <span className="text-primary-green">ProBet Analytics Ltd.</span>
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          6. Platform Availability
        </h2>
        <p>
          We aim to keep the platform accessible and up to date. Occasionally,
          features may be updated, improved, or temporarily unavailable due to
          maintenance.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          7. Limitation of Liability
        </h2>
        <p>
          While we strive to provide accurate and reliable information, we
          cannot guarantee completeness or uninterrupted availability.
        </p>
        <p>
          Use of the platform is at your own discretion, and we are{" "}
          <span className="text-primary-green">
            not responsible for losses resulting from reliance on platform
            content
          </span>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          8. Third Party Links
        </h2>
        <p>
          The platform may include links to external websites or third party
          content. We are not responsible for the content or privacy practices
          of those websites.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          9. Changes to These Terms
        </h2>
        <p>
          We may revise these Terms periodically to reflect updates to the
          platform. Updated versions will be published on this page.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">10. Contact</h2>
        <p>
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

export default TermsAndConditions;
