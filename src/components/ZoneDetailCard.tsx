import CropData from "../assets/crops/crops.json";

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
const ZoneDetailCard: React.FC<ZoneDetailCardProps> = ({ zone }) => {
  const parseZoneString = (s: string) => {
    if (s.length > 2) {
      return s.slice(0, 2);
    } else {
      return s.slice(0, 1);
    }
  };
  const listCrops = (s: string) => {
    const parsedS = parseZoneString(s);
    if (CropData) {
      return CropData[parsedS];
    }
  };
  return (
    <div className=" overflow-auto w-96 flex flex-col bg-stone-800 text-stone-100">
      {zone ? (
        <div>
          <p>Zone: {zone.zone}</p>
          <ul>
            {listCrops(zone.zone).map((lst: string, idx: number) => {
              return <li key={idx}>{lst}</li>;
            })}
          </ul>
        </div>
      ) : (
        <div>click the map</div>
      )}
    </div>
  );
};

export default ZoneDetailCard;
