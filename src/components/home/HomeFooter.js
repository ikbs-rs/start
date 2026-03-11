import React from "react";
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import { translations } from "../../configs/translations";

const HomeFooter = () => {
    const selectedLanguage = localStorage.getItem("sl") || "en";
    const t = translations[selectedLanguage];

    return (
        <Box id="footer" className="landing-footer mui-footer">
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} className="mui-footer-col">
                        <Box component="img" src="assets/layout/images/ems-logo-novi-1-1.png" alt="Ticketline" className="mui-footer-logo" />
                    </Grid>
                    <Grid item xs={12} md={3} className="mui-footer-col">
                        <Typography className="mui-footer-title">{t.ABOUTUS}</Typography>
                        <Stack spacing={0.75} className="mui-footer-stack">
                            <Typography className="mui-footer-link">{t.EMSAD}</Typography>
                            <Typography className="mui-footer-link">{t.emsDescription}</Typography>
                            {/* <Link href="#" underline="hover" className="mui-footer-link">{t.testimonials}</Link>
                            <Link href="#" underline="hover" className="mui-footer-link">{t.license}</Link> */}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3} className="mui-footer-col">
                        <Typography className="mui-footer-title">{t.BASICINFORMATION}</Typography>
                        <Stack spacing={0.75} className="mui-footer-stack">
                            <Typography className="mui-footer-link">{t.PIB}: SR 103921661</Typography>
                            <Typography className="mui-footer-link">{t.Identitynumber}: 20054182</Typography>
                            {/* <Typography className="mui-footer-link">{t.Activitycode}: 4791</Typography> */}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3} className="mui-footer-col">
                        <Typography className="mui-footer-title">{t.CONTACT}</Typography>
                        <Stack spacing={0.75} className="mui-footer-stack">
                            <Typography className="mui-footer-link">{t.Phone}: +381 11 32 39 408</Typography>
                            <Typography className="mui-footer-link">{t.EMail}: pr@ems.rs</Typography>
                            <Link
                                href="https://www.ems.rs"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                                className="mui-footer-link"
                            >
                                {t.Web}: www.ems.rs
                            </Link>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomeFooter;
