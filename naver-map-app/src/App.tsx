import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import HeaderAndMap from './components/HeaderAndMap';

function App() {
    const [selectedMenu, setSelectedMenu] = useState<string>('홈'); // 초기 상태를 '홈'으로 설정
    const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);
    const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* 사이드바 */}
            <Sidebar 
                selectedMenu={selectedMenu} 
                onMenuClick={setSelectedMenu} 
                map={mapInstance} 
                setMarkers={setMarkers} 
            />
            {/* 상단바와 지도 */}
            <HeaderAndMap setMapInstance={setMapInstance} />
        </Box>
    );
}

export default App;
