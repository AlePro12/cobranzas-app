import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import {
  Grid,
  Stack,
  Divider,
  TextField,
  Typography,
  Button,
  Container,
  Box,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
//react-to-print
import Logo from "../../components/cobranzaLogo";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import * as BackendAPI from "@src/backendAPI";
import moment from "moment";
const ReportPrintStudents = ({}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [students, setStudents] = React.useState<any | null>(null);
  const fetchStudent = async () => {
    try {
      const data = await BackendAPI.studentAPI.getStudents();
      setStudents(data);
    } catch (error) {
      toast.error("Error al cargar estudiante");
    }
  };
  React.useEffect(() => {
    fetchStudent();
  }, []);

  /*
  {
    "id": 1,
    "dni": "29752300",
    "dniType": "Cedula",
    "name": "Alejandro",
    "surname": "Sanchez",
    "phone1": "04126587502",
    "phone2": null,
    "email": "androsanchez12@gmail.com",
    "birthdate": "2023-11-30T04:00:00.000Z",
    "address": "CABIMAS",
    "studentEnrollments": [
       //count
    ]
}
*/
  return (
    <div>
      <Button type="primary" icon={<PrintIcon />} onClick={handlePrint}>
        Imprimir
      </Button>

      <Box ref={componentRef}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Logo />
                <Typography variant="h6">Cobranzas</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Reporte de Estudiantes</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Cedula</TableCell>
                      <TableCell>Fecha de Nacimiento</TableCell>
                      <TableCell>Telefono</TableCell>
                      <TableCell>Direccion</TableCell>
                      <TableCell>Cursos</TableCell>
                    </TableRow>
                  </TableHead>
                  {students?.map((student) => (
                    <TableRow
                      key={student.id}
                      sx={{
                        fontSize: 6,
                      }}
                    >
                      <TableCell>
                        {student.name + " " + student.surname}{" "}
                      </TableCell>
                      <TableCell>{student.dni}</TableCell>
                      <TableCell>
                        {moment(student.birthdate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>{student.phone1}</TableCell>
                      <TableCell>{student.address}</TableCell>
                      <TableCell>{student.studentEnrollments.length}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default ReportPrintStudents;
