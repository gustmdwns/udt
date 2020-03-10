import { createMuiTheme } from '@material-ui/core/styles';

const udtBlue = "#0B72B9";
const udtOrange = "#FFBA60";
const udtGrey = "#868686";

export default createMuiTheme({
    palette: {
        common: {
            blue: udtBlue,
            orange: udtOrange
        },
        primary: {
            main: udtBlue
        },
        secondary: {
            main: udtOrange
        }
    },
    typography: {
        tab: {
            textTransform: "none",
            fontWeight: "700",
            fontSize: "1rem",
        },
        estimate: {
            textTransform: "none",
            fontFamily: "Roboto",
            fontSize: "1rem",
            color: "white"
        },
        h2: {
            fontFamily: "Raleway",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: udtBlue,
            lineHeight: 1.5
        },
        h3: {
            fontFamily: "Pacifico",
            fontSize: "2.5rem",
            color: udtBlue
        },
        h4: {
            fontFamily: "Raleway",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: udtBlue
        },
        subtitle1: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: udtGrey
        },
        subtitle2: {
            fontSize: "1.25rem",
            fontWeight: 300,
            color: "white"
        },
        learnButton: {
            borderColor: udtBlue,
            color: udtBlue,
            borderWidth: 2,
            textTransform: "none",
            borderRadius: 50,
            fontFamily: "Roboto",
            fontWeight: "bold",
        }
    }
});