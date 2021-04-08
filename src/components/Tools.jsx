import { useEffect, useRef } from "react";
import { makeStyles, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import SearchIcon from "@material-ui/icons/Search";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import SortIcon from "@material-ui/icons/Sort";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    right: theme.spacing(4),
    bottom: theme.spacing(4),

    "& .MuiSvgIcon-root": {
      background: "transparent",
      fill: "#03312E",
      width: 30,
      height: 30,
      cursor: "pointer",
      transition: ".4s",
    },
  },
  menuToggle: {
    position: "absolute",
    display: "grid",
    placeItems: "center",
    background: theme.palette.primary.main,
    zIndex: 5,
    right: 0,
    bottom: 0,
    width: 50,
    height: 50,
    borderRadius: "50%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    zIndex: 5,
    cursor: "pointer",
    transition: ".3s",

    "&:hover": {
      transform: "scale(1.04)",
      transition: ".3s",
    },

    "&.open .MuiSvgIcon-root": {
      transform: "rotate(225deg)",
    },
  },
  menuRound: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 3,

    "&.open div:nth-of-type(1)": {
      right: 0,
      bottom: "4.5em",
      transitionDelay: "0.2s",
    },

    "&.open div:nth-of-type(2)": {
      right: "3.25em",
      bottom: "3.25em",
      transitionDelay: "0.1s",
    },

    "&.open div:nth-of-type(3)": {
      right: "4.5em",
      bottom: 0,
    },
  },
  btnApp: {
    display: "grid",
    placeItems: "center",
    position: "absolute",
    width: 40,
    height: 40,
    bottom: "0.5em",
    right: "0.5em",
    transition: "0.4s",
    background: theme.palette.primary.main,
    borderRadius: "50%",
    boxShadow: "2px 2px 1px 1px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",

    "&:hover": {
      opacity: "0.8",
      transform: "scale(1.08)",
    },

    "& .MuiSvgIcon-root": {
      width: 20,
      height: 20,
    },
  },
  menuLine: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 2,

    "& .sort": {
      background: theme.palette.secondary.main,
    },

    "&.open .searchTool": {
      right: "0rem",
      bottom: "7.7rem",
      transitionDelay: "0.3s",
    },

    "&.open .sort:nth-of-type(2)": {
      right: "0rem",
      bottom: "10.8rem",
      transitionDelay: "0.35s",
    },

    "&.open .sort:nth-of-type(3)": {
      right: "0rem",
      bottom: "13.9rem",
      transitionDelay: "0.4s",
    },

    "&.open .sort:nth-of-type(4)": {
      right: "0rem",
      bottom: "17rem",
      transitionDelay: "0.45s",
    },
  },

  searchField: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: "0.5em",
    right: "0.5em",
    transition: "0.4s",

    "& input": {
      marginRight: -25,
      height: 30,
      width: 0,
      padding: 0,
      color: "#777",
      background: `${theme.palette.secondary.main}a9`,
      fontSize: 13,
      fontWeight: 600,
      borderRadius: 100,
      border: "2px solid transparent",
      outline: "none",
      zIndex: 0,
      transition: ".4s ease-out",
    },

    "&.open input": {
      border: `2px solid ${theme.palette.secondary.main}`,
      width: 200,
      padding: "2px 30px 2px 15px",
      transition: ".4s ease-out",
    },

    "&.open .icon": {
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5) !important",
      transform: "scale(1.08) !important",
    },
  },

  searchIcon: {
    zIndex: 1,
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    background: theme.palette.secondary.main,
    borderRadius: "50%",
    boxShadow: "2px 2px 1px 1px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    transition: "0.4s",

    "& .MuiSvgIcon-root": {
      width: 20,
      height: 20,
    },

    "&:hover": {
      transform: "scale(1.08)",
    },
  },
}));

const Tools = ({ setIsOpenCreateTopic }) => {
  const classes = useStyles();
  const menuToggle = useRef();
  const menuRound = useRef();
  const menuLine = useRef();
  const searchField = useRef();

  let timeout; // dùng để clear setTimeout

  // Đóng/Mở các công cụ
  const handleOpen = () => {
    const checkOpen = searchField.current.classList.value.includes("open");
    let delay = checkOpen ? 500 : 0;
    checkOpen && searchField.current.classList.remove("open");

    timeout = setTimeout(() => {
      menuToggle.current.classList.toggle("open");
      menuRound.current.classList.toggle("open");
      menuLine.current.classList.toggle("open");
    }, delay);
  };

  // Mở trường tìm kiếm

  const openField = () => {
    searchField.current.classList.toggle("open");
  };

  useEffect(() => {
    return clearTimeout(timeout);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.menuToggle} ref={menuToggle} onClick={handleOpen}>
        <MenuIcon />
      </div>
      <div className={classes.menuRound} ref={menuRound}>
        <div className={classes.btnApp}>
          <Tooltip
            title={
              <>
                <Typography>Kiểm tra từ vựng</Typography>
                <p>Kiểm tra tất cả từng vựng theo từng chủ đề</p>
              </>
            }
          >
            <LowPriorityIcon />
          </Tooltip>
        </div>

        <div className={classes.btnApp}>
          <Tooltip
            title={
              <>
                <Typography>Kiểm tra từ vựng</Typography>
                <p>Kiểm tra ngẫu nhiên tất cả từng vựng </p>
              </>
            }
          >
            <ShuffleIcon />
          </Tooltip>
        </div>

        <div
          className={classes.btnApp}
          onClick={() => setIsOpenCreateTopic(true)}
        >
          <Tooltip
            title={
              <>
                <Typography>Tạo chủ đề</Typography>
                <p>Từ vựng phải được đặt trong một chủ đề</p>
              </>
            }
          >
            <AddIcon />
          </Tooltip>
        </div>
      </div>

      <div className={classes.menuLine} ref={menuLine}>
        <div className={`${classes.searchField} searchTool`} ref={searchField}>
          <input type="text" placeholder="nhập từ khóa" />
          <div className={`${classes.searchIcon} icon`} onClick={openField}>
            <Tooltip title="Tìm kiếm">
              <SearchIcon />
            </Tooltip>
          </div>
        </div>

        <div className={`${classes.btnApp} sort`}>
          <Tooltip title="Sắp xếp theo ký tự">
            <SortByAlphaIcon />
          </Tooltip>
        </div>

        <div className={`${classes.btnApp} sort`}>
          <Tooltip title="Sắp xếp theo thời gian tạo">
            <ScheduleIcon />
          </Tooltip>
        </div>

        <div className={`${classes.btnApp} sort`}>
          <Tooltip title="Sắp xếp theo số lượng từ">
            <SortIcon />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Tools;
