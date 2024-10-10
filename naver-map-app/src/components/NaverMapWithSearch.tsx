import React, { useRef, useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

const NaverMapWithSearch: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null); // 마커 상태 관리

  // 지도 초기화
  useEffect(() => {
    if (!mapElement.current) return;

    const mapOptions = {
      center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
      zoom: 13,
    };

    const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);
    setMap(mapInstance);
  }, []);

  // 검색 실행 함수
  const handleSearch = () => {
    if (!map || !searchQuery.trim()) return;

    // Geocode 서비스 호출
    naver.maps.Service.geocode({ query: searchQuery }, function (status, response) {
      if (status === naver.maps.Service.Status.OK && response.v2.addresses.length > 0) {
        const result = response.v2.addresses[0];
        const lat = parseFloat(result.y); // 문자열을 숫자로 변환
        const lng = parseFloat(result.x); // 문자열을 숫자로 변환
        const resultLocation = new naver.maps.LatLng(lat, lng);

        // 지도 중심 이동 및 확대
        map.setCenter(resultLocation);
        map.setZoom(15); // 확대 수준 설정

        // 기존 마커 제거
        if (marker) {
          marker.setMap(null);
        }

        // 새로운 마커 추가
        const newMarker = new naver.maps.Marker({
          position: resultLocation,
          map: map,
        });

        setMarker(newMarker); // 새로운 마커 상태 업데이트

        // 검색창 비우기
        setSearchQuery('');
      } else {
        alert('검색 결과를 찾을 수 없습니다.');
      }
    });
  };

  // 엔터키 이벤트 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* 검색창 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 2, width: '100%' }}>
        <TextField
          label="지역으로 검색하기"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}  // 엔터키로 검색 실행
          sx={{ width: 'calc(100% - 10px)', margin: '0 5px' }}  // 좌우 5px 마진 추가
        />
      </Box>

      {/* 네이버 지도 */}
      <div ref={mapElement} style={{ width: '100%', height: '500px' }} />
    </>
  );
};

export default NaverMapWithSearch;
