import '../styles/App.css';
import Navbar from './Navbar';
import Home from './Home';
import Tabla from './Tabla';
import Registro from './Registro';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/tabla" element={<Tabla/>}></Route>
                        <Route path="/registro" element={<Registro/>}></Route>
                    </Routes>
                </div>
      </BrowserRouter>
  );
}

export default App;
