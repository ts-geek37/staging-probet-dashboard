import React from "react";
import LegalLayout from "./LegalLayout";

const AdvertisingPolicy: React.FC = () => {
  return (
    <LegalLayout title="Advertising Policy">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          1. Advertising Philosophy
        </h2>
        <p>
          <span className="text-primary-green">ProBetTips</span> may display
          advertisements or sponsored content to support platform operations.
          All advertisements are{" "}
          <span className="text-primary-green">
            clearly distinguishable from editorial content
          </span>
          .
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          2. No Betting Advertisements
        </h2>
        <p>
          We{" "}
          <span className="text-primary-green">do not promote or partner</span>{" "}
          with betting or gambling companies for advertising purposes.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          3. Sponsored Content
        </h2>
        <p>
          Sponsored content, if shown, will be{" "}
          <span className="text-primary-green">clearly labeled</span> and will
          not influence platform predictions or analysis.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          4. Third-Party Links
        </h2>
        <p>
          <span className="text-primary-green">ProBetTips</span> may contain
          links to third-party websites. We are{" "}
          <span className="text-primary-green">not responsible</span> for their
          content, policies, or practices.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          5. Ad Relevance
        </h2>
        <p>
          We aim to display{" "}
          <span className="text-primary-green">
            relevant, respectful, and appropriate advertisements
          </span>{" "}
          aligned with sports, technology, and analytics.
        </p>
      </div>
    </LegalLayout>
  );
};

export default AdvertisingPolicy;
