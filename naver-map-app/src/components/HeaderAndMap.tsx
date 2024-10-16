import React, { useState } from 'react';
import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NaverMap from './NaverMap'; // NaverMap 컴포넌트 불러오기

interface HeaderAndMapProps {
  setMapInstance: (map: naver.maps.Map | null) => void; // setMapInstance 추가
}

const HeaderAndMap: React.FC<HeaderAndMapProps> = ({ setMapInstance }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

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
    <Box sx={{ width: '100%', height: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 바 */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start', // 위쪽에 붙도록 설정
        padding: '40px 20px', // 상하 20px, 좌우 20px 패딩
        backgroundColor: '#272727', 
        color: 'white',
        height: '100px', 
        zIndex: 1,
        position: 'relative',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="지역으로 검색하기.."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
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
                height: '50px', // 높이를 40px로 조정
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
              marginRight: '200px', // 오른쪽 마진을 20px로 조정
            }}
          />
          <Button 
            variant="contained" 
            color="success"
            sx={{
              height: '40px', // 높이를 40px로 조정
              borderRadius: '4px',
              padding: '0 20px',
            }}
          >
            로그인
          </Button>
        </Box>
      </Box>

      {/* 지도 표시 */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '0 30px 0',
        position: 'relative',
        top: '-30px', // 지도가 상단 바를 30px 덮도록 설정
        zIndex: 2,
      }}>
        <Box sx={{ 
          width: '1600px', 
          height: '900px', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
            <NaverMap setMapInstance={setMapInstance} center={mapCenter} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderAndMap;
