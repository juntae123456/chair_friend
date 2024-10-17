import React, { useState } from 'react';
import { Box, TextField, InputAdornment, useMediaQuery, Theme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NaverMap from './NaverMap'; // NaverMap 컴포넌트 불러오기
import NaverLogin from './NaverLogin'; // NaverLogin 컴포넌트 불러오기

interface HeaderAndMapProps {
  setMapInstance: (map: naver.maps.Map | null) => void; // setMapInstance 추가
}

const HeaderAndMap: React.FC<HeaderAndMapProps> = ({ setMapInstance }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      // 네이버 지도 API의 지오코딩 서비스를 사용하여 주소를 좌표로 변환
      naver.maps.Service.geocode({ query: searchQuery }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert('검색 중 오류가 발생했습니다.');
        }
        if (response.v2.meta.totalCount > 0) {
          const item = response.v2.addresses[0];
          const point = new naver.maps.Point(Number(item.x), Number(item.y));
          setMapCenter({ lat: point.y, lng: point.x });
          setSearchQuery(''); // 검색 성공 후 검색창 초기화
        } else {
          alert('검색 결과가 없습니다.');
        }
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 바 */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#272727', 
        color: 'white',
        zIndex: 1, // 상단바의 zIndex를 높게 설정
        position: 'relative',
        height: '50px', // 상단바 높이 조정
      }}>
        {isMobile && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <img src="https://ifh.cc/g/bBkoOz.png" alt="Logo" style={{ width: 70}} />
              <img src="https://ifh.cc/g/0ROpp7.png" alt="Logo name" style={{ width: 160 }} />
            </Box>
            <NaverLogin 
              setGetToken={() => {}} 
              setUserInfo={() => {}} 
            />
          </>
        )}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
            <TextField
              placeholder="지역으로 검색하기.."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
                  </InputAdornment>
                ),
                style: { 
                  backgroundColor: '#939191',
                  borderRadius: '50px',
                  width: '270px',
                  height: '50px',
                }
              }}
              sx={{
                marginRight: '100px', // 로그인 버튼과의 패딩 설정
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
            />
            <NaverLogin 
              setGetToken={() => {}} 
              setUserInfo={() => {}} 
            />
          </Box>
        )}
      </Box>

      {/* 지도 표시 */}
      <Box sx={{ flex: 1, position: 'relative', marginTop: isMobile ? '0' : '-30px', zIndex: 2 }}>
        {isMobile && (
          <Box sx={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 3}}>
            <TextField
              placeholder="지역으로 검색하기.."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
                  </InputAdornment>
                ),
                style: { 
                  backgroundColor: 'rgba(147, 145, 145, 0.5)', // 투명도 50% 적용
                  borderRadius: '50px',
                  width: '350px', // 모바일 환경에서 검색창 너비 증가
                  height: '50px',
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
            />
          </Box>
        )}
        <NaverMap setMapInstance={setMapInstance} center={mapCenter} />
      </Box>
    </Box>
  );
};

export default HeaderAndMap;
