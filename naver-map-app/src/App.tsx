import React, { useState } from 'react';
import MenuButtons from './components/MenuButtons';
import NaverMap from './components/NaverMap';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import {fetchWheelchairStations} from "./components/WheelchairStationFetcher";

const App: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>(''); // 메뉴 상태 관리

  const handleFetchWheelchairStations = () => {
    console.log('Map Instance:', mapInstance);
    if (mapInstance) {
      // mapInstance와 setMarkers를 인자로 전달
      fetchWheelchairStations(mapInstance, setMarkers);
    }
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu); // 선택된 메뉴 업데이트
  };

  return (
    <div className="App">
      <Header />
      <MenuButtons onFetchWheelchairStations={handleFetchWheelchairStations} onMenuClick={handleMenuClick} />
      <NaverMap setMapInstance={setMapInstance} /> {/* setMapInstance 추가 */}

      {/* '식당' 메뉴가 선택된 경우에만 RestaurantList 표시 */}
      {selectedMenu === '식당' && <RestaurantList />}
    </div>
  );
};

export default App;
