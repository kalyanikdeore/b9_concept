import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Aboutus from "./Aboutus";

const OurLocations = () => {
  return (
    <div className="z-0  w-full py-18">
      <h1 className="text-3xl sm:text-4xl font-extrabold  text-[#205781] py-9 text-center">
        Our Locations
      </h1>
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={13}
        style={{ height: "350px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[19.076, 72.8777]}>
          <Popup>Ion Exchange, Mumbai</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OurLocations;
