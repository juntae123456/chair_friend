import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface NaverMapProps {
  setMapInstance: (map: naver.maps.Map | null) => void;
  center?: { lat: number; lng: number } | null;
}

const NaverMap: React.FC<NaverMapProps> = ({ setMapInstance, center }) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const mapElement = useRef<HTMLDivElement | null>(null);

  // 지도 초기화
  useEffect(() => {
    if (mapElement.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 초기 서울 시청 위치
        zoom: 13,
      };
      const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);
      setMap(mapInstance);
      setMapInstance(mapInstance);

      return () => {
        naver.maps.Event.clearListeners(mapInstance, 'idle');
      };
    }
  }, [setMapInstance]);

  // center prop이 변경될 때 지도 중심 이동
  useEffect(() => {
    if (map && center) {
      map.setCenter(new naver.maps.LatLng(center.lat, center.lng));
      map.setZoom(15);
    }
  }, [map, center]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      maxWidth: '1600px', // 최대 너비를 1600px로 설정
      maxHeight: '900px', 
      margin: 'auto', 
      overflow: 'hidden',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' // 그림자 효과 추가
    }}>
      <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default NaverMap;
