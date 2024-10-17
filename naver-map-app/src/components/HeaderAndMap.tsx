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
      // Geocoding logic here
      setSearchQuery(''); // 검색 후 검색창 초기화
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
                  height: '40px',
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
