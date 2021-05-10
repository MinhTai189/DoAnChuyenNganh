import { useEffect, useRef, useState } from "react";
import { makeStyles, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import SearchIcon from "@material-ui/icons/Search";
import ScheduleIcon from "@material-ui/icons/Schedule";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import SortIcon from "@material-ui/icons/Sort";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

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
    background: "linear-gradient(45deg, #8fb339 ,  #a8e063 )",
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
    background: "linear-gradient(45deg, #8fb339 ,  #a8e063 )",
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
      background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
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
    "&.open span": {
      opacity: 1,
      transition: "opacity .5s",
      transitionDelay: ".5s",
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
      background: "#6dd5ed",
      fontSize: 13,
      fontWeight: 600,
      borderRadius: 100,
      border: "2px solid transparent",
      outline: "none",
      zIndex: 0,
      transition: ".4s ease-out",
    },

    "&.open input": {
      border: `2px solid #6dd5ed`,
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
    background: "linear-gradient(45deg, #2193b0, #6dd5ed)",
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
  order: {
    position: "absolute",
    opacity: 0,

    "& .MuiSvgIcon-root": {
      fill: theme.palette.text.primary,
    },
  },
}));

const Tools = (props) => {
  const {
    setIsOpen,
    dataFinding,
    setDataFinding,
    setValueSort,
    isVocab = false,
    handleTest,
    isTopic = false,
  } = props;
  const classes = useStyles();
  const menuToggle = useRef();
  const [order, setOrder] = useState(null);

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

  const handleOrder = (order) => {
    setOrder((old) => {
      if (old === null) return { order, column: "asc" };
      if (old.order === order) {
        if (old.column === "asc") return { ...old, column: "des" };
        return null;
      } else return { order, column: "asc" };
    });
  };

  useEffect(() => {
    return clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setValueSort(order);
  }, [order]);

  return (
    <div className={classes.root}>
      <div className={classes.menuToggle} ref={menuToggle} onClick={handleOpen}>
        <MenuIcon />
      </div>
      <div className={classes.menuRound} ref={menuRound}>
        <div className={classes.btnApp} onClick={() => handleTest("type1")}>
          <Tooltip
            title={
              <>
                <Typography>Kiểm tra từ vựng</Typography>
                <p>
                  {isTopic
                    ? "Kiểm tra tất cả theo mức độ hay quên"
                    : "Kiểm tra tất cả từng vựng"}
                </p>
              </>
            }
          >
            <LowPriorityIcon />
          </Tooltip>
        </div>

        <div className={classes.btnApp} onClick={() => handleTest("type2")}>
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

        <div className={classes.btnApp} onClick={() => setIsOpen(true)}>
          <Tooltip
            title={
              isTopic ? (
                <>
                  <Typography>Tạo chủ đề</Typography>
                  <p>Từ vựng phải được đặt trong một chủ đề</p>
                </>
              ) : (
                <>
                  <Typography>Tạo từ vựng</Typography>
                  <p>Lưu từ vựng vào chủ đề</p>
                </>
              )
            }
          >
            <AddIcon />
          </Tooltip>
        </div>
      </div>

      <div className={classes.menuLine} ref={menuLine}>
        <div className={`${classes.searchField} searchTool`} ref={searchField}>
          <input
            type="text"
            placeholder="nhập từ khóa"
            value={dataFinding}
            onChange={(e) => setDataFinding(e.target.value)}
          />
          <div className={`${classes.searchIcon} icon`} onClick={openField}>
            <Tooltip title="Tìm kiếm">
              <SearchIcon />
            </Tooltip>
          </div>
        </div>

        <div
          className={`${classes.btnApp} sort`}
          onClick={() => handleOrder("alphabet")}
        >
          <Tooltip title="Sắp xếp theo ký tự">
            <SortByAlphaIcon />
          </Tooltip>
          {order && order.order === "alphabet" && (
            <span
              className={classes.order}
              style={
                order.column === "asc"
                  ? { right: 26, top: -7, transform: "rotate(-45deg)" }
                  : { right: 26, bottom: -7, transform: "rotate(-135deg)" }
              }
            >
              <ArrowDropUpIcon />
            </span>
          )}
        </div>

        <div
          className={`${classes.btnApp} sort`}
          onClick={() => handleOrder("date")}
        >
          <Tooltip title="Sắp xếp theo thời gian tạo">
            <ScheduleIcon />
          </Tooltip>
          {order && order.order === "date" && (
            <span
              className={classes.order}
              style={
                order.column === "asc"
                  ? { right: 26, top: -7, transform: "rotate(-45deg)" }
                  : { right: 26, bottom: -7, transform: "rotate(-135deg)" }
              }
            >
              <ArrowDropUpIcon />
            </span>
          )}
        </div>

        <div
          className={`${classes.btnApp} sort`}
          onClick={() => handleOrder("quantity")}
        >
          <Tooltip
            title={
              isVocab
                ? "Sắp xếp theo mức độ hay quên"
                : "Sắp xếp theo số lượng từ"
            }
          >
            {isVocab ? <HourglassEmptyIcon /> : <SortIcon />}
          </Tooltip>
          {order && order.order === "quantity" && (
            <span
              className={classes.order}
              style={
                order.column === "asc"
                  ? { right: 26, top: -7, transform: "rotate(-45deg)" }
                  : { right: 26, bottom: -7, transform: "rotate(-135deg)" }
              }
            >
              <ArrowDropUpIcon />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;
