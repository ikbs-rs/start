import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#f87694"
        },
        secondary: {
            main: "#a23aa2"
        },
        background: {
            default: "#070b14",
            paper: "#11192a"
        }
    },
    typography: {
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    shape: {
        borderRadius: 12
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#070b14"
                }
            }
        }
    }
});

export default theme;
