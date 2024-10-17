import React, { useState } from 'react';
import { Box, useMediaQuery, ThemeProvider, createTheme } from '@mui/material';
import HeaderAndMap from './components/HeaderAndMap';
import MenuButtons from './components/MenuButtons';
import Sidebar from './components/Sidebar';
import { fetchWheelchairStations } from './components/WheelchairStationFetcher';

function App() {
    const [selectedMenu, setSelectedMenu] = useState<string>('홈');
    const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);
    const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);

    // Create a theme instance
    const theme = createTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh' }}>
                {isMobile ? (
                    <>
                        <HeaderAndMap setMapInstance={setMapInstance} />
                        <MenuButtons 
                            onFetchWheelchairStations={() => {
                                if (mapInstance) {
                                    fetchWheelchairStations(mapInstance, setMarkers);
                                }
                            }}
                            onMenuClick={setSelectedMenu}
                            selectedMenu={selectedMenu}
                            setMarkers={setMarkers} // 추가: setMarkers prop 전달
                        />
                    </>
                ) : (
                    <>
                        <Sidebar 
                            selectedMenu={selectedMenu} 
                            onMenuClick={setSelectedMenu} 
                            map={mapInstance} 
                            setMarkers={setMarkers} 
                        />
                        <HeaderAndMap setMapInstance={setMapInstance} />
                    </>
                )}
            </Box>
        </ThemeProvider>
    );
}

export default App;
