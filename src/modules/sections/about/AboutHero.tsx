import Banner from "@/components/Banner";

const AboutBanner: React.FC = () => {
  return (
    <Banner
      title={
        <>
          About <span className="text-primary-green">PROBETTIPS</span>
        </>
      }
      description="Modern football insights and analytics platform built for fans who love data, statistics, and informed match analysis."
      accentColor="green"
      className="max-sm:min-h-100 sm:py-12"
    />
  );
};

export default AboutBanner;
