import Image from "next/image";

interface Props {
  banner: "champions" | "betting";
}
const LeagueBanner: React.FC<Props> = ({ banner }) => {
  const src =
    banner === "champions" ? "/footballBanner2.png" : "/footballBanner.png";
  return (
    <Image
      src={src}
      alt="Leagues Banner"
      height={100}
      width={1000}
      className="w-full h-40 sm:h-80 object-cover"
    />
  );
};
export default LeagueBanner;
