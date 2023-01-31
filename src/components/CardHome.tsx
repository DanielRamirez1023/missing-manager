import { Card } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import React from "react";

interface Props {
  text: string;
}

function CardHome({ text }: Props) {
  return (
    <div>
      <Card
        variant="outlined"
        className=" flex w-40 h-32 flex-col justify-center items-center cursor-pointer shadow-lg hover:shadow-none"
        id="card"
      >
        <StoreIcon fontSize="large" />
        {text}
      </Card>
    </div>
  );
}

export default CardHome;
