import CropData from "../assets/crops/cropcare-blog.json";

interface ZoneProperties {
  Id: number;
  gridcode: number;
  trange: string;
  zone: string;
  zonetitle: string;
}

interface ZoneDetailCardProps {
  zone: ZoneProperties | null;
}

const ZoneDetailCard2: React.FC<ZoneDetailCardProps> = ({ zone }) => {
  return (
    <div className=" overflow-auto w-96 flex flex-col bg-stone-800 text-stone-100 p-3">
      <h1 className="font-bold text-2xl">USDA Hardiness Zones</h1>
      {zone ? (
        <div>{zone.zone}</div>
      ) : (
        <div className="text-left text-sm">
          This is a web map depicting the USDA Hardiness zones for the lower 48.
          Click on the map to see a detailed description of a zone.
        </div>
      )}
    </div>
  );
};

export default ZoneDetailCard2;
