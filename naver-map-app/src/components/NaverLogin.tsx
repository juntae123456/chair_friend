import React, { useEffect, useRef } from 'react';

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

  const { naver } = window;
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID; // 환경 변수 사용
  const NAVER_CALLBACK_URL = process.env.REACT_APP_IP_API_KEY; // 환경 변수 사용

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
      <img 
        src="https://ifh.cc/g/XA1Nqv.png" 
        alt="네이버 로그인" 
        onClick={handleCustomLoginClick} 
        style={{ cursor: 'pointer', width: 'auto', height: '40px' }} 
      />
    </div>
  );
};

export default NaverLogin;
