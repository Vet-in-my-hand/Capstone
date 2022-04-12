import './App.css';
import analytics from './firebase';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from './components/Auth/login';
import Register from './components/Auth/register';
import MainCover from './main_cover/main_cover';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          
          <Route path="/" element={<MainCover/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
