import { makeStyles, Typography } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import ggLogo from "../images/gg-logo.svg";
import fbLogo from "../images/fb-logo.svg";
import { firebaseAuth, providerFB, providerGG } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeItems: "center",
    padding: "0 5px",
    height: "100vh",
    width: "100vw",
    background:
      "linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    backgroundSize: "400% 400%",
    animation: `$change 10s ${theme.transitions.easing.easeInOut} infinite`,

    "& .MuiTypography-subtitle1": {
      marginBottom: 50,
      fontSize: "1.1rem",
      color: theme.palette.primary.main,
    },

    "& .MuiTypography-h6": {
      fontSize: "1rem",
    },
  },
  "@keyframes change": {
    "0%": {
      backgroundPosition: "0 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0 50%",
    },
  },
  container: {
    width: "100%",
    maxWidth: 400,
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(
      7
    )}px`,
    background: "#ffffff49",
    boxShadow: theme.shadows[20],
    [theme.breakpoints.down(375)]: {
      padding: `${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${theme.spacing(
        5
      )}px`,
    },
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    display: "grid",
    placeItems: "center",
    width: 55,
    height: 55,
    borderRadius: 5,
    background: theme.palette.primary.main,

    "& svg": {
      fill: "#fff",
      width: "1.5em",
      height: "1.5em",
    },
  },
  button: {
    position: "relative",
    width: "100%",
    height: 50,
    padding: "15px 0",
    cursor: "pointer",
    margin: "10px 0",
    color: "#fff",
    fontWeight: 500,
    boxShadow: theme.shadows[12],
    transition: ".3s",

    "& img": {
      position: "absolute",
      with: 20,
      height: 20,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      opacity: 0,
      transition: ".3s",
      fill: "#DB4437",
    },

    "& span": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",

      transition: ".3s",
    },

    "&:hover": {
      background:
        "linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1) !important",

      "& img": {
        transform: "translate(-40px, -50%)",
        opacity: 1,
      },

      "& .gg": {
        transform: "translate(-15px, -50%)",
        color: "#DB4437",
      },

      "& .fb": {
        transform: "translate(-15px, -50%)",
        color: "#4267B2",
      },
    },
  },
}));

const SigninPage = () => {
  const classes = useStyles();

  const signinWithGG = () => {
    firebaseAuth
      .signInWithPopup(providerGG)
      .then((result) => {})
      .catch((error) => {
        alert("Đăng nhập bằng Google không thành công!\n" + error);
      });
  };

  const signinWithFB = () => {
    firebaseAuth
      .signInWithPopup(providerFB)
      .then((result) => {})
      .catch((error) => {
        if (error.credential) {
          alert(
            "Email của bạn đã đăng nhập bằng Google. Hãy dùng tài khoản Google của bạn để đăng nhập!"
          );
        } else {
          alert("Đăng nhập bằng Facebook không thành công!\n" + error);
        }
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.flex}>
          <div className={classes.logo}>
            <AcUnitIcon />
          </div>

          <Typography variant="subtitle1">Sổ tay từ vựng tiếng Anh</Typography>

          <Typography variant="h6">Đăng nhập</Typography>

          <div
            className={classes.button}
            style={{ background: "#DB4437" }}
            onClick={() => signinWithGG()}
          >
            <img src={ggLogo} alt="Google Logo" />
            <span className="gg">Google</span>
          </div>

          <Typography variant="h6">hoặc</Typography>

          <div
            className={classes.button}
            style={{ background: "#4267B2" }}
            onClick={() => signinWithFB()}
          >
            <img src={fbLogo} alt="Facebook Logo" />
            <span className="fb">Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
