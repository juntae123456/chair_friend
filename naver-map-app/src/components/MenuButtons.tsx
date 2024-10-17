import React from 'react';
import { Box, Button } from "@mui/material";
import { removeIdleListener } from './WheelchairStationFetcher'; // 추가: removeIdleListener 함수 import

interface MenuButtonsProps {
  onFetchWheelchairStations: () => void;
  onMenuClick: (menu: string) => void;
  selectedMenu: string;
  setMarkers: React.Dispatch<React.SetStateAction<naver.maps.Marker[]>>;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onFetchWheelchairStations, onMenuClick, selectedMenu, setMarkers }) => {
  const menuItems = ["홈", "휠체어 충전소", "식당", "카페", "저상 버스 위치"];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '90px', backgroundColor: '#FF4B55', padding: '0 10px' }}>
      {menuItems.map((label) => (
        <Button
          key={label}
          onClick={() => {
            onMenuClick(label);
            if (label === "휠체어 충전소") {
              onFetchWheelchairStations();
            } else if (label === "홈") {
              // 홈 버튼 클릭 시 마커 제거 및 idle 리스너 제거
              setMarkers((prevMarkers) => {
                prevMarkers.forEach((marker) => marker.setMap(null));
                return [];
              });
              removeIdleListener(); // 추가: idle 리스너 제거
            }
          }}
          sx={{
            color: selectedMenu === label ? '#FF7A7C' : 'black', // 선택된 버튼은 #FF7A7C, 나머지는 검정색
            fontSize: '18px',
            fontWeight: 'bold', // 텍스트를 진하게 설정
            flexGrow: 1,
            borderRadius: '50px', // 동그란 모양 설정
            backgroundColor: selectedMenu === label ? 'white' : 'transparent', // 클릭 시 배경색 변경
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // 호버 시 배경색
            },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: 'transparent', // 밑줄 제거
              transition: 'background-color 0.3s ease',
            },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default MenuButtons;
