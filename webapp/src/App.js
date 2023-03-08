
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Login from "./Login/Login.js";



 function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}/>
            </Routes>

        </BrowserRouter>

    );
}
export default App;