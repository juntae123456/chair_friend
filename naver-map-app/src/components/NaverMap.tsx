import React, { useState, useEffect, useRef } from 'react';
import { TextField, Box } from '@mui/material';

interface NaverMapProps {
  setMapInstance: (map: naver.maps.Map | null) => void;
}

const NaverMap: React.FC<NaverMapProps> = ({ setMapInstance }) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색 쿼리 상태
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
      setMapInstance(mapInstance); // 상위 컴포넌트에 mapInstance 전달

      return () => {
        naver.maps.Event.clearListeners(mapInstance, 'idle'); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      };
    }
  }, [setMapInstance]);

  // 검색 실행 함수 (마커는 생성하지 않고, 지도만 이동)
  const handleSearch = () => {
    if (searchQuery && map) {
      naver.maps.Service.geocode({ query: searchQuery }, (status, response) => {
        if (status === naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
          const result = response.v2.addresses[0];
          const lat = parseFloat(result.y);
          const lng = parseFloat(result.x);
          const searchLocation = new naver.maps.LatLng(lat, lng);

          // 지도 중심 이동 및 줌 레벨 설정
          map.setCenter(searchLocation);
          map.setZoom(15); // 검색 완료 후 줌 레벨 15로 설정

          // 검색 완료 후 검색창 비우기
          setSearchQuery('');
        } else {
          // 검색 결과가 없으면 경고창을 띄움
          alert('검색 결과가 없습니다.');
        }
      });
    }
  };

  // 엔터키로 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 검색창 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 2, width: '100%' }}>
        <TextField
          label="위치 검색"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress} // 엔터키로 검색 실행
          sx={{ width: 'calc(100% - 10px)', margin: '0 5px' }}
        />
      </Box>
      {/* 지도 표시 */}
      <div ref={mapElement} style={{ flex: 1, width: '100%' }} />
    </div>
  );
};

export default NaverMap;
