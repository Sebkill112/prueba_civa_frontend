import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  CssBaseline,
  FormControl,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import { useNavigate } from 'react-router-dom';
import { FlexBox } from '../../components/Containers';
import axios from 'axios';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { LoadingButton } from '@mui/lab';

const Registro = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.dni) {
      errors.dni = 'El campo DNI es obligatorio';
    } else if (!/^[0-9]{8}$/.test(values.dni)) {
      errors.dni = 'El DNI debe contener exactamente 8 números';
    }


    if (!values.nombre) {
      errors.nombre = 'El campo Nombre es obligatorio';
    } else if (values.nombre.length < 2 || values.nombre.length > 40) {
      errors.nombre = 'El nombre debe tener entre 2 y 40 caracteres';
    }

    if (!values.apellido) {
      errors.apellido = 'El campo Apellido es obligatorio';
    } else if (values.apellido.length < 2 || values.apellido.length > 40) {
      errors.apellido = 'El apellido debe tener entre 2 y 40 caracteres';
    }

    if (!values.correo) {
      errors.correo = 'El campo Correo es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(values.correo)) {
      errors.correo = 'El correo no tiene el formato válido';
    }

    if (!values.username) {
      errors.username = 'El campo Usuario es obligatorio';
    } else if (values.username.length < 2 || values.username.length > 40) {
      errors.username = 'El usuario debe tener entre 2 y 40 caracteres';
    }

    if (!values.password) {
      errors.password = 'El campo Password es obligatorio';
    } else if (values.password.length < 2 || values.password.length > 40) {
      errors.password = 'El password debe tener entre 2 y 40 caracteres';
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
    setIsButtonDisabled(!allFieldsValid);
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
      dni: '',
      nombre: '',
      apellido: '',
      direccion: '',
      correo: '',
      username: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      // Coloca aquí la lógica de envío de datos si los campos son válidos
      // Puedes acceder a los valores válidos a través de `values`
      console.log(values);
    },
  });

  useEffect(() => {
    formik.isValid && formik.submitCount > 0 && formik.isValidating && formik.submitForm();
  }, [formik]);

  const registrarRegistro = async () => {
    const data = {
      dni: formik.values.dni,
      nombre: formik.values.nombre,
      apellido: formik.values.apellido,
      direccion: formik.values.direccion,
      correo: formik.values.correo,
      username: formik.values.username,
      password: formik.values.password,
      rol: 2
    };

    console.log(data);

    await axios.post('http://localhost:8090/auth/register', data)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Registro de Usuario',
            text: 'Registro exitoso',
            timer: 2000
          });
          formik.resetForm();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Registro de Usuario',
            text: `Error: ${error.response.data}`,
          });
        }
      });
    formik.handleSubmit();
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.ctfassets.net/1nvpgv2kdfc0/4gPp7qhQKTdwkTUdbKj0Ym/e4e9d48aec2e52b358ad02e9a4f36e43/civa.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'success.main', width: 90, height: 90 }}>
              <AccountCircleIcon sx={{ m: 1, width: 80, height: 80 }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registro
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mt: 1 }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={12} md={10}>
                    <FormControl sx={{ height: '60px', marginBottom: 1.2 }} fullWidth>
                      <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <BadgeIcon color="primary" fontSize="large" />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="dni"
                          name="dni"
                          label="DNI"
                          type="number"
                          value={formik.values.dni}
                          onChange={(e) => {
                            formik.handleChange(e);
                            updateButtonStatus(); // Call this function when the value changes
                          }}
                          onBlur={formik.handleBlur}
                          error={formik.touched.dni && Boolean(formik.errors.dni)}
                          helperText={formik.touched.dni ? formik.errors.dni : ''}
                        />
                      </FlexBox>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <FormControl sx={{ height: '60px', marginBottom: 1.2 }} fullWidth>
                      <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <DriveFileRenameOutlineIcon color="primary" fontSize="large" />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="nombre"
                          name="nombre"
                          label="Nombre"
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
                  <Grid item xs={12} sm={12} md={10}>
                    <FormControl sx={{ height: '60px', marginBottom: 1.2 }} fullWidth>
                      <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <DriveFileRenameOutlineIcon color="primary" fontSize="large" />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="apellido"
                          name="apellido"
                          label="Apellido"
                          value={formik.values.apellido}
                          onChange={(e) => {
                            formik.handleChange(e);
                            updateButtonStatus(); // Call this function when the value changes
                          }} onBlur={formik.handleBlur}
                          error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                          helperText={formik.touched.apellido ? formik.errors.apellido : ''}
                        />
                      </FlexBox>

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <FormControl sx={{ height: '60px', marginBottom: 1.2 }} fullWidth>
                      <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <EmailIcon color="primary" fontSize="large" />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="correo"
                          name="correo"
                          label="Correo"
                          type="email"
                          value={formik.values.correo}
                          onChange={(e) => {
                            formik.handleChange(e);
                            updateButtonStatus(); // Call this function when the value changes
                          }} onBlur={formik.handleBlur}
                          error={formik.touched.correo && Boolean(formik.errors.correo)}
                          helperText={formik.touched.correo ? formik.errors.correo : ''}
                        />
                      </FlexBox>

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <FormControl sx={{ height: '60px', marginBottom: 1.2 }} fullWidth>
                      <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <AccountCircleIcon color="primary" fontSize="large" />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="username"
                          name="username"
                          label="Usuario"
                          value={formik.values.username}
                          onChange={(e) => {
                            formik.handleChange(e);
                            updateButtonStatus(); // Call this function when the value changes
                          }} onBlur={formik.handleBlur}
                          error={formik.touched.username && Boolean(formik.errors.username)}
                          helperText={formik.touched.username ? formik.errors.username : ''}
                        />
                      </FlexBox>

                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <FormControl sx={{ height: '60px', marginBottom: 1.2 }} fullWidth>
                      <FlexBox justifyContent="end" alignItems="center" spacing="8px">
                        <PasswordIcon color="primary" fontSize="large" />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          value={formik.values.password}
                          onChange={(e) => {
                            formik.handleChange(e);
                            updateButtonStatus(); // Call this function when the value changes
                          }} onBlur={formik.handleBlur}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password ? formik.errors.password : ''}
                        />
                      </FlexBox>

                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl sx={{ height: '60px', marginTop: 3 }} fullWidth>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isLoading}
                        onClick={ () => {
                          setIsLoading(true); 
                          registrarRegistro() 
                            .finally(() => setIsLoading(false));
                        }
                          
                        }
                        disabled={areAllFieldsEmpty() || !formik.isValid}
                        sx={{
                          backgroundColor: 'success.main', color: 'white',
                          '&:hover': {
                            backgroundColor: '#33cc33', // Cambia 'lightgreen' al color deseado
                          }

                        }}
                      >
                        Registrar
                      </LoadingButton>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Link href="/" variant="body2">
                      Volver al login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Registro;
