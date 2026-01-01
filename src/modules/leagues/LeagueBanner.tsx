import Image from "next/image";

interface Props {
  banner: "champions" | "betting";
}
const LeagueBanner: React.FC<Props> = ({ banner }) => {
  const src = banner === "champions" ? "/league/banner.png" : "/sport-betting-banner.png";
  return (
    <Image
      src={src}
      alt="Leagues Banner"
      height={100}
      width={1000}
      className="w-full h-80 object-cover"
    />
  );
};
export default LeagueBanner;
