interface ZoneProperties {
    Id: number
    gridcode: number
    trange: string
    zone: string
    zonetitle: string
  }

  interface ZoneDetailCardProps {
    zone: ZoneProperties | null
  }
const ZoneDetailCard: React.FC<ZoneDetailCardProps> = ({zone}) => {
    return (
        <div className="h-16 flex items-center justify-center bg-stone-800 text-stone-100">
           { zone ? (<div className=" ">{zone.zonetitle}</div>) : (<div>click the map</div>)}
        </div>
    )
}

export default ZoneDetailCard
