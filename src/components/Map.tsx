"use client";

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

interface MapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  marker?: [number, number];
}

export default function Map({ center, zoom, className, marker }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="h-[200px] w-full bg-muted animate-pulse rounded-md" />;
  }

  return (
    <GoogleMap
      zoom={zoom}
      center={{ lat: center[0], lng: center[1] }}
      mapContainerClassName={className}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {marker && (
        <MarkerF
          position={{ lat: marker[0], lng: marker[1] }}
          animation={google.maps.Animation.DROP}
        />
      )}
    </GoogleMap>
  );
} 