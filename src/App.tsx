// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useRef, useEffect } from 'react'
import mapboxgl, {Map} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import './App.css'

function App() {
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
  const mapRef = useRef<Map|null>(null)
  const mapContainerRef = useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    if (!mapContainerRef.current){
      return
    }
    mapboxgl.accessToken = mapboxToken
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    });

    return () => {
      mapRef.current?.remove()
    }
  }, [mapboxToken])

  return (
    <>
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  )
}

export default App
