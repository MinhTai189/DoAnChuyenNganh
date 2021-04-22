import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
  },
  cover: {
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
  },
  paper: {
    width: "100%",
    maxWidth: 550,
    height: "100%",
    background: theme.palette.background.paper,
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: 0,

    "& .MuiTypography-h6": {
      width: "100%",
      textAlign: "center",
    },

    [theme.breakpoints.down(375)]: {
      "& .MuiTypography-h6": {
        fontSize: 18,
      },
    },
  },
  close: {
    width: 30,
    height: 30,
    background: theme.palette.primary.main,
    display: "grid",
    placeItems: "center",
    margin: "0 0 0 auto",
    cursor: "pointer",
    transition: ".4s ease-out",

    "&:hover": {
      opacity: 0.8,
    },

    "& .MuiSvgIcon-root": {
      fontSize: "1.5rem",
    },

    [theme.breakpoints.down(375)]: {
      width: 25,
      height: 25,
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem",
      },
    },
  },
  list: {
    padding: "0 20px 10px",
    listStyle: "none",
    overflowY: "scroll",
    height: "calc(100% - 100px)",
    marginTop: 20,

    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: 10,
      background: "#F5F5F5",
    },

    "&::-webkit-scrollbar": {
      width: 5,
      background: "#F5F5F5",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      background: theme.palette.primary.main,
    },

    "& li": {
      padding: "5px",
      marginBottom: 13,
      borderBottom: "1px solid #ccc",
    },

    [theme.breakpoints.down(375)]: {
      padding: "0 10px 5px",
    },
  },
  en: {
    fontWeight: 500,
    textTransform: "capitalize",
    marginRight: 10,
    [theme.breakpoints.down(375)]: {
      fontSize: 14,
    },
  },
  vi: {
    textTransform: "lowercase",
    [theme.breakpoints.down(375)]: {
      fontSize: 14,
    },
  },
}));

const Print = ({ dataPrint, setDataPrint }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.cover} onClick={() => setDataPrint(null)}></div>
      <Paper className={classes.paper}>
        <div className={classes.close} onClick={() => setDataPrint(null)}>
          <CloseIcon />
        </div>

        <Typography variant="h6">Communication</Typography>

        <ul className={classes.list}>
          {dataPrint.map((element, index) => (
            <>
              <li>
                <span className={classes.en}>{`${index + 1}. ${
                  element.en
                }:`}</span>
                <span className={classes.vi}>{element.vi}</span>
              </li>
            </>
          ))}
        </ul>
      </Paper>
    </div>
  );
};

export default Print;
