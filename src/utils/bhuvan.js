export const BHUVAN_WMS_URL = process.env.REACT_APP_BHUVAN_WMS_URL
export const BHUVAN_LULC_LAYER = process.env.REACT_APP_BHUVAN_LULC_LAYER

export const LULC_50K_URL = 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms'

// bounds format: [[south, west], [north, east]]
export const LULC_50K_STATES = [
  {layer: 'lulc:AN_LULC50K_1516', bounds: [[6.758, 92.208], [13.676, 93.948]]},
  {layer: 'lulc:AP_LULC50K_1516', bounds: [[12.624, 76.761], [19.917, 84.765]]},
  {layer: 'lulc:AR_LULC50K_1516', bounds: [[26.656, 91.605], [29.376, 97.415]]},
  {layer: 'lulc:AS_LULC50K_1516', bounds: [[23.135, 89.701], [27.977, 96.021]]},
  {layer: 'lulc:BR_LULC50K_1516', bounds: [[24.286, 83.323], [27.521, 88.298]]},
  {layer: 'lulc:CG_LULC50K_1516', bounds: [[17.7, 80.2], [24.2, 84.5]]},
  {layer: 'lulc:GA_LULC50K_1516', bounds: [[14.8, 73.6], [15.8, 74.4]]},
  {layer: 'lulc:GJ_LULC50K_1516', bounds: [[20.0, 68.0], [24.8, 74.5]]},
  {layer: 'lulc:HR_LULC50K_1516', bounds: [[27.6, 74.4], [31.0, 77.6]]},
  {layer: 'lulc:HP_LULC50K_1516', bounds: [[30.4, 75.5], [33.3, 79.1]]},
  {layer: 'lulc:JK_LULC50K_1516', bounds: [[32.2, 72.5], [37.1, 80.5]]},
  {layer: 'lulc:JH_LULC50K_1516', bounds: [[21.9, 83.3], [25.4, 87.9]]},
  {layer: 'lulc:KA_LULC50K_1516', bounds: [[11.5, 74.0], [18.5, 78.6]]},
  {layer: 'lulc:KL_LULC50K_1516', bounds: [[8.2, 74.8], [12.8, 77.4]]},
  {layer: 'lulc:MP_LULC50K_1516', bounds: [[21.0, 74.0], [26.9, 82.8]]},
  {layer: 'lulc:MH_LULC50K_1516', bounds: [[15.6, 72.6], [22.1, 80.9]]},
  {layer: 'lulc:MN_LULC50K_1516', bounds: [[23.8, 93.0], [25.7, 94.8]]},
  {layer: 'lulc:ML_LULC50K_1516', bounds: [[25.0, 89.8], [26.1, 92.8]]},
  {layer: 'lulc:MZ_LULC50K_1516', bounds: [[21.9, 92.2], [24.5, 93.5]]},
  {layer: 'lulc:NL_LULC50K_1516', bounds: [[25.2, 93.3], [27.1, 95.3]]},
  {layer: 'lulc:OR_LULC50K_1516', bounds: [[17.8, 81.3], [22.6, 87.5]]},
  {layer: 'lulc:PB_LULC50K_1516', bounds: [[29.5, 73.8], [32.6, 77.0]]},
  {layer: 'lulc:RJ_LULC50K_1516', bounds: [[23.0, 69.5], [30.2, 78.3]]},
  {layer: 'lulc:SK_LULC50K_1516', bounds: [[27.0, 88.0], [28.2, 88.95]]},
  {layer: 'lulc:TN_LULC50K_1516', bounds: [[8.0, 76.2], [13.6, 80.4]]},
  {layer: 'lulc:TR_LULC50K_1516', bounds: [[22.9, 91.1], [24.6, 92.4]]},
  {layer: 'lulc:UK_LULC50K_1516', bounds: [[28.7, 77.5], [31.5, 81.1]]},
  {layer: 'lulc:UP_LULC50K_1516', bounds: [[23.8, 77.0], [30.4, 84.7]]},
  {layer: 'lulc:WB_LULC50K_1516', bounds: [[21.5, 85.8], [27.3, 89.9]]},
  {layer: 'lulc:CH_LULC50K_1516', bounds: [[30.6, 76.6], [30.85, 76.95]]},
  {layer: 'lulc:DD_LULC50K_1516', bounds: [[20.3, 70.8], [20.85, 73.0]]},
  {layer: 'lulc:DL_LULC50K_1516', bounds: [[28.35, 76.8], [28.9, 77.4]]},
  {layer: 'lulc:LD_LULC50K_1516', bounds: [[8.0, 71.5], [12.5, 74.0]]},
  {layer: 'lulc:PY_LULC50K_1516', bounds: [[10.8, 75.4], [16.8, 82.3]]},
  {layer: 'lulc:DH_LULC50K_1516', bounds: [[20.0, 72.8], [20.5, 73.3]]}
]