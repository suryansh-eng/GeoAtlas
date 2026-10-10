import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {auth} from '../firebase'
import {BHUVAN_WMS_URL, BHUVAN_LULC_LAYER, LULC_50K_URL, LULC_50K_STATES} from '../utils/bhuvan'
const ZOOM_SWITCH = 7

const Dashboard = () => {
  const mapEl = useRef(null)
  const mapRef = useRef(null)
  const coarseRef = useRef(null)
  const fineRef = useRef(null)
  const [showLulc, setShowLulc] = useState(true)
  const [opacity, setOpacity] = useState(0.7)
  const navigate = useNavigate()

  useEffect(() => {
    const map = L.map(mapEl.current).setView([22.5, 79], 5)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map)

    coarseRef.current = L.tileLayer.wms(BHUVAN_WMS_URL, {
      layers: BHUVAN_LULC_LAYER,
      format: 'image/png',
      transparent: true,
      attribution: 'Bhuvan, ISRO/NRSC'
    })

    fineRef.current = L.layerGroup(
  LULC_50K_STATES.map((state) => L.tileLayer.wms(LULC_50K_URL, {
    layers: state.layer,
    format: 'image/png',
    transparent: true,
    bounds: state.bounds,
    attribution: 'Bhuvan, ISRO/NRSC'
  }))
)

    mapRef.current = map
    return () => map.remove()
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const coarse = coarseRef.current
    const fine = fineRef.current
    if (!map || !coarse || !fine) return

    const sync = () => {
      const zoomedIn = map.getZoom() >= ZOOM_SWITCH
      if (showLulc && !zoomedIn) coarse.addTo(map)
      else map.removeLayer(coarse)
      if (showLulc && zoomedIn) fine.addTo(map)
      else map.removeLayer(fine)
    }

    sync()
    map.on('zoomend', sync)
    return () => map.off('zoomend', sync)
  }, [showLulc])

  useEffect(() => {
    if (coarseRef.current) coarseRef.current.setOpacity(opacity)
    if (fineRef.current) fineRef.current.eachLayer((layer) => layer.setOpacity(opacity))
  }, [opacity])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

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
  )
}

export default Dashboard