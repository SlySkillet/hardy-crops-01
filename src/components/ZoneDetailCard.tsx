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

const ZoneDetailCard: React.FC<ZoneDetailCardProps> = ({ zone }) => {
  // zone title is more specific in attribute table than current descriptions require. Stripping zone title to more general number eg. '6' instead of '6a'
  const zoneStripped =
    (zone?.zone ?? "").length < 3
      ? zone?.zone.slice(0, 1)
      : zone?.zone.slice(0, 2);

  // Helper function to truncate CropData by selected zone
  const renderZoneDescription = (zoneString: keyof typeof CropData) => {
    if (CropData) {
      return CropData[zoneString];
    }
  };

  const data = renderZoneDescription(zoneStripped as keyof typeof CropData);

  return (
    <div className=" overflow-auto w-96 flex flex-col bg-stone-800 text-stone-100 p-3">
      <h1 className="font-bold text-3xl">USDA Hardiness Zones</h1>
      {zone ? (
        <div>
          <h2 className="font-bold text-2xl">Zone {zone.zone}</h2>
          <h5 className="font-bold">Average Anual Extreme Temperature:</h5>
          <p>{zone?.trange} &deg;F</p>
          <div className="text-left text-sm">
            {data?.map((item: string | Array<string>, idx: number) => {
              return typeof item === "string" ? (
                <p key={idx}>{item}</p>
              ) : (
                <ul className="px-4 py-2 list-disc list-inside" key={idx}>
                  {item.map((li: string, idx: number) => {
                    return <li key={idx}>{li}</li>;
                  })}
                </ul>
              );
            })}
            {/* add data source here */}
          </div>
        </div>
      ) : (
        <div className="text-left text-sm">
          This is a web map depicting the USDA Hardiness zones for the lower 48.
          Click on the map to see a detailed description of a zone.
        </div>
      )}
    </div>
  );
};

export default ZoneDetailCard;
