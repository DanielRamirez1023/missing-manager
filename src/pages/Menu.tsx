import { Button, Card, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useParams } from "react-router-dom";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { Link } from "react-router-dom";
import React from "react";

function Menu() {
  const { name } = useParams();
  return (
    <section className="flex  justify-center  mt-32  my-3 text-white sm:mt-40 ">
      <Card className="flex flex-col gap-5 text-center p-10">
        <div className="text-left">
          <Link to={"/"}>
            <KeyboardBackspaceRoundedIcon />
          </Link>
        </div>
        <Typography variant="h4">{name}</Typography>
        <Link to={`/menu/${name}/addmissing`}>
          <Button variant="contained" endIcon={<AddBoxIcon />}>
            Agregar Faltantes
          </Button>
        </Link>
        <Link to={`/menu/${name}/listmissing`}>
          <Button variant="contained" endIcon={<FormatListBulletedIcon />}>
            Lista de faltantes
          </Button>
        </Link>
      </Card>
    </section>
  );
}

export default Menu;
