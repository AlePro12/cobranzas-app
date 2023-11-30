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
const paymentPrint = ({ paymentMethod, amount, reference, enrollmentId }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
              <Typography variant="h6">Recibo de pago</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Método de pago: {paymentMethod}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Monto: {amount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Referencia: {reference}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Id de inscripción: {enrollmentId}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default paymentPrint;
