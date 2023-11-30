import React, { useState, useRef } from "react";
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
const ReportPrintEnroll = ({}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [enrollments, setEnrollments] = React.useState<any[]>([]);
  const fetchEnrollments = async () => {
    try {
      const data = await BackendAPI.enrollmentAPI.getEnrollments();
      setEnrollments(data);
    } catch (error) {
      toast.error("Error al cargar inscripciones");
    }
  };
  React.useEffect(() => {
    fetchEnrollments();
  }, []);
  return (
    <div>
      <Button type="primary" icon={<PrintIcon />} onClick={handlePrint}>
        Imprimir
      </Button>

      <Box ref={componentRef}>
        <Container maxWidth="sm">
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
              <Typography variant="h6">Reporte de Inscripciones</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Estudiante</TableCell>
                      <TableCell>Fecha de Inicio</TableCell>
                      <TableCell>Fecha de Fin</TableCell>
                      <TableCell>Pagado</TableCell>
                      <TableCell>Monto Total</TableCell>
                    </TableRow>
                  </TableHead>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>{enrollment.id}</TableCell>
                      <TableCell>
                        {enrollment.student.name +
                          " " +
                          enrollment.student.surname}{" "}
                      </TableCell>
                      <TableCell>
                        {moment(enrollment.course.periodStart).format(
                          "DD/MM/YYYY"
                        )}
                      </TableCell>
                      <TableCell>
                        {moment(enrollment.course.periodEnd).format(
                          "DD/MM/YYYY"
                        )}
                      </TableCell>
                      <TableCell>{enrollment.AmountPayed}</TableCell>
                      <TableCell>{enrollment.course.price}</TableCell>
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

export default ReportPrintEnroll;
