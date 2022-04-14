import './App.css';
import analytics from './firebase';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from './components/auth/login';
import Register from './components/auth/register';
import MainCover from './components/mainCover/mainCover';
import Sidebar from './components/sidebar/sidebar';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<MainCover/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path='/sidebar' element={<Sidebar/>}/>

                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
