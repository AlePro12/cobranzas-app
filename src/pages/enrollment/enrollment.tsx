import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";

import * as BackendAPI from "@src/backendAPI";
import moment from "moment";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import nicemodal from "@ebay/nice-modal-react";
import PayCRUD from "./pay";
import PrintPayment from "@src/components/printPayment";
import PrintEnroll from "@src/components/printEnroll";
export default function Enrollment() {
  const [cedula, setCedula] = React.useState<string>("");
  const [student, setStudent] = React.useState<any | null>(null);
  const [courses, setCourses] = React.useState<any[]>([]);
  const [enrollments, setEnrollments] = React.useState<any[]>([]);
  const [openPrint, setOpenPrint] = React.useState<boolean>(false);
  const [payments, setPayments] = React.useState<any[]>([]);
  const [curseSelected, setCurseSelected] = React.useState<string | null>(null); //getEnrollments
  const printarea = React.useRef<HTMLDivElement>(null);
  const [cachePayments, setCachePayments] = React.useState<any[]>({
    paymentMethod: "",
    amount: 0,
    ref: "",
    enrollmentId: "",
  }); //getEnrollments
  const [cacheEnrollment, setCacheEnrollment] = React.useState<any[]>(null);
  const [openPrintEnroll, setOpenPrintEnroll] = React.useState<boolean>(false);
  const fetchCourses = async () => {
    try {
      const data = await BackendAPI.courseAPI.getCourses();
      setCourses(data);
    } catch (error) {
      toast.error("Error al cargar cursos");
    }
  };
  const fetchEnrollments = async () => {
    try {
      const data = await BackendAPI.enrollmentAPI.getEnrollments();
      setEnrollments(data);
    } catch (error) {
      toast.error("Error al cargar inscripciones");
    }
  };
  const fetchPayments = async () => {
    try {
      const data = await BackendAPI.paymentAPI.getPayments();
      setPayments(data);
    } catch (error) {
      toast.error("Error al cargar pagos");
    }
  };

  React.useEffect(() => {
    fetchCourses();
    fetchEnrollments();
    fetchPayments();
  }, []);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xl={6} xs={12} md={6}>
          <Card>
            <CardHeader title="Inscribir" />
            <CardContent>
              <Stack direction="row" spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Cedula"
                  variant="outlined"
                  onChange={(e) => setCedula(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    BackendAPI.studentAPI.getStudents().then((students) => {
                      let student = students.find((s) => s.dni == cedula);
                      if (student) {
                        setStudent(student);
                        toast.success("Estudiante encontrado");
                      } else {
                        toast.error("Estudiante no encontrado");
                      }
                    });
                  }}
                >
                  Buscar
                </Button>
              </Stack>
              {student && (
                <Box sx={{}}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ mr: 2 }}>{student.name[0]}</Avatar>
                    <div>
                      <h4>{student.name}</h4>
                      <p>{student.email}</p>
                    </div>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack direction="row" spacing={2}>
                    <Select
                      value={curseSelected}
                      onChange={(e) => setCurseSelected(e.target.value)}
                      variant="outlined"
                      sx={{ width: "60%" }}
                    >
                      {courses
                        .filter(
                          (course) =>
                            !enrollments.find(
                              (enrollment) =>
                                enrollment.StudentId == student.id &&
                                enrollment.CourseId == course.id
                            )
                        )
                        .map((course) => (
                          <MenuItem value={course.id}>
                            {course?.program?.name}{" "}
                            {moment(course?.periodStart).format("DD/MM/YYYY")}-{" "}
                            {moment(course?.periodEnd).format("DD/MM/YYYY")}
                          </MenuItem>
                        ))}
                    </Select>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        BackendAPI.enrollmentAPI
                          .createEnrollment({
                            CourseId: curseSelected,
                            StudentId: student.id,
                            paid: 0,
                          })
                          .then(async (f) => {
                            console.log(
                              "🚀 ~ file: enrollment.tsx:124 ~ .then ~ f:",
                              f
                            );
                            if (f) {
                              await fetchEnrollments();
                              //get enrollment id
                              const thisEnrollment =
                                await BackendAPI.enrollmentAPI.getEnrollment(
                                  f.data.id
                                );
                              console.log(
                                "🚀 ~ file: enrollment.tsx:164 ~ .then ~ thisEnrollment:",
                                thisEnrollment,
                                f
                              );
                              toast.success("Inscripcion creada");
                              setOpenPrintEnroll(true);
                              setCacheEnrollment(thisEnrollment);
                            } else {
                              toast.error("Error al crear inscripcion");
                            }
                          })
                          .catch((e) => {
                            console.log(
                              "🚀 ~ file: enrollment.tsx:174 ~ Enrollment ~ e:",
                              e
                            );

                            toast.error("Error al crear inscripcion");
                          });
                      }}
                    >
                      Inscribir
                    </Button>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={6} md={6}>
          {student && (
            <Card>
              <CardHeader title="Cursos" />
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <DataGrid
                    rows={
                      enrollments.filter(
                        (enrollment) => enrollment.StudentId == student.id
                      ) || []
                    }
                    autoHeight
                    columns={[
                      { field: "id", headerName: "ID", width: 70 },
                      {
                        field: "courseId",
                        headerName: "Curso",
                        width: 380,
                        valueGetter: (params) => {
                          return (
                            params.row.course?.program?.name +
                            " " +
                            moment(params.row.course?.periodStart).format(
                              "DD/MM/YYYY"
                            ) +
                            " - " +
                            moment(params.row.course?.periodEnd).format(
                              "DD/MM/YYYY"
                            )
                          );
                        },
                      },

                      {
                        field: "AmountPayed",
                        headerName: "Pagado",
                        width: 80,
                        valueGetter: (params) => {
                          return params.row.AmountPayed || 0;
                        },
                      },
                      {
                        field: "AmountDebt",
                        headerName: "Adeudado",
                        width: 80,
                        valueGetter: (params) => {
                          return (
                            (params.row.AmountPayed | 0) -
                              params.row.course?.price || 0
                          );
                        },
                      },
                      {
                        field: "price",
                        headerName: "Precio",
                        width: 80,
                        valueGetter: (params) => {
                          return params.row.course?.price || 0;
                        },
                      },
                    ]}
                    rowsPerPageOptions={[5]}
                    onCellDoubleClick={(params) => {
                      //ignore prettier
                      // @ts-ignore
                      nicemodal.show(PayCRUD, {
                        enrollment: params.row,
                        price: params.row.course?.price || 999,
                        onSave: (payment) => {
                          console.log(
                            "🚀 ~ file: enrollment.tsx:189 ~ Enrollment ~ payment:",
                            payment
                          );
                          BackendAPI.paymentAPI
                            .createPayment(payment)
                            .then((f) => {
                              console.log(
                                "🚀 ~ file: enrollment.tsx:190 ~ BackendAPI.paymentAPI.createPayment ~ f:",
                                f
                              );
                              if (f) {
                                fetchEnrollments();
                                toast.success("Pago creado");
                                setOpenPrint(true);
                                setCachePayments(payment);
                              } else {
                                toast.error("Error al crear pago");
                              }
                            })
                            .catch((r) => {
                              console.log(
                                "🚀 ~ file: enrollment.tsx:200 ~ Enrollment ~ r:",
                                r
                              );

                              toast.error("Error al crear pago Error: " + r);
                            });
                        },
                      });
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
      <Dialog open={openPrint} onClose={() => setOpenPrint(false)}>
        <DialogTitle>Imprimir</DialogTitle>
        <DialogContent>
          <PrintPayment
            paymentMethod={cachePayments.paymentMethod}
            amount={cachePayments.amount}
            reference={cachePayments.ref}
            enrollmentId={cachePayments.enrollmentId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrint(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openPrintEnroll} onClose={() => setOpenPrintEnroll(false)}>
        <DialogTitle>Imprimir</DialogTitle>
        <DialogContent>
          <PrintEnroll enroll={cacheEnrollment} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrintEnroll(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
