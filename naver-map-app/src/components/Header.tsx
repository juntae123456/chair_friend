import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        <Button variant="outlined" sx={{ marginRight: '40px' }}>
          로그인
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
