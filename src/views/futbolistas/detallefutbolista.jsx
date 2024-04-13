import React from "react";
import { Box, Divider, FormControl, Grid, MenuItem, TableHead, TextField, Typography } from "@mui/material";
import http from "../../http";
import PropTypes from 'prop-types';
import CustomLoadingButton from '../../components/Button/LoadingButton';
import PersonIcon from '@mui/icons-material/Person';
import Swal from 'sweetalert2';
import { FlexBox } from "../../components/Containers";


export default function DetalleFutbolista(props) {

    const { dataFutbolista } = props;

    const formHeight = '70px';
  
    

    return (
        <>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl sx={{ height: formHeight }} fullWidth>
                                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                        <PersonIcon color="primary" fontSize="large" />
                                        <TextField
                                            name="nombres"
                                            size="small"
                                            type="text"
                                            label="Nombres"
                                            value={dataFutbolista?.nombres}
                                            fullWidth
                                            
                                        />
                                    </FlexBox>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl sx={{ height: formHeight }} fullWidth>
                                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                        <PersonIcon color="primary" fontSize="large" />
                                        <TextField
                                            name="apellidos"
                                            size="small"
                                            type="text"
                                            label="Apellidos"
                                            value={dataFutbolista?.apellidos}
                                            fullWidth
                                            InputProps={{ readOnly: 'true' }}
                                        />
                                    </FlexBox>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl sx={{ height: formHeight }} fullWidth>
                                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                        <PersonIcon color="primary" fontSize="large" />
                                        <TextField
                                            name="fechaNacimiento"
                                            size="small"
                                            type="text"
                                            label="Fecha de Nacimiento"
                                            value={dataFutbolista?.fechaNacimiento}
                                            fullWidth
                                            InputProps={{ readOnly: 'true' }}
                                        />
                                    </FlexBox>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl sx={{ height: formHeight }} fullWidth>
                                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                        <PersonIcon color="primary" fontSize="large" />
                                        <TextField
                                            name="posicion"
                                            size="small"
                                            type="text"
                                            label="Posicion"
                                            value={dataFutbolista?.posicion.nombre}
                                            fullWidth
                                            InputProps={{ readOnly: 'true' }}
                                        />
                                    </FlexBox>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl sx={{ height: formHeight }} fullWidth>
                                    <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                                        <PersonIcon color="primary" fontSize="large" />
                                        <TextField
                                            name="caracteristicas"
                                            size="small"
                                            type="text"
                                            minRows={2}
                                            maxRows={4}
                                            label="Caracteristicas"
                                            value={dataFutbolista?.caracteristicas}
                                            fullWidth
                                            
                                        />
                                    </FlexBox>
                                </FormControl>
                            </Grid>
                           

                        </Grid>

        </>
    )
}