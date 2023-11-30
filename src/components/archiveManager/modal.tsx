import React from "react";
import type DataSchema from "./types";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import moment from "moment";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  TextField,
  Box,
  Grid,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Container,
  Slide, //select
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";

import { TransitionProps } from "@material-ui/core/transitions";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type props = {
  DataSchema: DataSchema[]; //object any
  data: any;
  new: boolean;
  onSave: Function;
};

const ModalCRUD = NiceModal.create((props) => {
  const modal = useModal();
  const [newData, setNewData] = React.useState<any>(props.data);
  React.useEffect(() => {
    setNewData(props.data);
  }, [modal.visible]);
  return (
    <Dialog
      TransitionComponent={Transition}
      open={modal.visible}
      onClose={() => modal.hide()}
      TransitionProps={{
        onExited: () => modal.remove(),
      }}
    >
      <DialogTitle>{"Agregar/Modificar"}</DialogTitle>
      <DialogContent>
        {props.DataSchema.map((item) => {
          if (item.inputType == "text") {
            return (
              <TextField
                autoFocus
                margin="dense"
                id={item.name}
                label={item.title}
                type={item.type}
                required={item.required}
                value={newData[item.name]}
                onChange={(e) => {
                  setNewData({ ...newData, [item.name]: e.target.value });
                }}
                fullWidth
              />
            );
          } else if (item.inputType == "number") {
            return (
              <TextField
                autoFocus
                margin="dense"
                id={item.id}
                label={item.title}
                type={item.type}
                fullWidth
                value={newData[item.name]}
                required={item.required}
                readOnly={item.readonlyIfExist ? newData[item.name] : false}
                onChange={(e) => {
                  setNewData({ ...newData, [item.name]: e.target.value });
                }}
              />
            );
          } else if (item.inputType == "date") {
            return (
              <DatePicker
                onChange={(newValue) => {
                  console.log(
                    "🚀 ~ file: modal.tsx:76 ~ {props.DataSchema.map ~ newValue:",
                    newValue
                  );
                  setNewData({
                    ...newData,
                    [item.name]: moment(newValue).format("YYYY-MM-DD"),
                  });
                }}
                defaultValue={
                  newData[item.name] ? dayjs(newData[item.name]) : null
                }
                format="YYYY-MM-DD"
              />
            );
          } else if (item.inputType == "select") {
            console.log(
              "🚀 ~ file: modal.tsx:76 ~ {props.DataSchema.map ~ item:",
              item
            );
            return (
              <FormControl fullWidth>
                <InputLabel id={item.id}>{item.title}</InputLabel>
                <Select
                  labelId={item.id}
                  id={item.id}
                  label={item.title}
                  value={newData[item.name]}
                  onChange={(e) => {
                    setNewData({ ...newData, [item.name]: e.target.value });
                  }}
                >
                  {item.options.map((option) => {
                    return (
                      <MenuItem value={option.value}>{option.label}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            );
          } else if (item.inputType == "checkbox") {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    id={item.id}
                    defaultChecked={item.defaultChecked}
                    color="primary"
                  />
                }
                label={item.label}
              />
            );
          } else if (item.inputType == "radio") {
            //si no es array
            return (
              <FormControl component="fieldset">
                <FormLabel component="legend">{item.label}</FormLabel>
                <RadioGroup
                  row
                  aria-label={item.id}
                  name={item.id}
                  defaultValue={item.defaultValue}
                >
                  {item.options.map((option) => {
                    return (
                      <FormControlLabel
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            );
          }
        })}
      </DialogContent>
      <DialogActions>
        {!props.new ? (
          <Button
            onClick={() => {
              props.onDelete(newData);
              modal.hide();
            }}
            color="error"
          >
            BORRAR
          </Button>
        ) : null}
        <Button onClick={() => modal.hide()} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            //check required
            let error = false;
            props.DataSchema.map((item) => {
              if (item.required && !newData[item.name]) {
                error = true;
              }
            });
            if (error) {
              alert("Faltan datos requeridos");
              return;
            }
            let dataPurge: any[] = newData;
            props.DataSchema.map((item) => {
              if (item.inputType == "date") {
                dataPurge[item.name] = moment(newData[item.name]).format(
                  "YYYY-MM-DD"
                );
              }
            });
            props.onSave(dataPurge);
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

export default ModalCRUD;

//NiceModal.show(MyMuiDialog)
