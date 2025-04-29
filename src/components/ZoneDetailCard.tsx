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
    <div className=" overflow-auto w-96 flex flex-col min-h-full bg-stone-800 text-stone-100 p-3">
      <h1 className="font-bold text-3xl">USDA Hardiness Zones</h1>
      {zone ? (
        <div className="border-1 border-gray-200 rounded-sm my-4">
          <div className="border-b-1 p-2">
            <h2 className="font-bold text-2xl">Zone {zone.zone}</h2>
            <h5 className="font-bold">Average Anual Extreme Temperature:</h5>
            <p>{zone?.trange} &deg;F</p>
          </div>
          <div className="text-left text-sm p-2 bg-stone-700">
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
      <div className="mt-auto text-left text-sm">
        <h5 className="font-semibold">Notes</h5>
        <p className="mx-1">
          [1] USDA Hardiness Zones are based only on average annual minimum
          winter temperatures, so they don’t account for summer heat, rainfall,
          humidity, or local microclimates. The zones ignore factors like soil,
          wind, and the duration of cold spells, and may not reflect recent
          climate changes. As a result, two areas with the same zone can have
          very different growing conditions, and the map is only a starting
          point for plant selection-local knowledge and site-specific factors
          are also essential.
        </p>
        <p className="mx-1">
          [2] Shapefile source:{" "}
          <a
            href="https://prism.oregonstate.edu/projects/plant_hardiness_zones.php"
            target="_blank"
            rel="noopener"
            className="text-blue-400 underline"
          >
            Oregon State University - USDA Plant Hardiness Zone GIS Datasets
          </a>
        </p>
        <p className="mx-1">
          [3] Hardiness zone descriptions:{" "}
          <a
            href="https://cropcareequipment.com/blog/best-crops-for-hardiness-zones/"
            target="_blank"
            rel="noopener"
            className="text-blue-400 underline"
          >
            Crop Career Equipment Blog
          </a>
        </p>
      </div>
    </div>
  );
};

export default ZoneDetailCard;
