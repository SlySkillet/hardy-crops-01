import { useRef, useEffect } from 'react'
import mapboxgl, {Map} from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import './App.css'

function App() {
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  // `useRef` is used to reference a value that is not need for rendering
  const mapRef = useRef<Map|null>(null)
  const mapContainerRef = useRef<HTMLDivElement|null>(null) // [ -> 1 ]

  useEffect(() => {
    /*
    NOTE: this check is in place to ensure that there is a div container in
    the DOM for the Map to be placed. Effect fires once the component mounts.
    This variable is initally null defined
    at [ -> 1 ] and then assigned as a DOM element by the div tag at [ -> 2 ] in
    the TSX below in the return statement.
    */
    if (!mapContainerRef.current){
      console.log('catch catching')
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
    });

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
      {/* [ -> 2 ] */}
      <div id="map-container" ref={mapContainerRef}></div>
    </>
  )
}

export default App
