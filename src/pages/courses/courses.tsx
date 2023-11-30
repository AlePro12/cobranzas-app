import { ArchiveManager } from "@components/archiveManager";
//import { Course } from '@types/Course'
import type DataSchema from "@components/archiveManager/types";
import toast from "react-hot-toast";
import * as BackendAPI from "@src/backendAPI";

let PROGRAMS_OPTIONS: any[] = [];
let COURSE_ARCHIVE_SCHEMA: DataSchema[] = [];
(async () => {
  const programs = await BackendAPI.programAPI.getPrograms();
  PROGRAMS_OPTIONS = programs.map((program) => {
    return { value: program.id, label: program.name };
  });
  COURSE_ARCHIVE_SCHEMA = [
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
      name: "programId",
      title: "Programa",
      description: "string",
      width: 200,
      options: PROGRAMS_OPTIONS,
      valueGetter: (params: any) => {
        return params.row.program.name;
      },
      inputType: "select",
      required: true,
    },
    {
      id: "3",
      name: "periodStart",
      title: "Periodo Inicio",
      description: "string",
      //inputType: "text",
      inputType: "date",
      required: true,
    },
    {
      id: "4",
      name: "periodEnd",
      title: "Periodo Fin",
      description: "string",
      //inputType: "text",
      inputType: "date",
      required: true,
    },
    {
      id: "5",
      name: "price",
      title: "Precio",
      description: "number",
      inputType: "number",
      required: true,
    },
  ];
})();
export default function Courses() {
  return (
    <div>
      <ArchiveManager
        title="Cursos"
        dataSchema={COURSE_ARCHIVE_SCHEMA}
        get={async () => {
          return await BackendAPI.courseAPI.getCourses();
        }}
        edit={(data: any, dataAll: any) => {
          BackendAPI.courseAPI
            .updateCourse(data, data.id)
            .then((res) => {
              console.log(res);
              toast.success("Curso actualizado");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error al actualizar curso");
            });
        }}
        delete={(data: any) => {
          BackendAPI.courseAPI
            .deleteCourse(data.id)
            .then((res) => {
              console.log(res);
              toast.success("Curso borrado");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error al borrar curso");
            });
        }}
        add={async (data: any) => {
          try {
            let result = await BackendAPI.courseAPI.createCourse(data);
            console.log("🚀 ~ file: courses.tsx:78 ~ add={ ~ result:", result);
            if (result) {
              toast.success("Curso creado");
            } else {
              toast.error("Error al crear curso");
            }
          } catch (err) {
            console.log("🚀 ~ file: courses.tsx:84 ~ add={ ~ err:", err);
            toast.error("Error al crear curso ERR: " + err);
          }
        }}
      />
    </div>
  );
}
