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
} from "@mui/material";
//react-to-print
import Logo from "./cobranzaLogo";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";

const EnrollPrint = ({ enroll }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  if (!enroll) return null;

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
              <Typography variant="h6">Comprobante de Inscripción</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Estudiante: {enroll.student.name + " " + enroll.student.surname}
              </Typography>
              <Typography variant="body1">
                {enroll.student.dniType}: {enroll.student.dni}
              </Typography>

              <Typography variant="body1">
                Programa: {enroll.course.program.name}
              </Typography>
              <Typography variant="body1">
                Curso: {enroll.course.code}
              </Typography>
              <Typography variant="body1">
                Fecha de Inicio: {enroll.course.periodStart}
              </Typography>
              <Typography variant="body1">
                Fecha de Fin: {enroll.course.periodEnd}
              </Typography>
              <Typography variant="body1">
                Monto: {enroll.course.price}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default EnrollPrint;
