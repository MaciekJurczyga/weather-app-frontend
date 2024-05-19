
import './App.css';
import Localization from "./Components/Pages/startingView.jsx";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import MainView from "./Components/Pages/mainView.jsx";
import { DataProvider } from './Components/DataContext/DataContext.js';
import {useState} from "react";


function App() {
    const [userDataValid, setUserDataValid] = useState(false);

    const handleUserDataValidation = (isValid) => {
        setUserDataValid(isValid);

    };
    return(
            <DataProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Localization onValidateUserData={handleUserDataValidation} />} />
                        <Route path="/weather" element={userDataValid ? <MainView /> : <Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </DataProvider>
    )
}

export default App;
