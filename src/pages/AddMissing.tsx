import React from "react";
import FormMissing from "../components/FormMissing";
import { Link, useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
function AddMissing() {
  const { name } = useParams<string>();

  return (
    <section className="flex text-center mt-36 text-white justify-center ">
      <Card className="p-5">
        <div className="flex justify-between">
          <Link to={`/menu/${name}`}>
            <KeyboardBackspaceRoundedIcon />
          </Link>
          <h1 className="flex flex-row text-left gap-2 mb-5">
            <b>Drogeria:</b>
            <p>{name}</p>
          </h1>
        </div>
        <Typography variant="h4">Registro faltantes</Typography>
        <FormMissing />
      </Card>
    </section>
  );
}

export default AddMissing;
