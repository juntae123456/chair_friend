declare module '@google/markerclusterer' {
  import { Marker } from 'naver.maps';

  interface MarkerClustererOptions {
    imagePath: string;
    gridSize?: number;
    maxZoom?: number;
  }

  class MarkerClusterer {
    constructor(map: naver.maps.Map, markers: Marker[], options: MarkerClustererOptions);
    addMarker(marker: Marker): void;
    clearMarkers(): void;
  }

  export default MarkerClusterer;
}
