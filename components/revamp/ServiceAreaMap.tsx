"use client";

import React, { useEffect, useRef, useState } from "react";

declare const google: {
  maps: {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => {
      setCenter(latLng: { lat: number; lng: number }): void;
    };
    Marker: new (opts: Record<string, unknown>) => void;
    Circle: new (opts: Record<string, unknown>) => { bindTo(key: string, obj: Record<string, unknown>, targetKey: string): void };
    SymbolPath: { CIRCLE: number };
  };
};

const MAP_API_KEY = "AIzaSyCaN0oGOG3Gbndt8sH-lSo6UD0I87hqKCs";

export function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const existing = document.querySelector(`[src*="maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}"]`);
    if (existing) {
      (existing as HTMLScriptElement).addEventListener("load", () => setLoaded(true));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => setLoaded(true);
    script.onerror = () => setError(true);

    document.head.appendChild(script);

    return () => {
      // don't remove script — may be used elsewhere
    };
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    try {
      const bakersfield = { lat: 35.3733, lng: -119.0187 };

      const map = new google.maps.Map(mapRef.current, {
        center: bakersfield,
        zoom: 10,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#0B1426" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#111D35" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#EDE9E3" }] },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1E2D4A" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#182845" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#C4BEB7" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#0D1A30" }],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#111D35" }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      new google.maps.Marker({
        position: bakersfield,
        map,
        title: "COAI · Bakersfield, CA",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#E8A020",
          fillOpacity: 1,
          strokeColor: "#F5B840",
          strokeWeight: 2,
        },
      });

      const circle = new google.maps.Circle({
        strokeColor: "#E8A020",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: "#E8A020",
        fillOpacity: 0.08,
        map,
        center: bakersfield,
        radius: 48000,
      });

      circle.bindTo("center", map, "center");
    } catch {
      setError(true);
    }
  }, [loaded]);

  return (
    <section className="map-section">
      <div className="container">
        <span className="section-eyebrow">Service Area</span>
        <h2 className="section-title">We serve <span className="text-amber">all of Kern County.</span></h2>
        <p className="section-sub">Bakersfield, Delano, Ridgecrest, Tehachapi, Arvin, Lamont, Wasco, Shafter, Taft, California City — and everywhere in between.</p>
      </div>
      <div className="map-wrapper">
        {error ? (
          <div className="map-fallback">
            <p>Map could not be loaded. Check your internet or verify the Google Maps API key is enabled.</p>
          </div>
        ) : (
          <div
            ref={mapRef}
            className="map-container"
            style={{ width: "100%", height: "400px", borderRadius: "12px", overflow: "hidden" }}
          />
        )}
      </div>
    </section>
  );
}
