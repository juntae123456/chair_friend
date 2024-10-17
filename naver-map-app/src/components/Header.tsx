import React, { useState } from 'react';
import { AppBar, Toolbar, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NaverLogin from './NaverLogin'; // NaverLogin 컴포넌트 import

const Header: React.FC = () => {
  const [getToken, setGetToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fa76d0dd921ca9854892a51fb1bf9dafbfa6397d8d375d702a7c06513c0c8d4"
            alt="Logo"
            style={{ width: 90, marginRight: 10, marginTop: 10 }}
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/979edae1dcf047805473693709d5064ae442a83396d11c2b21bbeb368056a7e7"
            alt="Logo name"
            style={{ width: 190, marginRight: 10 }}
          />
        </div>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <TextField
            placeholder="지역으로 검색하기.."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: { 
                backgroundColor: '#939191',
                borderRadius: '50px',
                width: '270px',
                height: '40px',
              }
            }}
            sx={{
              marginRight: '20px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
              '& .MuiInputBase-input': {
                color: 'black',
              },
            }}
          />
          <NaverLogin setGetToken={setGetToken} setUserInfo={setUserInfo} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
