import React from "react";
import { Box, Divider, FormControl, Grid, MenuItem, TableHead, TextField, Typography } from "@mui/material";
import http from "../../http";
import PropTypes from 'prop-types';
import CustomLoadingButton from '../../components/Button/LoadingButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CustomModal from '../../components/CustomModal/index';
import Swal from 'sweetalert2';
import TablaFutbolistas from "./tablaFutbolistas";



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

const stylesModal2 = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#29a3a3"

    },
    box: {
        display: 'flex',
        alignItems: 'center',
        pt: '10em',
        backgroundColor: "#29a3a3"
    }
};

export default function MantemientoClientes() {


    const [futbolistas, setFutbolistas] = React.useState([]);
    const [registro, setRegistro] = React.useState(false);
    const [actualiza, setActualiza] = React.useState(false);
    const [asignar, setAsignar] = React.useState(false);
    const [libro, setLibro] = React.useState(null);



    React.useEffect(() => {
        (async () => {
            const response = await http.get("/futbolista");
            setFutbolistas(response.data)
        })();
    }, []);





    const listadoRefrescar = async () => {
        const response = await http.get("/api/libro/listado");
        setFutbolistas(response.data)
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

                                >
                                    Registrar
                                </CustomLoadingButton>
                            </FormControl>

                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>

                            <TablaFutbolistas futbolistas={futbolistas} />
                        </Grid>


                    </Grid>
                </Box>

            </Box>

        </>
    )
}