
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import Login from "./components/Login.js";




 function App(){
    return (


            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}/>
                </Routes>

            </BrowserRouter>
    );
}
export default App;