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
const ReportPrintPayments = ({}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [Payments, setPayments] = React.useState<any | null>(null);
  const fetchPayment = async () => {
    try {
      const data = await BackendAPI.paymentAPI.getPayments();
      setPayments(data);
    } catch (error) {
      toast.error("Error al cargar Pagos");
    }
  };
  React.useEffect(() => {
    fetchPayment();
  }, []);

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
              <Typography variant="h6">Reporte de Pagos</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Metodo de Pago</TableCell>
                      <TableCell>Monto</TableCell>
                      <TableCell>Referencia</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Estudiante</TableCell>
                      <TableCell>Curso</TableCell>
                    </TableRow>
                  </TableHead>
                  {Payments?.map((payment: any) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.id}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.ref}</TableCell>
                      <TableCell>
                        {moment(payment.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {payment.enrollment.student.name +
                          " " +
                          payment.enrollment.student.surname}
                      </TableCell>
                      <TableCell>
                        {payment.enrollment.course.program.name}
                      </TableCell>
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

export default ReportPrintPayments;
