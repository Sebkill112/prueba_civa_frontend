import React, { useState, useEffect } from 'react';
import { Box, Divider, FormControl, Grid, MenuItem, TableHead, TextField, Typography } from "@mui/material";
import http from "../../http";
import ApartmentIcon from '@mui/icons-material/Apartment';
import { FlexBox } from "../../components/Containers";
import CustomLoadingButton from '../../components/Button/LoadingButton';
import CustomDatePicker from '../../components/DatePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Person2Icon from '@mui/icons-material/Person2';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

export default function RegistroFutbolista(props) {

    const { cerrarModal } = props;
    const [posiciones, setPosiciones] = React.useState([]);



    React.useEffect(() => {
        (async () => {
            const response = await http.get("/posicion");
            setPosiciones(response.data)

        })();
    }, []);




    const validate = (values) => {
        const errors = {};

        if (!values.nombre) {
            errors.nombre = 'El campo Nombre es obligatorio';
        } else if (values.nombre.length < 2 || values.nombre.length > 40) {
            errors.nombre = 'El nombre debe tener entre 2 y 40 caracteres';
        }

        if (!values.apellido) {
            errors.apellido = 'El campo Apellido es obligatorio';
        } else if (values.apellido.length < 2 || values.apellido.length > 40) {
            errors.autor = 'El Apellido debe tener entre 2 y 40 caracteres';
        }

        if (!values.fechaNacimiento) {
            errors.fechaNacimiento = 'El campo Fecha de Nacimiento es obligatorio';
        } 
        if (!values.caracteristicas) {
            errors.caracteristicas = 'El campo Caracteristicas es obligatorio';
        } else if (values.caracteristicas.length < 2 || values.caracteristicas.length > 80) {
            errors.autor = 'El Apellido debe tener entre 2 y 80 caracteres';
        }

        if (values.caracteristicas === '0' || values.editorial === '-1') {
            errors.editorial = 'Por favor, seleccione una editorial válida';
        }
    
        if (values.posicion === 0 || values.posicion === -1) {
            errors.posicion = 'Por favor, seleccione una Posición válida';
        }

        return errors;
    };


    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    const areAllFieldsValid = () => {
    const errorValues = Object.values(formik.errors);

    const allFieldsFilled = Object.values(formik.values).every((value) => {
        return typeof value === 'string' && value.trim() !== '';
    });

    const noErrors = errorValues.every((error) => !error);

    const allFieldsValid = allFieldsFilled && noErrors;
    setIsButtonDisabled(!allFieldsValid); // Deshabilita el botón si no todos los campos son válidos
    return allFieldsValid;
};

    const areAllFieldsEmpty = () => {
        const formValues = Object.values(formik.values);
        return formValues.every(value => {
            if (typeof value === 'string') {
                return value.trim() === '';
            }
            return true; // Si no es una cadena, considerarlo como lleno
        });
    };


    const updateButtonStatus = () => {
        const allFieldsValid = areAllFieldsValid();
        setIsButtonDisabled(!allFieldsValid);
    };

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '', 
            fechaNacimiento: '',
            caracteristicas: '', 
            posicion: 0,

        },
        validate,
    initialErrors: {
        nombre: 'El campo Nombre es obligatorio',
        
    },
        onSubmit: (values) => {
            // Coloca aquí la lógica de envío de datos si los campos son válidos
            // Puedes acceder a los valores válidos a través de `values`
            console.log(values);
        },
        initialTouched: {
            nombre: true,
           
        },
    });

    

    useEffect(() => {
        formik.isValid && formik.submitCount > 0 && formik.isValidating && formik.submitForm();
    }, [formik]);



    const registrarFutbolista = async () => {
        const data = {

            nombres: formik.values.nombre,
            apellidos: formik.values.apellido,
            fechaNacimiento: formik.values.fechaNacimiento,
            caracteristicas: formik.values.caracteristicas,
            posicion: {
                id: parseInt(formik.values.posicion) 
            }
        }

        console.log(data);


        await http.post('/futbolista', data)
            .then((response) => {

                Swal.fire({
                    icon: 'success',
                    title: 'Registro de Futbolista',
                    text: 'Registro exitoso',
                    timer: 2000
                });
                // limpiarInput()
                formik.resetForm();
                cerrarModal(false);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registro de Futbolista',
                    text: `No se pudo registrar el Futbolista, valide con el administrador`,
                });
            });
            formik.handleSubmit();
    };


    return (
        <>

            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
                        <Divider>
                            <Typography variant="h5" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                                Completa Los Datos del Futbolista
                            </Typography>
                        </Divider>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3.5}>
                    <FormControl sx={{ height: '80px' }} fullWidth>
                        <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                            <Person2Icon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                size="medium"
                                id="nombre"
                                name="nombre"
                                type="text"
                                label="Nombres"
                                value={formik.values.nombre}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus(); // Call this function when the value changes
                                }} onBlur={formik.handleBlur}
                                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre ? formik.errors.nombre : ''}
                            />
                        </FlexBox>

                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.5}>
                    <FormControl sx={{ height: '80px' }} fullWidth>
                        <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                            <Person2Icon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                size="medium"
                                id="apellido"
                                name="apellido"
                                type="text"
                                label="Apellido"
                                value={formik.values.apellido}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus();
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                                helperText={formik.touched.apellido ? formik.errors.apellido : ''}
                            />
                        </FlexBox>

                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.5}>
                    <FormControl sx={{ height: '80px' }} fullWidth>
                        <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                            <EditCalendarIcon color="primary" fontSize="large" />
                            <CustomDatePicker
                                value={formik.values.fechaNacimiento}
                                onChange={(newValue) => { formik.setFieldValue('fechaNacimiento', newValue)
                                updateButtonStatus(); }}
                                label="Fecha Nacimiento"
                                onBlur={formik.handleBlur}
                                error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                                helperText={formik.touched.fechaNacimiento ? formik.errors.fechaNacimiento : ''}
                            />
                        </FlexBox>

                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={3.5}>
                    <FormControl sx={{ height: '80px' }} fullWidth>
                        <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                            <Person2Icon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                
                                size="medium"
                                id="caracteristicas"
                                name="caracteristicas"
                                type="text"
                                label="Caracteristicas"
                                value={formik.values.caracteristicas}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus();
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.caracteristicas && Boolean(formik.errors.caracteristicas)}
                                helperText={formik.touched.caracteristicas ? formik.errors.caracteristicas : ''}
                            />
                                
                        </FlexBox>

                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={3.5}>
                    <FormControl sx={{ height: '80px' }} fullWidth>
                        <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                            <SportsSoccerIcon color="primary" fontSize="large" />
                            <TextField
                                fullWidth
                                size="medium"
                                id="posicion"
                                name="posicion"
                                type="text"
                                label="Posición"
                                select
                                value={formik.values.posicion}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    updateButtonStatus(); 
                                }} onBlur={formik.handleBlur}
                                error={formik.touched.posicion && Boolean(formik.errors.posicion)}
                                helperText={formik.touched.posicion ? formik.errors.posicion : ''}

                            >
                                <MenuItem value={0}>
                                    Seleccione Una Posicion
                                </MenuItem>
                                {posiciones.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.nombre}
                                    </MenuItem>
                                ))}

                            </TextField>

                        </FlexBox>

                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={3.5}>
                    <FormControl sx={{ height: '80px' }}>
                        <CustomLoadingButton
                            type="submit"
                            startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
                            variant="contained"
                            style={{
                                marginTop: 2,
                                backgroundColor: '#33cc33',
                                fontWeight: 'lighter',
                                color: 'black',
                                fontSize: '15px',
                                height: '28px'
                            }}
                            onClick={registrarFutbolista}
                            disabled={areAllFieldsEmpty() || !formik.isValid}
                        >
                            Registrar
                        </CustomLoadingButton>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}