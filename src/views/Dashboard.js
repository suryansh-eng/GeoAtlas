import {useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {signOut} from 'firebase/auth'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {auth} from '../firebase'
import {BHUVAN_WMS_URL, BHUVAN_LULC_LAYER, LULC_50K_URL, LULC_50K_STATES} from '../utils/bhuvan'

const ZOOM_SWITCH = 7

const Dashboard = () => {
  const mapEl = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const map = L.map(mapEl.current, {zoomControl: false}).setView([22.5, 79], 5)
    L.control.zoom({position: 'bottomright'}).addTo(map)
    map.attributionControl.setPosition('bottomleft')

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map)

    const coarse = L.tileLayer.wms(BHUVAN_WMS_URL, {
      layers: BHUVAN_LULC_LAYER,
      format: 'image/png',
      transparent: true,
      attribution: 'Bhuvan, ISRO/NRSC'
    })

    const fine = L.layerGroup(
      LULC_50K_STATES.map((state) => L.tileLayer.wms(LULC_50K_URL, {
        layers: state.layer,
        format: 'image/png',
        transparent: true,
        bounds: state.bounds,
        attribution: 'Bhuvan, ISRO/NRSC'
      }))
    )

    const sync = () => {
      if (map.getZoom() >= ZOOM_SWITCH) {
        map.removeLayer(coarse)
        fine.addTo(map)
      } else {
        map.removeLayer(fine)
        coarse.addTo(map)
      }
    }

    sync()
    map.on('zoomend', sync)
    return () => map.remove()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div style={{position: 'relative', height: '100vh'}}>
      <div ref={mapEl} style={{height: '100%', width: '100%'}} />
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          background: 'rgba(0, 0, 0, 0.87)',
          color: '#ffffff'
        }}
      >
        <span style={{fontSize: 22, fontWeight: 700, letterSpacing: 0.5}}>GeoAtlas</span>
        <button
          onClick={handleLogout}
          style={{
            background: '#d32f2f',
            color: '#ffffff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 18px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Log out
        </button>
      </header>
    </div>
  )
}

export default Dashboard