import React, { useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from "../configs/env"
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/actions';

export const Login = () => {

    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const search = window.location.search;    
    //const params = new URLSearchParams(search);
    let sl = localStorage.getItem('sl')||'en' //params.get('sl');   

    const onInputChange = (e, name) => {
        sl= e.target.value
        //setCurrentLanguage(sl)
        dispatch(setLanguage(sl));
    }

    const handleButtonClick = (parameter) => {
        // Ovde nedostaje kod za logovanje
        let isLoggedIn = true;
        const usernameInput = document.getElementById("input").value; // Koristimo document.getElementById da bismo dohvatili vrijednost polja Username
        const passwordInput = document.getElementById("password-input").value; // Koristimo document.getElementById da bismo dohvatili vrijednost polja Password
        
        const requestData = {
          username: usernameInput,
          password: passwordInput
        };

        //dispatch(setLanguage(sl)); // Postavite željeni jezik umesto 'en'

        axios
         .post(`${env.JWT_BACK_URL}/adm/services/sign/in`, requestData)
         .then((response) => {
           isLoggedIn = response.status === 200; // Ako je status 200, isLoggedIn će biti true
           if (isLoggedIn) {
             //TODO idi na pocetnu stranicu
             localStorage.setItem('token', response.data.token);
             localStorage.setItem('refreshToken', response.data.refreshToken);
             sessionStorage.setItem('isLoggedIn', 'true');
             localStorage.setItem('sl', sl||"en");
             navigate(`/login}`);
             //const newUrl = `${window.location.pathname}?sl=${sl||"en"}`;
             //window.location.replace(newUrl);
             //dispatch(setLanguage(sl));

            navigate('/');
           } else {
             //TODO vrati se na login
             navigate(`/login}`);
           }
         })
         .catch((error) => {
           console.error(error);
           isLoggedIn = false; // Ako se dogodila pogreška, isLoggedIn će biti false
           //TODO vrati se na login
         });        
    }    

    return (
        <div className="login-body">
            <div className="card login-panel p-fluid">
                <div className="login-panel-content">
                    <div className="grid">
                        <div className="col-12 sm:col-6 md:col-6 logo-container">
                            <img src="assets/layout/images/logo-tl.png" alt="Ticketline" style={{ width: "155.88px", height: "46.25px" }}/>
                            <span className="guest-sign-in">Welcome, please use the form to sign-in Ticketline network</span>
                        </div>
                        <div className="col-12 username-container">
                            <label>Username</label>
                            <div className="login-input">
                                <InputText id="input" type="text" />
                            </div>
                        </div>
                        <div className="col-12 password-container">
                            <label>Password</label>
                            <div className="login-input">
                                <InputText id="password-input" type="password" />
                            </div>
                        </div>
                        <div className="col-12 language-container">
                            <label>Language</label>
                            <div className="login-input">
                                <select id="language-input" onChange={(e) => onInputChange(e, 'language-input')} defaultValue={sl || "en"}>
                                    <option value="en">English</option>
                                    <option value="sr_cyr">Српски (ћирилица)</option>
                                    <option value="sr_lat">Srpski (latinica)</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    {/* Dodajte ostale jezike po potrebi */}
                                </select>
                            </div>
                        </div>                        
                        <div className="col-12 sm:col-6 md:col-6 rememberme-container">
                            <Checkbox checked={checked} onChange={(e) => setChecked(e.checked)} />
                            <label> Remember me</label>
                        </div>

                        <div className="col-12 sm:col-6 md:col-6 forgetpassword-container">
                            <a href="/" className="forget-password">
                                Forget Password
                            </a>
                        </div>

                        <div className="col-12 sm:col-6 md:col-6">
                            <Button label="Sign In" icon="pi pi-check" onClick={() => handleButtonClick('app')}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
