import axios from 'axios';
import { parseStringPromise } from 'xml2js';

let idleListener: naver.maps.MapEventListener | null = null; // 리스너 참조 저장

export const fetchWheelchairStations = async (
    map: naver.maps.Map,
    setMarkers: (markers: naver.maps.Marker[]) => void
) => {
  try {
    const API_KEY = 'gPtkOvEliK1AvYI39wzlWkUK%2Bp%2Bvy8FLmAoLG%2FoSZDmGCCYEtwNAzfM14q9nsV8Y2NoPl4GiVI8aY69JUBxQ2A%3D%3D';
    const BASE_URL = `https://apis.data.go.kr/6260000/BusanDischrgStusService/getTblDischrgStusInfo?serviceKey=${API_KEY}`;

    const firstPageResponse = await axios.get(BASE_URL + '&pageNo=1&numOfRows=10');
    console.log('First Page Response:', firstPageResponse.data);

    // XML 파싱
    const firstPageParsed = await parseStringPromise(firstPageResponse.data);
    console.log('Parsed XML:', firstPageParsed);  // XML 파싱 결과를 확인
    const totalCount = parseInt(firstPageParsed.response.body[0].totalCount[0], 10);
    const numOfRows = 10;
    const totalPages = Math.ceil(totalCount / numOfRows);

    let allStations: any[] = [];

    // 모든 페이지 데이터 요청
    const fetchPromises = [];
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      fetchPromises.push(axios.get(BASE_URL + `&pageNo=${pageNo}&numOfRows=${numOfRows}`));
    }

    const responses = await Promise.all(fetchPromises);
    for (const response of responses) {
      const parsedData = await parseStringPromise(response.data);
      console.log('Parsed Page Data:', parsedData);  // 각 페이지 데이터 파싱 결과를 확인
      const stations = parsedData.response.body[0].items[0].item;
      allStations = [...allStations, ...stations];
    }

    // 새 마커 생성
    const newMarkers = allStations.map((station: any) => {
      const lat = parseFloat(station.lat[0]);
      const lng = parseFloat(station.lng[0]);
      const position = new naver.maps.LatLng(lat, lng);

      const markerTitle = `${station.loc[0]} - ${station.detailLoc[0]}`;

      const marker = new naver.maps.Marker({
        position: position,
        title: markerTitle,
      });

      console.log('Marker created:', marker); // 마커 생성 확인

      return marker;
    });

    // 마커 업데이트
    setMarkers(newMarkers);
    console.log('Markers set:', newMarkers); // 마커 설정 확인

    // 지도 중심을 첫 번째 충전소로 설정
    if (newMarkers.length > 0) {
      map.setCenter(newMarkers[0].getPosition());
      map.setZoom(13);
      console.log('Map center set to:', newMarkers[0].getPosition()); // 지도 중심 설정 확인
    }

    // 보이는 영역에 있는 마커만 표시
    updateMarkersInView(map, newMarkers);

    // 기존의 'idle' 이벤트 리스너 제거
    if (idleListener) {
      naver.maps.Event.removeListener(idleListener);
    }

    // 'idle' 이벤트가 발생할 때 보이는 범위 내 마커 업데이트
    idleListener = naver.maps.Event.addListener(map, 'idle', function () {
      updateMarkersInView(map, newMarkers);
    });

  } catch (error) {
    console.error('휠체어 충전소 데이터 가져오기 실패:', error);
    if (Response) {
      console.log('Error Response:', Response);  // 에러 응답 상세 확인
    }
  }
};

// 'idle' 이벤트 리스너 제거 함수
export const removeIdleListener = () => {
  if (idleListener) {
    naver.maps.Event.removeListener(idleListener);
    idleListener = null;
  }
};

// 보이는 범위 안에 있는 마커만 지도에 표시
function updateMarkersInView(map: naver.maps.Map, markers: naver.maps.Marker[]) {
  const mapBounds = map.getBounds();  // 현재 지도 범위 가져오기

  markers.forEach(marker => {
    const position = marker.getPosition();

    // 현재 지도 영역에 마커의 위치가 포함되면 지도에 표시, 아니면 숨김
    if (mapBounds.hasPoint(position)) {
      marker.setMap(map);  // 범위 내에 있으면 지도에 표시
    } else {
      marker.setMap(null);  // 범위 밖에 있으면 지도에서 제거
    }
  });
}
