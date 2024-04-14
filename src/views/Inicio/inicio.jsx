import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate  } from 'react-router-dom'; // Asegúrate de tener instalada esta librería
import Futbolistas from '../futbolistas/futbolistas';

const InicioPage = () => {
  const [cookies] = useCookies(['jwtToken']);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Cambia el estado después del tiempo de espera
    }, 4000); // Tiempo de espera en milisegundos (en este caso, 2 segundos)

    return () => clearTimeout(timer); // Limpia el temporizador cuando se desmonta el componente
  }, []);

  if (loading) {
    // Muestra un mensaje de carga mientras se espera
    return <div>Cargando...</div>;
  }

  // Verifica si la cookie existe después del tiempo de espera
  const jwtTokenExists = cookies.jwtToken !== undefined;

  if (!jwtTokenExists) {
    return <Navigate to="/" />;
  }

  return (
    <Futbolistas/>
  );
};
export default InicioPage;