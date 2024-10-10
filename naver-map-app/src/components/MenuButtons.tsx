import {useState} from "react";
import {Box, Button} from "@mui/material";

interface MenuButtonsProps {
  onFetchWheelchairStations: () => void; // 반드시 필요한 프롭
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onFetchWheelchairStations }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (buttonLabel: string) => {
    setActiveButton(buttonLabel);

    if (buttonLabel === '휠체어 충전소') {
      onFetchWheelchairStations();
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', my: 2, ml: '5px' }}>
      {['홈', '휠체어 충전소', '식당', '카페', '저상 버스 위치'].map((label) => (
        <Button
          key={label}
          onClick={() => handleClick(label)}
          sx={{
            position: 'relative',
            padding: '10px 20px',
            '&:hover::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: 'black',
            },
            ...(activeButton === label && {
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                backgroundColor: 'black',
              },
            }),
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default MenuButtons;
