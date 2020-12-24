import '../scss/layout/_map.scss';
import L from './vendor/leaflet';

let link = document.createElement('link');
link.href = 'https://api.mapbox.com';
link.rel = 'preconnect';
link.crossOrigin = '';

let script = document.createElement('script');
script.src = 'https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js';
script.async = true;

document.head.appendChild(link);
document.head.appendChild(script);

// TODO: Использовать Mapbox Directions API и Geolocation API,
// для построения маршрута (альтернатива Google Maps).
// https://leafletjs.com/examples/mobile/
// https://leafletjs.com/reference-1.7.1.html#map-locate
// https://docs.mapbox.com/help/tutorials/getting-started-directions-api/

const ICON_GRADIENT = '<linearGradient id="Grad" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)"><stop offset="0%" stop-color="#ff4d4d" /><stop offset="100%" stop-color="#a70000" /></linearGradient>';

const ICON_AUTO = `<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.75 100.749" class="svg-inline"><defs>${ICON_GRADIENT}</defs><path fill="url(#Grad)" d="M79.24 57.726a1.467 1.467 0 00-.09-.25l-9.057-18.934a1.502 1.502 0 00-1.354-.853H31.173c-.58 0-1.107.334-1.355.858l-8.97 18.934c-.004.007-.005.015-.008.023-4.632 1.196-8.07 5.397-8.07 10.398v6.664c0 4.872 3.26 8.991 7.712 10.306v9.646c0 1.815 1.688 3.293 3.763 3.293h4.694c2.075 0 3.763-1.478 3.763-3.293v-9.202h34.596v9.202c0 1.815 1.688 3.293 3.763 3.293h4.694c2.075 0 3.763-1.478 3.763-3.293V84.64c4.099-1.517 7.033-5.454 7.033-10.074v-6.664c0-4.724-3.067-8.737-7.311-10.176zM32.122 40.689h35.673l7.874 16.462H24.323l7.799-16.462zm-2.418 53.814c-.03.088-.303.308-.765.308h-4.694c-.462 0-.734-.221-.763-.293v-9.204l.038.002h6.182l.002 9.187zm46.816 0c-.03.088-.303.308-.765.308h-4.694c-.462 0-.734-.221-.763-.293v-9.202h5.503c.242 0 .479-.021.717-.036l.002 9.223zm7.031-19.938c0 4.273-3.477 7.75-7.75 7.75H23.52c-4.273 0-7.75-3.477-7.75-7.75v-6.664c0-4.273 3.477-7.75 7.75-7.75h52.281c4.273 0 7.75 3.477 7.75 7.75v6.664z"/><path fill="url(#Grad)" d="M26.592 65.344a5.896 5.896 0 00-5.889 5.89c0 3.247 2.642 5.889 5.889 5.889s5.889-2.642 5.889-5.889a5.896 5.896 0 00-5.889-5.89zm0 8.778a2.892 2.892 0 01-2.889-2.889 2.892 2.892 0 012.889-2.89 2.892 2.892 0 012.889 2.89 2.892 2.892 0 01-2.889 2.889zM73.408 64.972a5.896 5.896 0 00-5.89 5.89 5.896 5.896 0 005.89 5.889 5.896 5.896 0 005.889-5.889 5.896 5.896 0 00-5.889-5.89zm0 8.778a2.892 2.892 0 01-2.89-2.889 2.893 2.893 0 012.89-2.89 2.892 2.892 0 012.889 2.89 2.892 2.892 0 01-2.889 2.889zM56.451 72.273H42.869a1.5 1.5 0 100 3h13.582a1.5 1.5 0 000-3zM17.137 18.356a1.5 1.5 0 00-1.314 2.222 11.12 11.12 0 009.742 5.767c4.41 0 8.354-2.594 10.132-6.558h43.731a4.564 4.564 0 004.558-4.558 4.562 4.562 0 00-4.557-4.556H35.697a11.1 11.1 0 00-10.132-6.558 11.117 11.117 0 00-9.742 5.766 1.5 1.5 0 001.314 2.222h5.975l1.805 3.126-1.805 3.126h-5.975zm8.14 2.25l2.671-4.626a1.5 1.5 0 000-1.5l-2.671-4.626a1.5 1.5 0 00-1.299-.75h-3.732a8.108 8.108 0 0113.007 3.546 1.5 1.5 0 001.422 1.023H79.43c.858 0 1.557.698 1.557 1.555a1.56 1.56 0 01-1.558 1.559H34.675a1.5 1.5 0 00-1.422 1.023 8.103 8.103 0 01-7.688 5.535 8.112 8.112 0 01-5.319-1.989h3.732a1.5 1.5 0 001.299-.75z"/></path></svg>`;

const ICON_ZOOM_IN = `<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline"><defs>${ICON_GRADIENT}</defs><path fill="url(#Grad)" d="M319.8 204v8c0 6.6-5.4 12-12 12h-84v84c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12v-84h-84c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h84v-84c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12zm188.5 293L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z"></path></svg>`;

const ICON_ZOOM_OUT = `<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline"><defs>${ICON_GRADIENT}</defs><path fill="url(#Grad)" d="M307.8 223.8h-200c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12zM508.3 497L497 508.3c-4.7 4.7-12.3 4.7-17 0l-129-129c-2.3-2.3-3.5-5.3-3.5-8.5v-8.5C310.6 395.7 261.7 416 208 416 93.8 416 1.5 324.9 0 210.7-1.5 93.7 93.7-1.5 210.7 0 324.9 1.5 416 93.8 416 208c0 53.7-20.3 102.6-53.7 139.5h8.5c3.2 0 6.2 1.3 8.5 3.5l129 129c4.7 4.7 4.7 12.3 0 17zM384 208c0-97.3-78.7-176-176-176S32 110.7 32 208s78.7 176 176 176 176-78.7 176-176z"></path></svg>`;

const ATTR = 'Данные карты &copy; <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">Участники OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer">CC-BY-SA</a>, Векторные данные &copy; <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer">Mapbox</a>';

const NAME = '«Рус-Авто»';
const DESC = 'Малярно-кузовной цех';

// Шаблон микроразметки для поисковых систем
// https://schema.org/Restaurant
const addMicrodata = (name, desc, address, time, telephone, direction) => `
<article itemscope itemtype="http://schema.org/LocalBusiness">
  <h4 class="subhead">
    <span itemprop="name">${name}</span>
  </h4>
  <span itemprop="description">${desc}</span>
  <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">${address}</span>
    <span itemprop="addressLocality">Великий Новгород</span>
  </span>
  <!--div itemprop="geo" itemscope itemtype="https://schema.org/GeoCoordinate>
    <meta itemprop="latitude" content="58.531300">
    <meta itemprop="longitude" content="31.259243">
  </div-->
  <span>
    <b>Открыто:</b>
    <time itemprop="openingHours" datetime="Mo-Su ${time}">
      ${time}
    </time>
  </span>
  <span>
    <b>Телефон:</b>
    <span itemprop="telephone">
      <a href="tel:${telephone}">${telephone}</a>
    </span>
  </span>
  <a class="gm-direction" href="${direction}" target="_blank" rel="noopener noreferrer">Проложить маршрут</a>
</article>
`;

const location = {
  data: () => addMicrodata(
    NAME,
    DESC,
    'ул. Германа, 21а',
    '09&colon;00–19&colon;00',
    '+7 (816) 222-23-33',
    'https://goo.gl/maps/7EGiAjLzyrQvtxJB8'
  ),
  lat: 58.531446,
  lng: 31.257672,
};

const coords = [location.lat, location.lng];

// https://docs.mapbox.com/api/maps/#static-tiles
const mapboxUrl = 'https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{z}/{x}/{y}@2x?access_token={accessToken}';

// https://docs.mapbox.com/help/glossary/zoom-level/#tile-size
const vectorLayerOptions = {
  minZoom: 12,
  maxZoom: 18,
  username: 'mevius6',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: process.env.MAPBOX_ACCESS_TOKEN,
}

const style = L.tileLayer(mapboxUrl, {
  ...vectorLayerOptions,
  style_id: 'ckftohe0n22dt19tico5od59q'
});

const mapOptions = {
  attributionControl: false,
  zoomControl: false,
  zoomSnap: 0.5,
  scrollWheelZoom: false,
}

const map = L.map('map', mapOptions).setView(coords, 17);

style.addTo(map);

// https://leafletjs.com/reference-1.7.1.html#icon
const markerIcon = L.divIcon({
  html: ICON_AUTO,
  iconSize: [40, 45],
  popupAnchor: [0, -22.5],
  className: 'marker-icon',
});

const popupOptions = {
  maxWidth: 300,
  keepInView: true,
  closeButton: true,
  className: 'microdata-popup',
};

const marker = L.marker(coords, {icon: markerIcon})
  .addTo(map)
  .bindPopup(location.data, popupOptions)
  .openPopup();

marker.on('click', () => map.setView(coords));

L.control.zoom({
  position: 'topright',
  zoomInText: ICON_ZOOM_IN,
  zoomInTitle: 'Приблизить',
  zoomOutText: ICON_ZOOM_OUT,
  zoomOutTitle: 'Отдалить',
}).addTo(map);


L.control
  .attribution({position: 'bottomright'})
  .addAttribution(ATTR)
  .addTo(map);
