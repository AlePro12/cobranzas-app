import { ArchiveManager } from "@components/archiveManager";
//import { Course } from '@types/Course'
import type DataSchema from "@components/archiveManager/types";
import toast from "react-hot-toast";

import * as BackendAPI from "@src/backendAPI";

let ARCHIVE_SCHEMA: DataSchema[] = [
  {
    id: "1",
    name: "dni",
    title: "Documento de identidad",
    description: "number",
    inputType: "number",
    readonlyIfExist: true,
    required: true,
  },
  {
    id: "2",
    name: "dniType",
    title: "Tipo de documento",
    description: "",
    inputType: "select",
    options: [
      { value: "Cedula", label: "Cedula" },
      { value: "Pasaporte", label: "Pasaporte" },
    ],
    required: true,
  },
  {
    id: "3",
    name: "name",
    title: "Nombre",
    description: "string",
    inputType: "text",
    //inputType: 'date',
    required: true,
  },
  {
    id: "4",
    name: "surname",
    title: "Apellido",
    description: "string",
    width: 200,
    inputType: "text",
    required: true,
  },

  {
    id: "5",
    name: "phone1",
    title: "Telefono 1",
    description: "string",
    width: 200,
    inputType: "text",
    required: true,
  },
  {
    id: "6",
    name: "phone2",
    title: "Telefono 2",
    description: "string",
    width: 200,
    inputType: "text",
  },
  {
    id: "7",
    name: "email",
    title: "Correo",
    description: "string",
    width: 200,
    inputType: "text",
    required: true,
  },
  {
    id: "8",
    name: "birthdate",
    title: "Fecha de nacimiento",
    description: "string",
    width: 200,
    inputType: "date",
    required: true,
  },
  {
    id: "9",
    name: "address",
    title: "Direccion",
    description: "string",
    width: 200,
    inputType: "text",
    required: true,
  },
];
export default function Students() {
  return (
    <div>
      <ArchiveManager
        title="Estudiantes"
        dataSchema={ARCHIVE_SCHEMA}
        get={async () => {
          return await BackendAPI.studentAPI.getStudents();
        }}
        delete={(data: any) => {
          BackendAPI.studentAPI
            .deleteStudent(data.id)
            .then((res) => {
              console.log(res);
              toast.success("Estudiante borrado");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error al borrar Estudiante");
            });
        }}
        edit={(data: any, dataAll: any) => {
          BackendAPI.studentAPI
            .updateStudent(data, data.id)
            .then((res) => {
              console.log(res);
              toast.success("Estudiantes actualizado");
            })
            .catch((err) => {
              toast.error("Error al actualizar Estudiante");
            });
        }}
        add={async (data: any) => {
          try {
            let result = await BackendAPI.studentAPI.createStudent(data);
            if (result) {
              toast.success("Estudiante creado");
            } else {
              toast.error("Error al crear Estudiante");
            }
          } catch (err) {
            console.log("🚀 ~ file: students.tsx:125 ~ add={ ~ err:", err);
            toast.error(
              "Error al crear Estudiante ERR: " +
                (err.response ? err.response.data.error : err)
            );
          }
        }}
      />
    </div>
  );
}
