import { ArchiveManager } from "@components/archiveManager";
//import { Course } from '@types/Course'
import type DataSchema from "@components/archiveManager/types";
import toast from "react-hot-toast";
import * as BackendAPI from "@src/backendAPI";

let ARCHIVE_SCHEMA: DataSchema[] = [
  {
    id: "1",
    name: "code",
    title: "Codigo",
    description: "number",
    inputType: "number",
    readonlyIfExist: true,
  },
  {
    id: "2",
    name: "name",
    title: "Nombre",
    description: "string",
    inputType: "text",
    //inputType: 'date',
    required: true,
  },
  {
    id: "3",
    name: "description",
    title: "Descripcion",
    description: "string",
    width: 200,
    inputType: "text",
    required: true,
  },
];
export default function Courses() {
  return (
    <div>
      <ArchiveManager
        title="Programa"
        dataSchema={ARCHIVE_SCHEMA}
        get={async () => {
          return await BackendAPI.programAPI.getPrograms();
        }}
        edit={(data: any, dataAll: any) => {
          BackendAPI.programAPI
            .updateProgram(data, data.id)
            .then((res) => {
              console.log(res);
              toast.success("Programa actualizado");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error al actualizar Programa");
            });
        }}
        delete={(data: any, dataAll: any) => {
          BackendAPI.programAPI
            .deleteProgram(data.id)
            .then((res) => {
              console.log(res);
              toast.success("Programa borrado");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error al borrar Programa");
            });
        }}
        add={async (data: any) => {
          try {
            let result = await BackendAPI.programAPI.createProgram(data);
            if (result) {
              toast.success("Programa creado");
            } else {
              toast.error("Error al crear Programa");
            }
          } catch (err) {
            toast.error("Error al crear Programa ERR: " + err);
          }
        }}
      />
    </div>
  );
}
