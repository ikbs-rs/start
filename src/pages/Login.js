import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import env from "../configs/env";
import { setLanguage } from "../store/actions";
import { setLoginSessionState } from "../security/interceptors";
import { getAuthTranslations } from "./authTranslations";
import "./Login.css";

const normalizeToken = (token) => (token || "").toString().replace(/^Bearer\s+/i, "").trim();
const buildAuthHeader = (token) => {
    const normalized = normalizeToken(token);
    return normalized ? `Bearer ${normalized}` : "";
};

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [language, setLanguageState] = useState(localStorage.getItem("sl") || "sr_cyr");
    const t = getAuthTranslations(language);

    const onInputChange = (value) => {
        setLanguageState(value);
        localStorage.setItem("sl", value);
        dispatch(setLanguage(value));
    };

    const createJson = async (id, admin, userName, channels = []) => {
        let channel = null;
        if (channels[0]) {
            channel = channels[0].id;
        }

        return JSON.stringify({
            id,
            admin,
            username: userName,
            kanal: channel,
            channels: channels.map((channelItem) => ({
                id: channelItem.id,
                text: channelItem.text
            }))
        });
    };

    const handleButtonClick = async () => {
        const requestData = { username, password };
        console.log(username, "###############",password);
        const url = `${env.JWT_BACK_URL}/adm/services/sign/in`;

        try {
            const response = await axios.post(url, requestData);
            const normalizedToken = normalizeToken(response?.data?.token);
            const normalizedRefreshToken = normalizeToken(response?.data?.refreshToken);

            if (!normalizedToken) {
                throw new Error("Token missing in sign-in response.");
            }

            localStorage.setItem("token", normalizedToken);
            localStorage.setItem("refreshToken", normalizedRefreshToken);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("sl", language || "sr_cyr");
            setLoginSessionState(true);

            const usrUrl = `${env.ADM_BACK_URL}/adm/user/${response.data.userId}`;
            const urlCh = `${env.ADM_BACK_URL}/adm/user/_v/lista/?stm=adm_userchannel_v&objid=${response.data.userId}`;
            const headers = { Authorization: buildAuthHeader(normalizedToken) };

            let userJson = await createJson(response.data.userId, false, username, []);

            try {
                const rezultatUsr = await axios.get(usrUrl, { headers });
                const objUsr = rezultatUsr.data.item;
                const rezultat = await axios.get(urlCh, { headers });
                const objChannel = rezultat.data.item;
                userJson = await createJson(objUsr.id, objUsr.admin, objUsr.username, objChannel);
            } catch (detailsError) {
                console.error(detailsError);
            }

            localStorage.setItem("user", userJson);
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
            setLoginSessionState(false);
            navigate("/login", { replace: true });
        }
    };

    return (
        <div className="login-body mui-login-body">
            <div className="card login-panel p-fluid mui-login-panel">
                <div className="login-panel-content">
                    <Box sx={{ width: "100%", maxWidth: 420, ml: "auto", p: { xs: 2, md: 3 } }}>
                        <Box className="logo-container">
                            <img src="assets/layout/images/ems-logo-novi-1-1.png" alt="EMS" className="auth-logo" />
                            <span className="guest-sign-in">{t.welcome}</span>
                        </Box>

                        <Box sx={{ width: "100%" }}>
                            <Box className="username-container" sx={{ mt: 2 }}>
                                <Typography component="label" htmlFor="input">{t.username}</Typography>
                                <div className="login-input">
                                    <TextField
                                        id="input"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </div>
                            </Box>

                            <Box className="password-container" sx={{ mt: 2.5 }}>
                                <Typography component="label" htmlFor="password-input">{t.password}</Typography>
                                <div className="login-input">
                                    <TextField
                                        id="password-input"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </div>
                            </Box>

                            <Box className="language-container" sx={{ mt: 2.5 }}>
                                <Typography component="label" htmlFor="language-input">{t.language}</Typography>
                                <div className="login-input">
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="language-label">{t.language}</InputLabel>
                                        <Select
                                            labelId="language-label"
                                            id="language-input"
                                            value={language}
                                            label={t.language}
                                            onChange={(e) => onInputChange(e.target.value)}
                                        >
                                            <MenuItem value="en">{t.english}</MenuItem>
                                            <MenuItem value="sr_cyr">{t.serbianCyrillic}</MenuItem>
                                            <MenuItem value="sr_lat">{t.serbianLatin}</MenuItem>
                                            <MenuItem value="fr">{t.french}</MenuItem>
                                            <MenuItem value="de">{t.german}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Box>

                            <Box sx={{ mt: 3, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                                <Button component={Link} to="/forgot-password" variant="outlined" className="auth-action-btn">
                                    {t.forgetPassword}
                                </Button>
                                <Button variant="outlined" className="auth-action-btn" onClick={handleButtonClick}>
                                    {t.signIn}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    );
};
