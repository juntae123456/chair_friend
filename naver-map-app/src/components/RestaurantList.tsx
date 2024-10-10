import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Checkbox, FormControlLabel, Chip, Button } from '@mui/material';

const restaurants = [
  {
    location: '부산시/해운대구',
    name: '롯데리아',
    type: '양식',
    features: ['주차가능', '화장실'],
    time: '10:00 ~ 01:00',
    breakTime: null,
    closed: false,
  },
  {
    location: '부산시/해운대구',
    name: '국수 나무',
    type: '한식',
    features: [],
    time: '휴무',
    breakTime: null,
    closed: true,
  },
  {
    location: '부산시/해운대구',
    name: '초밥집',
    type: '일식',
    features: ['주차가능', '화장실'],
    time: '10:00 ~ 01:00',
    breakTime: '15:00 ~ 17:00',
    closed: false,
  },
];

const RestaurantList: React.FC = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {restaurants.map((restaurant, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

              {/* 체크박스와 지역 */}
              <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: '30px', minWidth: '150px' }}>
                <FormControlLabel control={<Checkbox />} label="" />
                <Typography variant="h6">{restaurant.location}</Typography>
              </Box>

              {/* 가게 이름과 영업 시간 */}
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, minWidth: '200px' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {restaurant.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, marginTop: '5px' }}>
                    <Chip label={restaurant.type} variant="outlined" />
                    {restaurant.features.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {restaurant.features.map((feature, i) => (
                          <Chip label={feature} variant="outlined" key={i} />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Box>

                {/* 영업 시간 */}
                <Box sx={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {restaurant.closed ? '휴무' : `영업 시간: ${restaurant.time}`}
                  </Typography>
                  {restaurant.breakTime && (
                    <Typography variant="body2">
                      <strong>브레이크 타임:</strong> {restaurant.breakTime}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>

            {/* 조회 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '100px' }}>
              <Button variant="contained" color="primary">
                조회
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RestaurantList;
