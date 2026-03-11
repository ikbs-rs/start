import React, { useEffect, useState } from "react";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";
import { translations } from "../../configs/translations";
import mockNotifications from "../../configs/mockNotifications.json";
import { AdmUserService } from "./AdmUserService";
import { setLoginSessionState } from "../../security/interceptors";
import "./index.css";

const APP_BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
const withBase = (path) => `${APP_BASE}/${String(path).replace(/^\/+/, "")}`;
const DEFAULT_USER_AVATAR = withBase("assets/layout/images/users/adm.jpg");

const HomeHeader = ({ scrollToDiv }) => {
    const selectedLanguage = localStorage.getItem("sl") || "en";
    const t = translations[selectedLanguage];
    const userId = localStorage.getItem("userId") || -1;
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRequestDrawerOpen, setIsRequestDrawerOpen] = useState(false);
    const [activeRequestTab, setActiveRequestTab] = useState(0);
    const [user, setUser] = useState({});
    const [avatarSrc, setAvatarSrc] = useState(DEFAULT_USER_AVATAR);
    const [requestForm, setRequestForm] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        let mounted = true;

        async function fetchData() {
            try {
                const admUserService = new AdmUserService();
                const data = await admUserService.getAdmUser(userId);
                if (mounted) {
                    setUser(data || {});
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        return () => {
            mounted = false;
        };
    }, [userId]);

    useEffect(() => {
        let cancelled = false;

        async function resolveAvatar() {
            const username = `${user?.username || ""}`.trim();
            if (!username) {
                setAvatarSrc(DEFAULT_USER_AVATAR);
                return;
            }

            const extensions = ["jpg", "jpeg", "png", "webp", "avif", "gif"];
            const usernames = [username, username.toLowerCase(), username.toUpperCase()];
            const candidates = [...new Set(usernames)]
                .flatMap((name) => extensions.map((ext) => withBase(`assets/layout/images/users/${name}.${ext}`)));

            for (const candidate of candidates) {
                const exists = await new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);
                    img.src = candidate;
                });

                if (exists) {
                    if (!cancelled) {
                        setAvatarSrc(candidate);
                    }
                    return;
                }
            }

            if (!cancelled) {
                setAvatarSrc(DEFAULT_USER_AVATAR);
            }
        }

        resolveAvatar();
        return () => {
            cancelled = true;
        };
    }, [user?.username]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        setLoginSessionState(false);
        navigate("/login", { replace: true });
    };

    const navItems = [
        { label: translations[selectedLanguage].home, action: () => scrollToDiv("home") },
        { label: translations[selectedLanguage].modules, action: () => scrollToDiv("features") },
        { label: translations[selectedLanguage].logout, action: handleLogout }
    ];
    const mobileNavItems = [
        { label: translations[selectedLanguage].home, action: () => scrollToDiv("home") },
        { label: translations[selectedLanguage].modules, action: () => scrollToDiv("features") },
        { label: t.ABOUTUS, action: () => scrollToDiv("footer") },
        { label: translations[selectedLanguage].logout, action: handleLogout }
    ];
    const fullName = `${user?.firstname || ""} ${user?.lastname || ""}`.trim();
    const isSr = selectedLanguage.startsWith("sr");
    const notifications = Array.isArray(mockNotifications) ? mockNotifications : [];
    const notificationsCount = notifications.filter((item) => item.unread !== false).length;
    const notificationsTabLabel = isSr ? "Moja obavestenja" : "My notifications";

    const handleOpenAIPrompt = () => {
        window.dispatchEvent(new CustomEvent("open-ai-prompt"));
    };

    const handleOpenRequestDrawer = () => {
        setActiveRequestTab(0);
        setIsRequestDrawerOpen(true);
    };
    const handleOpenNotificationsDrawer = () => {
        setActiveRequestTab(1);
        setIsRequestDrawerOpen(true);
    };

    const handleCloseRequestDrawer = () => {
        setIsRequestDrawerOpen(false);
    };

    const handleRequestFieldChange = (field) => (event) => {
        setRequestForm((prev) => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleRequestSubmit = (event) => {
        event.preventDefault();
        console.groupCollapsed(`[Request Form] ${new Date().toISOString()}`);
        console.log("Payload:", requestForm);
        console.groupEnd();
        handleCloseRequestDrawer();
    };

    return (
        <Box id="home" className="landing-header mui-landing-header">
            <Box className="landing-topbar mui-landing-topbar">
                <Container maxWidth="lg" className="mui-topbar-inner">
                    <Box
                        component="button"
                        type="button"
                        className="mui-logo-btn"
                        onClick={() => scrollToDiv("home")}
                        aria-label={t.home}
                    >
                        <Box component="img" src="assets/layout/images/ems-logo-novi-1-1.png" alt="EMS" className="mui-logo" />
                    </Box>

                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        className="mui-header-desktop-nav"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        {navItems.map((item) => (
                            <Button key={item.label} onClick={item.action} className="mui-nav-link">
                                {item.label}
                            </Button>
                        ))}
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1.25}
                        alignItems="center"
                        className="mui-header-desktop-user"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <IconButton className="mui-bell-btn" aria-label={`Messages: ${notificationsCount}`} onClick={handleOpenNotificationsDrawer}>
                            <Badge badgeContent={notificationsCount} color="error" max={99}>
                                <NotificationsNoneIcon fontSize="inherit" />
                            </Badge>
                        </IconButton>
                        <Typography className="mui-user-name">{fullName}</Typography>
                        <Avatar
                            src={avatarSrc}
                            alt={fullName || user?.username || "User"}
                            className="mui-user-avatar"
                            imgProps={{ onError: () => setAvatarSrc(DEFAULT_USER_AVATAR) }}
                        >
                            {(user?.username || "U").slice(0, 1).toUpperCase()}
                        </Avatar>
                    </Stack>

                    <Box className="mui-header-mobile" sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
                        <IconButton className="mui-bell-btn" aria-label={`Messages: ${notificationsCount}`} onClick={handleOpenNotificationsDrawer}>
                            <Badge badgeContent={notificationsCount} color="error" max={99}>
                                <NotificationsNoneIcon fontSize="inherit" />
                            </Badge>
                        </IconButton>
                        <IconButton className="mui-burger-btn" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Container>
            </Box>

            <Drawer
                className="mui-mobile-menu-drawer"
                anchor="right"
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                PaperProps={{ className: "mui-mobile-menu-paper" }}
            >
                <Box className="mui-mobile-menu-content">
                    <List className="mui-mobile-menu-list">
                        {mobileNavItems.map((item) => (
                            <ListItemButton
                                key={item.label}
                                className="mui-mobile-menu-item"
                                onClick={() => {
                                    item.action();
                                    setIsMenuOpen(false);
                                }}
                            >
                                <ListItemText primary={item.label} className="mui-mobile-menu-item-text" />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <section className="hero" id="top" aria-label="Hero">
                <div className="wrap hero-inner">
                    <div className="hero-grid">
                        <div>
                            <span className="pill">📈 {t.StorageManager}</span>
                            <h1>{t.moto}</h1>
                            <p className="lead">
                                {t.misija}
                            </p>
                            <div className="hero-actions">
                                <button type="button" className="btn primary btn-request" onClick={handleOpenRequestDrawer}>
                                    {t.sendRequest}
                                </button>
                                <button type="button" className="btn" onClick={handleOpenAIPrompt}>
                                    {t.learnMore}
                                </button>
                            </div>
                        </div>

                        <aside className="hero-card" aria-label="Highlights">
                            <div className="mini">
                                <b>{t.a00}</b>
                                <span>{t.aa01}</span>
                            </div>
                            <div className="metrics">
                                <div className="mini"><b>+12%</b><span>{t.aa1}</span></div>
                                <div className="mini"><b>−18%</b><span>{t.aa2}</span></div>
                                <div className="mini"><b>4 {t.weeks}</b><span>{t.aa3}</span></div>
                                <div className="mini"><b>1 {t.focus}</b><span>{t.aa4}</span></div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <Drawer
                className="mui-request-drawer"
                anchor="right"
                open={isRequestDrawerOpen}
                onClose={handleCloseRequestDrawer}
                sx={{ zIndex: 2590 }}
                PaperProps={{ className: "mui-request-drawer-paper" }}
            >
                <Box className="mui-request-drawer-content">
                    <Tabs
                        value={activeRequestTab}
                        onChange={(_, nextTab) => setActiveRequestTab(nextTab)}
                        variant="fullWidth"
                        className="mui-request-tabs"
                    >
                        <Tab label={t.sendRequest} />
                        <Tab label={notificationsTabLabel} />
                    </Tabs>

                    {activeRequestTab === 0 && (
                        <Box component="form" onSubmit={handleRequestSubmit} className="mui-request-tab-panel">
                            <Typography variant="h6" className="mui-request-title">
                                {t.sendRequest}
                            </Typography>
                            <Typography variant="body2" className="mui-request-subtitle">
                                {isSr
                                    ? "Posaljite osnovne podatke, a tim ce vas kontaktirati."
                                    : "Send your basic details and the team will contact you."}
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                label={isSr ? "Ime i prezime" : "Full name"}
                                value={requestForm.fullName}
                                onChange={handleRequestFieldChange("fullName")}
                                className="mui-request-input"
                            />
                            <TextField
                                fullWidth
                                required
                                type="email"
                                label={isSr ? "E-mail" : "Email"}
                                value={requestForm.email}
                                onChange={handleRequestFieldChange("email")}
                                className="mui-request-input"
                            />
                            <TextField
                                fullWidth
                                required
                                label={isSr ? "Tema" : "Subject"}
                                value={requestForm.subject}
                                onChange={handleRequestFieldChange("subject")}
                                className="mui-request-input"
                            />
                            <TextField
                                multiline
                                minRows={4}
                                fullWidth
                                required
                                label={isSr ? "Poruka" : "Message"}
                                value={requestForm.message}
                                onChange={handleRequestFieldChange("message")}
                                className="mui-request-input"
                            />
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                <Button className="mui-request-cancel" onClick={handleCloseRequestDrawer}>
                                    {isSr ? "Odustani" : "Cancel"}
                                </Button>
                                <Button type="submit" className="mui-request-submit">
                                    {isSr ? "Posalji" : "Send"}
                                </Button>
                            </Stack>
                        </Box>
                    )}

                    {activeRequestTab === 1 && (
                        <Box className="mui-request-tab-panel mui-request-notifications-panel">
                            <Typography variant="h6" className="mui-request-title">
                                {notificationsTabLabel}
                            </Typography>
                            <Typography variant="body2" className="mui-request-subtitle">
                                {isSr ? `${notificationsCount} novih obavestenja.` : `${notificationsCount} unread notifications.`}
                            </Typography>
                            <List className="mui-request-notification-list">
                                {notifications.map((notification) => (
                                    <Box key={notification.id} className="mui-request-notification-item">
                                        <Typography className="mui-request-notification-title">{notification.title}</Typography>
                                        <Typography className="mui-request-notification-message">{notification.message}</Typography>
                                        <Typography className="mui-request-notification-time">{notification.time}</Typography>
                                    </Box>
                                ))}
                            </List>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
};

export default HomeHeader;
