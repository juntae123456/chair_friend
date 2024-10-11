import { useState } from "react";
import { Box, Button } from "@mui/material";

interface MenuButtonsProps {
  onFetchWheelchairStations: () => void;
  onMenuClick?: (menu: string) => void; // 메뉴 클릭 핸들러 추가
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onFetchWheelchairStations, onMenuClick }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (buttonLabel: string) => {
    setActiveButton(buttonLabel);

    // '휠체어 충전소' 버튼 클릭 시 동작
    if (buttonLabel === "휠체어 충전소") {
      onFetchWheelchairStations();
    }

    // onMenuClick 콜백으로 메뉴 전달
    if (onMenuClick) {
      onMenuClick(buttonLabel);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "20px", my: 2, ml: "5px" }}>
      {["홈", "휠체어 충전소", "식당", "카페", "저상 버스 위치"].map((label) => (
        <Button
          key={label}
          onClick={() => handleClick(label)}
          sx={{
            position: "relative",
            padding: "10px 20px",
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "black",
            },
            ...(activeButton === label && {
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: "black",
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
