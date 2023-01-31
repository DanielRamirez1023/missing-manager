import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
// import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { useAppContext } from "../context/GlobalContext";
import { addMissings } from "../DataBase";
// import { GlobalContext } from "../context/GlobalContext";
import { MyFormValues } from "../schema/schemas";

function FormMissing() {
  // const { addMissing } = useAppContext();
  const { name } = useParams<string>();
  const navigate = useNavigate();
  // const [save, setSave] = useState<Boolean>(false);
  // const initialMissings: Array<MyFormValues> = [];
  // const [missings, setMissings] = useState(initialMissings);

  // const saveMissing = (values: MyFormValues) => {
  //   addMissing(values);

  //   // setSave(true);
  // };

  function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  const opciones: object = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "America/Mexico_City",
  };
  const fecha = new Date();
  // estado inicial del formulario
  const FormInitialValues: MyFormValues = {
    id: generateUUID(),
    medicine: "",
    existingAmount: 0,
    date: fecha.toLocaleDateString("es", opciones),
    complete: false,
  };

  // necesita un objeto con dos atributos
  const formik = useFormik({
    initialValues: FormInitialValues,
    onSubmit: (values) => {
      addMissings(values, name);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Se ha guardado el faltante correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/menu/${name}`);
    },
  });

  return (
    <>
      <form className="flex flex-col gap-8 mt-5" onSubmit={formik.handleSubmit}>
        <TextField
          label="medicamento"
          id="medicine"
          type={"text"}
          onChange={formik.handleChange}
          required
        />
        <TextField
          label="cantidad existente"
          id="existingAmount"
          type={"number"}
          onChange={formik.handleChange}
          required
        />
        <Button type="submit" variant="contained">
          Guardar
        </Button>
      </form>
    </>
  );
}

export default FormMissing;
