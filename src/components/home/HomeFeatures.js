import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import GavelIcon from "@mui/icons-material/Gavel";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CoffeeIcon from "@mui/icons-material/Coffee";
import env from "../../configs/env";
import { translations } from "../../configs/translations";
import { usePermission } from "../../security/interceptors";
import "./index.css";

const RETURN_SECTION_KEY = "start:return-section";

function HomeFeatures() {
    const selectedLanguage = localStorage.getItem("sl") || "en";
    const t = translations[selectedLanguage];

    const cards = [
        usePermission("ADMentry") && {
            href: `${env.ADM_URL}?sl=${selectedLanguage}`,
            title: t.systemAdmin,
            description: t.systemAdminDescription,
            icon: <AdminPanelSettingsIcon />,
            internal: true
        },
        usePermission("CMNentry") && {
            href: `${env.CMN_URL}?sl=${selectedLanguage}`,
            title: t.commonLibrary,
            description: t.commonLibraryDescription,
            icon: <LibraryBooksIcon />,
            internal: false
        },
        usePermission("BZRentry") && {
            href: "http://localhost:8091/itm/?sl=sr_cyr",
            title: t.bzrSystem,
            description: t.bzrSystemDescription,
            icon: <HealthAndSafetyIcon />,
            internal: false
        },
        usePermission("WSTentry") && {
            href: "http://localhost:8092/wst/?sl=sr_cyr",
            title: t.waste,
            description: t.wasteDescription,
            icon: <RecyclingIcon />,
            internal: false
        },
        usePermission("TMentry") && {
            href: "http://localhost:8910/sap/?sl=sr_cyr",
            title: t.timenagment,
            description: t.timenagmentDescription,
            icon: <AccessTimeFilledIcon />,
            internal: true
        },
        usePermission("SPentry") && {
            href: "http://localhost:8092/wst/?sl=sr_cyr",
            title: t.courtProceedings,
            description: t.courtProceedingsDescription,
            icon: <GavelIcon />,
            internal: true
        },
        usePermission("EINentry") && {
            href: "http://localhost:8092/wst/?sl=sr_cyr",
            title: t.inspectionOrders,
            description: t.inspectionOrdersDescription,
            icon: <FactCheckIcon />,
            internal: true
        },   
        usePermission("COFFentry") && {
            href: "http://localhost:8356/coff/?sl=sr_cyr",
            title: t.coffy,
            description: t.coffyDescription,
            icon: <CoffeeIcon />,
            internal: true
        },        
        {
            href: "https://www.ems.rs/",
            title: t.customerSupport,
            description: t.customerSupportDescription,
            icon: <HeadsetMicIcon />,
            internal: true,
            external: true
        }
    ].filter(Boolean);

    const handleCardClick = (card) => () => {
        if (!card.external) {
            localStorage.setItem(RETURN_SECTION_KEY, "features");
        }
    };

    return (
        <Box id="features" className="landing-features mui-features-section">
            <Container maxWidth="lg">
                <Typography variant="overline" className="mui-section-kicker">
                    {t.NONE}
                </Typography>
                <Typography variant="h3" className="mui-section-title">
                    {t.modules}
                </Typography>

                <Box
                    className="mui-features-grid"
                    sx={{
                        mt: 1,
                        display: "grid",
                        gap: 2.5,
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                            lg: "repeat(3, minmax(0, 1fr))"
                        }
                    }}
                >
                    {cards.map((card) => (
                        <Box className="mui-feature-grid-item" key={`${card.title}-${card.href}`}>
                            <a
                                href={card.href}
                                target={card.external ? "_blank" : undefined}
                                rel={card.external ? "noreferrer noopener" : undefined}
                                className="mui-card-link"
                                onClick={handleCardClick(card)}
                            >
                                <Card className="mui-feature-card">
                                    <CardContent>
                                        <Box className={`mui-feature-icon ${card.internal ? "mui-feature-icon--internal" : ""}`}>{card.icon}</Box>
                                        <Typography variant="h6" className="mui-feature-title">
                                            {card.title}
                                        </Typography>
                                        <Typography className="mui-feature-text">{card.description}</Typography>
                                    </CardContent>
                                </Card>
                            </a>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

export default HomeFeatures;
