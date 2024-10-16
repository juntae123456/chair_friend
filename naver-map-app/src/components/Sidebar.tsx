import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WheelchairIcon from '@mui/icons-material/Accessible';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CafeIcon from '@mui/icons-material/LocalCafe';
import BusIcon from '@mui/icons-material/DirectionsBus';
import { fetchWheelchairStations, removeIdleListener } from './WheelchairStationFetcher';

interface SidebarProps {
  selectedMenu: string;
  onMenuClick: (menu: string) => void;
  map?: naver.maps.Map | null;
  setMarkers?: React.Dispatch<React.SetStateAction<naver.maps.Marker[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedMenu, onMenuClick, map, setMarkers }) => {
  const menuItems = [
    { 
      label: '홈', 
      icon: <HomeIcon fontSize="large" />, 
      action: () => {
        if (setMarkers) {
          setMarkers((prevMarkers) => {
            prevMarkers.forEach((marker) => marker.setMap(null));
            return [];
          });
        }
        removeIdleListener();
      }
    },
    { 
      label: '휠체어 충전소', 
      icon: <WheelchairIcon fontSize="large" />, 
      action: () => {
        if (map && setMarkers) {
          fetchWheelchairStations(map, setMarkers);
        }
      }
    },
    { label: '식당', icon: <RestaurantIcon fontSize="large" /> },
    { label: '카페', icon: <CafeIcon fontSize="large" /> },
    { label: '저상 버스 위치', icon: <BusIcon fontSize="large" /> },
  ];

  return (
    <Box sx={{ 
      width: '250px', 
      height: '100vh', 
      backgroundColor: '#FF4B55', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      paddingTop: 2,
      boxShadow: '8px 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 2 }}>
        <img src="https://ifh.cc/g/jNXXqF.png" alt="Logo" style={{ width: 60, marginLeft: 20 }} />
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/979edae1dcf047805473693709d5064ae442a83396d11c2b21bbeb368056a7e7" alt="Logo name" style={{ width: 150, marginRight: 5 }} />
      </Box>
      <Divider sx={{ backgroundColor: 'white', marginBottom: 2 }} />

      {menuItems.map((item) => (
        <Button
          key={item.label}
          startIcon={item.icon}
          onClick={() => {
            onMenuClick(item.label);
            if (item.action) item.action();
          }}
          sx={{
            justifyContent: 'flex-start',
            color: selectedMenu === item.label ? '#FF7A7C' : 'black',
            backgroundColor: 'transparent',
            fontSize: '20px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            padding: '10px 15px',
            borderRadius: '50px',
            margin: '5px 15px',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            width: 'calc(100% - 30px)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'white',
              borderRadius: '50px',
              opacity: selectedMenu === item.label ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 0,
            },
            '& .MuiButton-startIcon': {
              marginRight: '10px',
              position: 'relative',
              zIndex: 1,
            },
            '& .MuiButton-root': {
              position: 'relative',
              zIndex: 1,
              color: 'inherit',
            },
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
        </Button>
      ))}
    </Box>
  );
};

export default Sidebar;
