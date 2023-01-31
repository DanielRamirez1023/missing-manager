import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import CardHome from "../components/CardHome";

function Home() {
  const pharmacys: Array<string> = ["lavie vital", "maxifel", "maxi rios"];
  return (
    <section className="flex flex-col mt-32  sm:mt-40 text-center">
      <Typography className="mb-10 sm:mx-0 mx-3 font-bold text-4xl text-white">
        Seleccione la Drogeria a gestionar
      </Typography>
      <div className="flex flex-col sm:flex-row  gap-4  items-center sm:justify-center">
        {pharmacys.map((name) => (
          <Link to={`menu/${name}`} key={name}>
            <CardHome text={name} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Home;
