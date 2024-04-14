import React from "react";
import { Box, Card, Divider, FormControl, Grid, MenuItem, TableHead, TextField, Typography } from "@mui/material";
import http from "../../http";
import LogoutIcon from '@mui/icons-material/Logout';
import CustomLoadingButton from '../../components/Button/LoadingButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomModal from '../../components/CustomModal/index';
import TablaFutbolistas from "./tablaFutbolistas";
import RegistroFutbolista from "./grabarFutbolista";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'; 




const stylesModal = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#009933"

    },
    box: {
        display: 'flex',
        alignItems: 'center',
        pt: '10em',
        backgroundColor: "#009933"
    }
};


export default function Futbolistas() {

    const user = JSON.parse(localStorage.getItem('user'));

    const [futbolistas, setFutbolistas] = React.useState([]);
    const [registro, setRegistro] = React.useState(false);
    const [, , removeCookie] = useCookies(['jwtToken']);
    const navigate = useNavigate();


    React.useEffect(() => {
        (async () => {
            const response = await http.get("/futbolista");
            setFutbolistas(response.data)
        })();
    }, []);

    const listadoRefrescar = async () => {
        const response = await http.get("/futbolista");
        setFutbolistas(response.data)
    };



    const handleOpenRegistro = () => {
        setRegistro(true);

    };

    const handleCloseRegistro = () => {
        setRegistro(false);
    };


    const handleCloseModalRegitro = async (boleean) => {
        setRegistro(boleean);

        listadoRefrescar()

    };



    const handleCerrarSesion = () => {
        removeCookie('jwtToken');
        localStorage.removeItem('user');
        navigate('/');
      };










    return (
        <>
            <Box height={50} />
            <Box display={'flex'}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2} justifyContent="left" alignItems="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Box sx={{ mt: 1, mb: 2.5, mx: 1 }}>
                                <Divider>
                                    <Typography variant="h4" sx={{ fontWeight: 'semibold', letterSpacing: '1px', mx: 1, color: '#555' }}>
                                        Futbolistas
                                    </Typography>
                                </Divider>
                            </Box>
                        </Grid>
                        {user.rol.codigo === 1 &&
                            <Grid item xs={12} sm={12} md={4}>
                                <FormControl sx={{ height: '60px' }}>
                                    <CustomLoadingButton
                                        type="submit"
                                        startIcon={<AddCircleIcon sx={{ height: '15px' }} />}
                                        variant="contained"
                                        style={{
                                            marginTop: 2,
                                            backgroundColor: '#00e64d',
                                            fontWeight: 'lighter',
                                            color: 'black',
                                            fontSize: '15px',
                                            height: '28px'
                                        }}
                                        onClick={handleOpenRegistro}

                                    >
                                        Registrar
                                    </CustomLoadingButton>
                                </FormControl>

                            </Grid>
                        }

                        <Grid item xs={12} sm={12} md={12}>

                            <TablaFutbolistas futbolistas={futbolistas} />
                        </Grid>


                    </Grid>
                </Box>

            </Box>

            <Box mt={5} display="flex" justifyContent="end" >
                <CustomLoadingButton
                    type="submit"
                    startIcon={<LogoutIcon sx={{ height: '15px' }} />}
                    variant="contained"
                    style={{
                        marginTop: 2,
                        backgroundColor: '#CE2125',
                        fontWeight: 'lighter',
                        color: 'black',
                        fontSize: '15px',
                        height: '28px',
                        marginRight: "80px"
                    }}
                    onClick={handleCerrarSesion}

                >
                    Cerrar Sesión
                </CustomLoadingButton>
            </Box>

            <CustomModal open={registro} handleClose={handleCloseRegistro} title="Registro de Futbolista" styles={stylesModal}>
                <div
                    style={{
                        // minWidth: 'calc(80vw)',
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0',
                        margin: '0 auto'
                    }}
                >
                    <Card style={{ marginTop: '50px', marginBottom: '50px', padding: '50px' }}>

                        <RegistroFutbolista cerrarModal={handleCloseModalRegitro} />
                    </Card>
                </div>
            </CustomModal>

        </>
    )
}