import { useRef, useEffect, useState } from 'react'
import mapboxgl, {Map} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import './App.css'
import ZoneDetailCard from './components/ZoneDetailCard'

interface ZoneProperties {
  Id: number
  gridcode: number
  trange: string
  zone: string
  zonetitle: string
}

function App() {
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  // `useRef` is used to reference a value that is not need for rendering
  const mapRef = useRef<Map|null>(null)
  const mapContainerRef = useRef<HTMLDivElement|null>(null) // [ -> 1 ]

  const [ currentZone, setCurrentZone ] = useState<ZoneProperties | null>(null)


  useEffect(() => {
    /*
    NOTE: this check is in place to ensure that there is a div container in
    the DOM for the Map to be placed. Effect fires once the component mounts.
    This variable is initally null defined
    at [ -> 1 ] and then assigned as a DOM element by the div tag at [ -> 2 ] in
    the TSX below in the return statement.
    */
    if (!mapContainerRef.current){
      return
    }

    mapboxgl.accessToken = mapboxToken

    // CREATE MAPBOX INSTANCE
    mapRef.current = new mapboxgl.Map({
      /*
      NOTE: this (1) creates a new Map instance (2) renders the map inside the
      specified container (3) loads styling (4) connects to mapboxAPI and renders
      tiles.
      INTERESTING: this adds a class 'mapbox-gl' to the container div
      */
      container: mapContainerRef.current,
      style: 'mapbox://styles/slyskillet/cm9u8bl2w00f801qt590lgu1y',
      center: [-98.774795, 42.096718],
      zoom: 3.5,
      projection: 'albers',
    });


    // Wait for map to load --> add layer
    mapRef.current.on('load', () => {
      // add source (vector tileset)
      if (!mapRef.current?.getSource('tileset')) {
        mapRef.current?.addSource('tileset', {
          type: 'vector',
          url: 'mapbox://slyskillet.1p8ny161'
        })
      }

      // ADD LAYER
      if (!mapRef.current?.getLayer('zones-layer')) {
        mapRef.current?.addLayer({
          id: 'zones-layer',
          type: 'fill',
          source: 'tileset',
          'source-layer': 'phzm_us_zones_shp_2023_1-4y0acx',  // name of tileset in studio
          paint: {
            'fill-color': [
              'match',
              ['get', 'Id'],
              1, '#30123b',
              2, '#3e3994',
              3, '#455ed3',
              4, '#4681f7',
              5, '#3aa3fc',
              6, '#23c4e3',
              7, '#18dec0',
              8, '#2df09d',
              9, '#5cfc70',
              10, '#90ff48',
              11, '#b6f735',
              12, '#d7e535',
              13, '#f0cc3a',
              14, '#fdae35',
              15, '#fc8825',
              16, '#f26014',
              17, '#e04008',
              18, '#c52603',
              19, '#a21201',
              '#cccccc'
            ],
            'fill-opacity': 0.6
          }
        })
      }
      // add highlight layer
      if (!mapRef.current?.getLayer('zones-layer-highlight')) {
        mapRef.current?.addLayer({
          id: 'zones-layer-highlight',
          type: 'fill',
          source: 'tileset',
          'source-layer': 'phzm_us_zones_shp_2023_1-4y0acx',
          paint: {
            'fill-color': '#ffff00',
            'fill-opacity': 0.8,
          },
          filter: ['==', 'Id', -1]
        })
      }
    })

    mapRef.current.on('click', 'zones-layer', (e) => {
      if (!e.features?.[0]) return
      const clickedZoneId = e.features![0].properties?.Id
      console.log(e.features[0].properties)
      mapRef.current?.setFilter('zones-layer-highlight', ['==', 'Id', clickedZoneId])
      setCurrentZone(e.features[0].properties as ZoneProperties)
    })


    /*
    CLEANUP: this function runs when unmounting to free up memory and ensure
    multiple instances of the map aren't kicking around.
    */
    return () => {
      /* NOTE: '?' is used to ensure that mapRef.current exists before removing
      it. Without this check in place, it would throw an error. This called
      OPTIONAL CHAINING*/
      mapRef.current?.remove()
    }
  }, [mapboxToken]) // runs effect when mapbox token changes



  return (
    <>
      <div className="h-screen flex flex-col">
        <ZoneDetailCard zone={currentZone} />
        {/* [ -> 2 ] */}
        <div id="map-container" className="flex-1 bg-gray-200" ref={mapContainerRef}></div>
      </div>
    </>
  )
}

export default App
