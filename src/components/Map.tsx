"use client";

import {  useCallback } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useTranslations } from "next-intl";

interface MapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  marker?: [number, number];
  onLocationSelect?: (lat: number, lng: number) => void;
  interactive?: boolean;
}

export default function Map({ 
  center, 
  zoom, 
  className, 
  marker, 
  onLocationSelect,
  interactive = false 
}: MapProps) {
  const t = useTranslations("map");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (interactive && onLocationSelect && e.latLng) {
      onLocationSelect(e.latLng.lat(), e.latLng.lng());
    }
  }, [interactive, onLocationSelect]);

  if (loadError) {
    return <div>{t("errors.loading")}</div>;
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
        zoomControl: interactive,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        draggable: interactive,
        scrollwheel: interactive,
      }}
      onClick={handleMapClick}
    >
      {marker && (
        <MarkerF
          position={{ lat: marker[0], lng: marker[1] }}
          animation={google.maps.Animation.DROP}
          draggable={interactive}
          onDragEnd={(e) => {
            if (interactive && onLocationSelect && e.latLng) {
              onLocationSelect(e.latLng.lat(), e.latLng.lng());
            }
          }}
        />
      )}
    </GoogleMap>
  );
} 