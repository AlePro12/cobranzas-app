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
  Slide, //select
} from "@mui/material";
import type { StudentDTO } from "../../types/Student";
import type { EnrollmentDTO } from "../../types/Enrollment";
import type { PaymentDTO } from "../../types/Payment";
import { TransitionProps } from "@material-ui/core/transitions";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import React from "react";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PAYMENT_METHODS = ["PAGO MOVIL", "EFECTIVO", "ZELLE", "TRANSFERENCIA"];

const PayCRUD = NiceModal.create((props) => {
  const [pago, setPago] = React.useState<PaymentDTO>({
    enrollmentId: props.enrollment.id,
    code: Math.random().toString(36).substring(7),
  });
  const modal = useModal();
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <Dialog
      TransitionComponent={Transition}
      open={modal.visible}
      onClose={() => modal.hide()}
      TransitionProps={{
        onExited: () => modal.remove(),
      }}
    >
      <DialogTitle>Nuevo Pago</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Monto"
              type="number"
              fullWidth
              //max
              inputProps={{ min: 0, max: props.price }}
              value={pago.amount}
              onChange={(e) => setPago({ ...pago, amount: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="reference"
              label="Referencia"
              type="text"
              fullWidth
              value={pago.ref}
              onChange={(e) => setPago({ ...pago, ref: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="paymentMethod"
              id="paymentMethod"
              value={pago.paymentMethod}
              label="Método de pago"
              onChange={(e) =>
                setPago({ ...pago, paymentMethod: e.target.value })
              }
              fullWidth
            >
              {PAYMENT_METHODS.map((method) => (
                <MenuItem value={method}>{method}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => modal.hide()} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            if (!pago.amount || !pago.ref || !pago.paymentMethod) {
              toast.error("Debe llenar todos los campos");
              return;
            }
            if (pago.amount > props.price) {
              toast.error("El monto no puede ser mayor al precio");
              return;
            }
            props.onSave(pago);
            modal.hide();
          }}
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default PayCRUD;
