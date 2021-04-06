import { Avatar, FormHelperText, Switch } from "@material-ui/core";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import { makeStyles } from "@material-ui/styles";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar";
import Details from "./Details";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../features/darkmode/DarkModeSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 55,
    padding: `0 ${theme.spacing(2)}px`,
    background: "#8FB339",
  },
  items: {
    display: "flex",
    alignItems: "center",
  },
  switch: {
    "& .MuiSwitch-switchBase": {
      top: "-3.5px",
    },
    "& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#efb815",
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(15px)",
    },
    "& .MuiSvgIcon-root": {
      fill: "#efb815",
      fontSize: "1.7rem",
    },
    "& .Mui-checked .MuiSvgIcon-root": {
      fill: "#221e1f",
    },
  },
  avatar: {
    height: "36px",
    width: "36px",
    marginLeft: "15px",
    cursor: "pointer",
    border: "1px solid black",

    "&:hover": {
      boxShadow: "0 0 1px 7px rgba(0,0,0,0.05)",
    },
  },
  more: {
    position: "absolute",
    top: "120%",
    right: 4,
    width: 201,
    height: 300,
    background: "grey",
    zIndex: 100,
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <nav className={classes.root}>
        <div className={classes.items}>
          <Switch
            className={classes.switch}
            icon={<Brightness7RoundedIcon />}
            checkedIcon={<Brightness4RoundedIcon />}
            size="medium"
            inputProps={{ "aria-label": "secondary checkbox" }}
            onChange={() => dispatch(changeStatus())}
          />

          <Avatar
            className={classes.avatar}
            src="https://icapi.org/wp-content/uploads/2019/10/anh-dai-dien-facebook-de-thuong-77.jpg"
            alt="Avatar"
            onClick={() => setIsOpenDetail(true)}
          />
        </div>
      </nav>
      {isOpenDetail && <Details setIsOpenDetail={setIsOpenDetail} />}
    </>
  );
};

export default Nav;
