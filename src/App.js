import './App.css';
import { BrowserRouter,Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './views/login/login';
import Registro from './views/login/register';
import Futbolistas from './views/futbolistas/futbolistas';


const Private = ({Component}) => {
  const user = localStorage.getItem("user");  
  return user ? <Component /> : <Navigate  to="/" />
}


function App() {
  return (
    <div className="App">
   <BrowserRouter>
        <Routes>
        <Route path="/"  element={<LoginPage/>}  /> 
        <Route path="/registro"  element={<Registro/>}  />   
        <Route path="/inicio"  exact element={<Private Component={Futbolistas} />}  />       
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
