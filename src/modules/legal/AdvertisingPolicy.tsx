import React from "react";
import LegalLayout from "./LegalLayout";

const AdvertisingPolicy: React.FC = () => {
  return (
    <LegalLayout title="Advertising Policy">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Advertising Policy
        </h2>
        <p>
          <span className="text-primary-green">ProBetPredictions</span> may display advertisements, sponsored materials, or promotional placements
          to support the operation and development of the platform.
        </p>
        <p className="mt-4">
          We are committed to maintaining transparency and ensuring that advertising remains clearly
          distinguishable from editorial content, match analysis, and prediction insights.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Editorial Integrity
        </h2>
        <p>
          Advertising relationships do not influence our analytical models, predictions, rankings, or written
          content. All football insights are developed independently.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Sponsored Content
        </h2>
        <p>
          From time to time, certain content may be produced in collaboration with commercial partners.
          Such content will be appropriately identified where required.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Third Party Advertisers
        </h2>
        <p>
          Advertisements may be delivered by third party partners.{" "}
          <span className="text-primary-green">ProBetPredictions</span> does not control
          and is not responsible for the content, services, or policies of external websites referenced
          through advertisements.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">
          No Endorsement
        </h2>
        <p>
          The inclusion of any advertisement or promotional material does not constitute an endorsement,
          recommendation, or guarantee by{" "}
          <span className="text-primary-green">ProBetPredictions</span>.
        </p>
      </div>

      <div>
        <p className="mt-4">
          This policy may be updated periodically to reflect operational or regulatory development.
        </p>
      </div>
    </LegalLayout>
  );
};

export default AdvertisingPolicy;
