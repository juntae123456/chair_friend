import React from 'react';
import Header from './components/Header';
import MenuButtons from './components/MenuButtons';
import FoodTypeSelector from './components/FoodTypeSelector';
import RestaurantList from './components/RestaurantList';
import NaverMapWithSearch from './components/NaverMapWithSearch';

const App: React.FC = () => {
  // 휠체어 충전소 데이터를 가져오는 함수 (MenuButtons에서 사용할 수 있음)
  const fetchWheelchairStations = () => {
    // 휠체어 충전소 API를 호출하는 기능을 여기에 추가할 수 있습니다.
    // NaverMapWithSearch 컴포넌트에서 추가하는 방법에 따라 조정 가능합니다.
    console.log('휠체어 충전소 데이터 가져오기');
  };

  return (
    <div className="App">
      <Header />
      {/* MenuButtons에서 휠체어 충전소 데이터를 가져오는 기능을 전달 */}
      <MenuButtons onFetchWheelchairStations={fetchWheelchairStations} />
      {/* NaverMapWithSearch 컴포넌트에서 지도와 검색을 렌더링 */}
      <NaverMapWithSearch />
      <FoodTypeSelector />
      <RestaurantList />
    </div>
  );
};

export default App;
