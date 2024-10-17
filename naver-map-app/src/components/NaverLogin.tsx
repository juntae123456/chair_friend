import React, { useEffect, useRef, useState } from 'react';

interface NaverLoginProps {
  setGetToken: (token: string) => void;
  setUserInfo: (userInfo: any) => void;
}

declare global {
  interface Window {
    naver: any;
  }
}

const NaverLogin: React.FC<NaverLoginProps> = ({ setGetToken, setUserInfo }) => {
  const naverRef = useRef<HTMLDivElement | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const { naver } = window;
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID || ''; // 환경 변수 사용
  const NAVER_CALLBACK_URL = process.env.REACT_APP_IP_API_KEY || 'http://localhost:3000'; // 기본값 설정

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();

    naverLogin.getLoginStatus((status: boolean) => {
      if (status) {
        const userInfo = naverLogin.user;
        setUserInfo(userInfo);
        setProfile(userInfo);
        setIsLoggedIn(true);
        console.log('Login successful:', userInfo);
      } else {
        console.log('Login failed or not logged in');
      }
    });
  };

  const userAccessToken = () => {
    if (window.location.href.includes('access_token')) {
      getToken();
    }
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    console.log('Access token:', token);
    setGetToken(token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfile(null);
    setGetToken('');
    setUserInfo(null);
    console.log('User logged out successfully'); // 로그아웃 성공 시 로그 출력
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);

  const handleCustomLoginClick = () => {
    if (naverRef.current) {
      const loginButton = naverRef.current.querySelector('a');
      if (loginButton) {
        loginButton.click();
      }
    }
  };

  return (
    <div>
      <div ref={naverRef} id="naverIdLogin" style={{ display: 'none' }} />
      {!isLoggedIn ? (
        <img 
          src="https://ifh.cc/g/XA1Nqv.png" 
          alt="네이버 로그인" 
          onClick={handleCustomLoginClick} 
          style={{ cursor: 'pointer', width: 'auto', height: '40px' }} 
        />
      ) : (
        <div style={{ 
          display: 'flex',  // 컨테이너를 flex로 설정하여 내부 요소들을 유연하게 배치
          alignItems: 'center',  // 세로 축에서 요소들을 중앙 정렬
          justifyContent: 'space-between', // 가로 축에서 요소들을 양 끝으로 분산 배치
          border: '1px solid #ccc',  // 1픽셀 두께의 연한 회색 테두리 설정
          padding: '10px 20px',  // 상하 10px, 좌우 20px의 내부 여백 설정
          borderRadius: '30px',  // 30픽셀의 둥근 모서리 설정
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 약간의 그림자 효과 추가
          maxWidth: '300px', // 최대 너비를 300픽셀로 제한
          margin: '0 auto' // 상하 여백 없이 좌우 중앙 정렬
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={profile?.profile_image} alt="Profile" style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />
            <span style={{ fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile?.nickname}님</span>
          </div>
          <div style={{ width: '1px', height: '20px', backgroundColor: '#ccc', margin: '0 10px' }} />
          <button 
            onClick={handleLogout} 
            style={{ 
              cursor: 'pointer', 
              background: 'none', 
              border: 'none', 
              color: '#03C75A', 
              fontWeight: 'bold', 
              fontSize: '14px', 
              padding: '5px 10px', 
              borderRadius: '5px', 
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E8F5E9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default NaverLogin;
