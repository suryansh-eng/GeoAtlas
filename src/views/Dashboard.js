import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {auth} from '../firebase';
import {BHUVAN_WMS_URL, BHUVAN_LULC_LAYER} from '../utils/bhuvan';

const Dashboard = () => {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const lulcRef = useRef(null);
  const [showLulc, setShowLulc] = useState(true);
  const [opacity, setOpacity] = useState(0.7);
  const navigate = useNavigate();

  useEffect(() => {
    const map = L.map(mapEl.current).setView([22.5, 79], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    lulcRef.current = L.tileLayer.wms(BHUVAN_WMS_URL, {
      layers: BHUVAN_LULC_LAYER,
      format: 'image/png',
      transparent: true,
      attribution: 'Bhuvan, ISRO/NRSC'
    }).addTo(map);

    mapRef.current = map;
    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = lulcRef.current;
    if (!map || !layer) return;
    if (showLulc) layer.addTo(map);
    else map.removeLayer(layer);
  }, [showLulc]);

  useEffect(() => {
    if (lulcRef.current) lulcRef.current.setOpacity(opacity);
  }, [opacity]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div style={{position: 'relative', height: '100vh'}}>
      <div ref={mapEl} style={{height: '100%', width: '100%'}} />
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1000,
          padding: 16,
          borderRadius: 16,
          background: 'rgba(30, 45, 55, 0.85)',
          color: '#f5f0e6'
        }}
      >
        <h3 style={{margin: '0 0 12px'}}>Land Use / Land Cover</h3>
        <label>
          <input
            type="checkbox"
            checked={showLulc}
            onChange={(e) => setShowLulc(e.target.checked)}
          />{' '}
          Show LULC layer
        </label>
        <div style={{marginTop: 12}}>
          <label>Opacity</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            style={{display: 'block', width: '100%'}}
          />
        </div>
        <button onClick={handleLogout} style={{marginTop: 12}}>Log out</button>
      </div>
    </div>
  );
};

export default Dashboard;