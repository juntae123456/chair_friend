const naverMapClientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;

if (naverMapClientId) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapClientId}&submodules=geocoder`;
    script.defer = true;
    script.onload = () => console.log('Naver Maps script loaded successfully');
    script.onerror = () => console.error('Failed to load Naver Maps script');
    document.head.appendChild(script);
} else {
    console.error('Naver Map Client ID is not defined in environment variables.');
}
