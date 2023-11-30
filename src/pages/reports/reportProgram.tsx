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
const ReportPrintPrograms = ({}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [Programs, setPrograms] = React.useState<any | null>(null);
  const fetchProgram = async () => {
    try {
      const data = await BackendAPI.programAPI.getPrograms();
      setPrograms(data);
    } catch (error) {
      toast.error("Error al cargar Programas");
    }
  };
  React.useEffect(() => {
    fetchProgram();
  }, []);

  /*
{
    "id": 1,
    "code": "01",
    "description": "CURSO",
    "name": "PROGRAMA GERENCIAL "
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
              <Typography variant="h6">Reporte de Programas</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Descripcion</TableCell>
                      <TableCell>Codigo</TableCell>
                    </TableRow>
                  </TableHead>
                  {Programs?.map((Program: any) => (
                    <TableRow key={Program.id}>
                      <TableCell>{Program.id}</TableCell>
                      <TableCell>{Program.name}</TableCell>
                      <TableCell>{Program.description}</TableCell>
                      <TableCell>{Program.code}</TableCell>
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

export default ReportPrintPrograms;
