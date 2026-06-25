import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { GeoPoint } from '@/types';
import { clamp } from '@/lib/utils';

const makeIcon = (color: string, emoji: string) =>
  L.divIcon({
    className: '',
    html: `<div style="background:${color};width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:grid;place-items:center;box-shadow:0 6px 16px rgba(0,0,0,.3);border:3px solid white"><span style="transform:rotate(45deg);font-size:16px">${emoji}</span></div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -36],
  });

const pickupIcon = makeIcon('#10b981', '🍱');
const deliverIcon = makeIcon('#f97316', '🏠');
const riderIcon = makeIcon('#7c3aed', '🚴');

function FitBounds({ points }: { points: GeoPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length >= 2) {
      map.fitBounds(points.map((p) => [p.lat, p.lng]) as [number, number][], { padding: [60, 60] });
    }
  }, [map, points]);
  return null;
}

export function TrackingMap({
  pickup,
  delivery,
  progress = 0,
  className = 'h-[420px]',
}: {
  pickup: GeoPoint;
  delivery: GeoPoint;
  progress?: number; // 0-1, rider position along the route
  className?: string;
}) {
  const t = clamp(progress, 0, 1);
  const rider: GeoPoint = {
    lat: pickup.lat + (delivery.lat - pickup.lat) * t,
    lng: pickup.lng + (delivery.lng - pickup.lng) * t,
  };
  const center: [number, number] = [(pickup.lat + delivery.lat) / 2, (pickup.lng + delivery.lng) / 2];

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} className={`${className} w-full overflow-hidden rounded-3xl`}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      <Polyline positions={[[pickup.lat, pickup.lng], [delivery.lat, delivery.lng]]} pathOptions={{ color: '#10b981', weight: 4, dashArray: '8 10' }} />
      <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}><Popup>Pickup location</Popup></Marker>
      <Marker position={[delivery.lat, delivery.lng]} icon={deliverIcon}><Popup>Delivery location</Popup></Marker>
      {t > 0 && t < 1 && <Marker position={[rider.lat, rider.lng]} icon={riderIcon}><Popup>Volunteer en route</Popup></Marker>}
      <FitBounds points={[pickup, delivery]} />
    </MapContainer>
  );
}

/** Hook that animates a 0→1 progress value over a duration. */
export function useRouteProgress(durationMs = 14000) {
  const [progress, setProgress] = useState(0.15);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = clamp(0.15 + (now - start) / durationMs, 0.15, 0.95);
      setProgress(p);
      if (p < 0.95) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);
  return progress;
}
