import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SimpleMarketProps {
  type: string;
  data: Record<string, number>;
}

const OtherMarketCard: React.FC<SimpleMarketProps> = ({ type, data }) => {
  return (
    <Card className="h-full  bg-gray-950/50  overflow-hidden">
      <CardHeader className="bg-gray-900/20">
        <CardTitle className="text-white text-lg flex items-center gap-2  border-l-2 border-primary-green pl-2">
          {type}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.entries(data).map(([label, value], idx) => {
            return (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-between p-3 rounded-xl border  border-primary-gray/20 bg-primary-green/5"
              >
                <div className="flex flex-col items-center w-full z-10 space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-center text-primary-green">
                    {label}
                  </span>

                  <span className="text-base sm:text-2xl font-black tracking-tight text-white">
                    {value.toFixed(1)}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-gray-800 rounded-full mt-4 overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out bg-primary-green"
                    style={{ width: `${Math.min(value, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherMarketCard;
