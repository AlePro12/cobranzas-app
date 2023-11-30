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
const ReportPrintCourses = ({}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [Courses, setCourses] = React.useState<any | null>(null);
  const fetchCourse = async () => {
    try {
      const data = await BackendAPI.courseAPI.getCourses();
      setCourses(data);
    } catch (error) {
      toast.error("Error al cargar Cursos");
    }
  };
  React.useEffect(() => {
    fetchCourse();
  }, []);

  /*
  {
    "id": 1,
    "code": "01",
    "periodStart": "2023-11-30T04:00:00.000Z",
    "periodEnd": "2023-11-30T04:00:00.000Z",
    "price": 100,
    "program": {
        "id": 1,
        "code": "01",
        "description": "CURSO",
        "name": "PROGRAMA GERENCIAL "
    },
    "programId": 1
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
              <Typography variant="h6">Reporte de Cursos</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Codigo</TableCell>
                      <TableCell>Periodo de Inicio</TableCell>
                      <TableCell>Periodo de Fin</TableCell>
                      <TableCell>Precio</TableCell>
                      <TableCell>Programa</TableCell>
                    </TableRow>
                  </TableHead>
                  {Courses?.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.id}</TableCell>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>
                        {moment(course.periodStart).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(course.periodEnd).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>{course.price}</TableCell>
                      <TableCell>{course.program.name}</TableCell>
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

export default ReportPrintCourses;
