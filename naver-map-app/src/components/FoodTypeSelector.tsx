import React from 'react';
import { Button, Box } from '@mui/material';

const FoodTypeSelector: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '15px', my: 2, ml: '10px' }}>
      {['한식', '일식', '중식', '양식', '기타'].map((label) => (
        <Button
          key={label}
          variant="contained"
          sx={{
            backgroundColor: 'rgba(65, 243, 33, 0.5)', // #41F321 색상, 투명도 50%
            '&:hover': {
              backgroundColor: 'rgba(65, 243, 33, 0.7)', // 호버 시 약간 더 진한 색상
            },
            border: 'none', // 구분선 제거
            width: '77px', // 너비 77px
            height: '30px', // 높이 30px
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default FoodTypeSelector;
