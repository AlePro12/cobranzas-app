import * as React from 'react'
import type DataSchema from './types'
import nicemodal from '@ebay/nice-modal-react'
import ModalCRUD from './modal'
import toast from 'react-hot-toast'

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
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
  Container
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
type props = {
  children: React.ReactNode
  title: string
  get: Function
  edit: Function
  delete: Function
  add: Function
  dataSchema: DataSchema[]
}
function ArchiveManager(props: props) {
  const [data, setData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await props.get()
      setData(data)
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }
  React.useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Container maxWidth="md">
        <Card>
          <CardHeader title={props.title} />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      nicemodal.show(ModalCRUD, {
                        DataSchema: props.dataSchema,
                        data: {},
                        new: true,
                        onDelete: async (deldata: any) => {
                          toast.error('No se puede borrar si no se ha creado')
                        },
                        onSave: async (newdata: any) => {
                          //add data

                          await props.add(newdata)
                          fetchData()
                        }
                      })
                    }}
                  >
                    Agregar
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  autoHeight
                  //search
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true
                    }
                  }}
                  rows={data}
                  columns={props.dataSchema.map((data) => {
                    return {
                      field: data.name,
                      headerName: data.title,
                      width: data.width ? data.width : 150,
                      valueGetter: data.valueGetter
                    }
                  })}
                  slots={{ toolbar: GridToolbar }}
                  rowsPerPageOptions={[5]}
                  onRowDoubleClick={(params) => {
                    nicemodal.show(ModalCRUD, {
                      DataSchema: props.dataSchema,
                      data: params.row,
                      new: false,
                      onDelete: async (deldata: any) => {
                        await props.delete(deldata)
                        fetchData()
                      },
                      onSave: async (newdata: any) => {
                        //edit data
                        let datanewAll = data.map((datanew) => {
                          if (datanew.id === newdata.id) {
                            return newdata
                          } else {
                            return datanew
                          }
                        })
                        setData(datanewAll)
                        await props.edit(newdata, datanewAll)
                        fetchData()
                      }
                    })
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default ArchiveManager
