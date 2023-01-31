import React from "react";
// import { useAppContext } from "../context/GlobalContext";
// import { useTable } from "react-table";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

import { Tabla } from "../components/Table";
import { readMissings } from "../DataBase";
import { CircularProgress } from "@mui/material";
function ListMissings() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [objetos, setObjetos] = React.useState<object[]>([]);
  // const { missings, addMissing } = useAppContext();
  const { name } = useParams<string>();

  React.useEffect(() => {
    readMissings(name).then((value) => setObjetos(value));
  }, [objetos, name]);

  setTimeout(function () {
    setLoading(true);
  }, 500);

  // se esta trabajando con react table
  const data = React.useMemo(() => objetos, [objetos]);

  const columns: any = React.useMemo(
    () => [
      {
        Header: "fecha de creacion",
        accessor: "date",
      },
      {
        Header: "Faltante",
        accessor: "medicine", // accessor is the "key" in the data
      },
      {
        Header: "Cantidad existente",
        accessor: "existingAmount",
      },
    ],
    []
  );

  return (
    <section className="flex flex-col mt-10 bg-white mx-1 px-3  sm:w-3/5 py-4 sm:p-4 sm:mx-auto rounded ">
      <div className="flex ">
        <Link to={`/menu/${name}`}>
          <KeyboardBackspaceRoundedIcon className="mr-24 sm:mr-72" />
        </Link>
        <h1 className=" font-bold text-3xl mb-4 border-b-4 border-blue-500">
          {name}
        </h1>
      </div>
      {!loading ? (
        <CircularProgress className="mx-auto my-10" />
      ) : objetos.length > 0 ? (
        <Tabla columns={columns} data={data} name={name} />
      ) : (
        <h1 className="text-center font-bold">no hay faltantes registrados</h1>
      )}
    </section>
  );
}

export default ListMissings;
