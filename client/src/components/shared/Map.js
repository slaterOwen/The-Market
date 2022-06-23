import React, { useState } from "react";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import { GiPositionMarker } from "react-icons/gi";

const geolocateControlStyle = {
  right: 10,
  top: 10,
};

export default function App(props) {
  const [viewPort, setViewPort] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 0,
    width: "fit",
    height: "20rem",
  });

  const waypoints = props.markers.map((lngLat, i) => (
    <Marker longitude={lngLat[0]} latitude={lngLat[1]} key={i}>
      <div
        className="marker"
        onClick={() => console.log("Todo: reveal details")}
      >
        <GiPositionMarker />
      </div>
    </Marker>
  ));

  return (
    <ReactMapGL
      {...viewPort}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/dylanmooers/ckndwylla03wp17o2edf4lm7i"
      onViewportChange={(viewport) => setViewPort(viewport)}
      getCursor={(e) => "crosshair"}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
        showAccuracyCircle={false}
      />
      {waypoints}
    </ReactMapGL>
  );
}

export const StaticMap = (props) => {
  const { lngLat } = props;
  console.log(props);
  const [viewPort, setViewPort] = useState({
    latitude: lngLat[1],
    longitude: lngLat[0],
    zoom: 10,
    width: "min(100%, 30rem)",
    height: "20rem",
  });

  return (
    <ReactMapGL
      {...viewPort}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/dylanmooers/ckndwylla03wp17o2edf4lm7i"
      onViewportChange={(viewport) => setViewPort(viewport)}
      getCursor={(e) => "crosshair"}
    >
      <Marker longitude={lngLat[0]} latitude={lngLat[1]}>
        <div
          className="marker"
          onClick={() => console.log("Todo: reveal details")}
        >
          <GiPositionMarker />
        </div>
      </Marker>
    </ReactMapGL>
  );
};
