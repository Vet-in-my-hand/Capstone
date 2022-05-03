import './App.css';
// import app from './firebase';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from './components/auth/login';
import Register from './components/auth/register';
import MainCover from './components/mainCover/mainCover';
// import MainCover from './components/mainCover/mainCover';
import Sidebar from './components/sidebar/sidebar';
import HelloHos from './components/work/helloHos';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Sidebar/>
                <Routes>
                    <Route path="/" element={<MainCover/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/hellohos" element={<HelloHos/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
