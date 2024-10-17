import React, { useState, useEffect, useRef } from 'react';
import { Box, useMediaQuery, Theme } from '@mui/material';

interface NaverMapProps {
  setMapInstance: (map: naver.maps.Map | null) => void;
  center?: { lat: number; lng: number } | null;
}

const NaverMap: React.FC<NaverMapProps> = ({ setMapInstance, center }) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const mapElement = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // 네이버 지도 API 로드 확인
  const isNaverMapsLoaded = () => typeof naver !== 'undefined' && typeof naver.maps !== 'undefined';

  // 지도 초기화
  useEffect(() => {
    if (mapElement.current && isNaverMapsLoaded()) {
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
      maxWidth: isMobile ? '100%' : '1500px', // 데스크탑 환경에서 지도의 최대 너비 설정
      maxHeight: isMobile ? '100%' : '800px', // 데스크탑 환경에서 지도의 최대 높이 설정
      margin: 'auto', 
      overflow: 'hidden',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)' // 그림자 진하게 조정
    }}>
      <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default NaverMap;
