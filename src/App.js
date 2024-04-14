import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import LoginPage from './views/login/login';
import Registro from './views/login/register';
import InicioPage from './views/Inicio/inicio';



function App() {
  return (
    <div className="App">
   <BrowserRouter>
        <Routes>
        <Route path="/"  element={<LoginPage/>}  /> 
        <Route path="/registro"  element={<Registro/>}  />   
        <Route path="/inicio"  element={<InicioPage/>}  />       
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
