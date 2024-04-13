import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import CustomLoadingButton from '../../components/Button/LoadingButton';
import LoupeIcon from '@mui/icons-material/Loupe';
import DetalleFutbolista from './detallefutbolista';
import CustomModal from '../../components/CustomModal/index';
import { Card } from '@mui/material';


const stylesModal = {
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        pt: '10em'
    }
};

function TablePaginationActions(props) {
    const theme = useTheme();
    const { futbolistas } = props;
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };




  

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



export default function TablaFutbolistas(props) {
    const { futbolistas } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dataDetalle, setDataDetalle] = React.useState(null);
    const [detalle, setDetalle] = React.useState(false);

    // Evita un salto de diseño cuando se alcanza la última página con filas vacías.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - futbolistas.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


 
    const handleOpenDetalle = (row) => {
        setDetalle(true);
        setDataDetalle(row);
        console.log(row)
    };
    const handleCloseDetalle = () => {
        setDetalle(false);
    };
    return (
        <><TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
                <TableHead style={{ backgroundColor: '#00b6c2' }}>
                    <TableRow>
                        <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: 'large', textAlign: 'center' }}>Nombres</TableCell>
                        <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: 'large', textAlign: 'center' }}>Apellidos</TableCell>
                        <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: 'large', textAlign: 'center' }}>Fecha de Nacimiento</TableCell>
                        <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: 'large', textAlign: 'center' }}>Características</TableCell>
                        <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: 'large', textAlign: 'center' }}>Posición</TableCell>
                        <TableCell style={{ color: '#fff', fontWeight: 'bold', fontSize: 'large', textAlign: 'center' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? futbolistas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : futbolistas
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" style={{ fontSize: 'large', textAlign: 'center' }}>
                                {row.nombres}
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ fontSize: 'large', textAlign: 'center' }}>
                                {row.apellidos}
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', textAlign: 'center' }}>
                                {row.fechaNacimiento}
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', textAlign: 'center' }}>
                                {row.caracteristicas}
                            </TableCell>
                            <TableCell style={{ fontSize: 'large', textAlign: 'center' }}>
                                {row.posicion.nombre}
                            </TableCell>
                            <TableCell style={{ textAlign: ' -webkit-center' }}>
                                <CustomLoadingButton
                                    type="submit"
                                    startIcon={<LoupeIcon sx={{ height: '15px' }} />}
                                    variant="contained"
                                    style={{
                                        marginTop: 2,
                                        backgroundColor: '#00e64d',
                                        fontWeight: 'lighter',
                                        color: 'black',
                                        fontSize: '15px',
                                        height: '28px'
                                    }}

                                    onClick={() => handleOpenDetalle(row)}

                                >
                                    Detalles
                                </CustomLoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={futbolistas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions} />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
        
        
        <CustomModal open={detalle} handleClose={handleCloseDetalle} title="Detalles del Futbolista" styles={stylesModal}>
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
                    <Card style={{marginTop:'50px', marginBottom: '50px', padding: '50px'}}>
                   
                        <DetalleFutbolista dataFutbolista={dataDetalle}  />
                        </Card>
                </div>
            </CustomModal></>
    );
}