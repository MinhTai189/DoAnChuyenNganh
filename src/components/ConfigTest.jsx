import { Button, makeStyles, Tooltip, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    padding: "60px 35px",

    "& .MuiTypography-h6": {
      width: "100%",
      textAlign: "center",
      marginBottom: 30,
      fontSize: 18,
    },
  },
  select: {
    width: "100%",
    marginBottom: 40,

    "& .title": {
      padding: "2px 0",
      marginBottom: 5,
      borderBottom: "2px solid #ccc",
    },

    "& .option": {
      width: "100%",
      display: "flex",

      "& .item": {
        width: 35,
        height: 35,
        background: theme.palette.primary.main,
        display: "grid",
        placeItems: "center",
        marginRight: 25,
        cursor: "pointer",
        opacity: 0.7,
        transition: ".4s",

        "&:hover": {
          opacity: 1,
          transition: ".4s",
        },

        "& svg": {
          width: "50%",
          height: "50%",
        },
      },
    },
  },
  btn: {
    background: theme.palette.primary.main,
    width: "100%",
    height: 55,
    borderRadius: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    textTransform: "capitalize",
    transition: ".4s",

    "&:hover": {
      background: `${theme.palette.primary.main}da`,
      transition: ".4s",
    },
  },
  close: {
    width: 30,
    height: 30,
    background: theme.palette.primary.main,
    display: "grid",
    placeItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
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
}));

const ConfigTest = (props) => {
  const { config, setConfig, setBeginTest, setOpenTest, amount } = props;
  const classes = useStyles();

  // lưu lại các lựa chọn
  const onClick = (select, option) => {
    setConfig({ ...config, [select]: option });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.close} onClick={() => setOpenTest(false)}>
        <CloseIcon />
      </div>
      <Typography variant="h6">Hãy thiết lập bài kiểm tra của bạn</Typography>
      <div className={classes.select}>
        <div className="title">Chọn chế độ</div>

        <div className="option">
          <Tooltip title="Điền vào chỗ trống" arrow>
            <div
              className="item"
              style={{ opacity: config.mode === "fill" ? 1 : 0.7 }}
              onClick={() => onClick("mode", "fill")}
            >
              <BorderColorIcon />
            </div>
          </Tooltip>
          <Tooltip title="Chọn đáp án đúng" arrow>
            <div
              className="item"
              style={{ opacity: config.mode === "quiz" ? 1 : 0.7 }}
              onClick={() => onClick("mode", "quiz")}
            >
              <PlaylistAddCheckIcon />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className={classes.select}>
        <div className="title">Chọn chiều phiên dịch</div>
        <div className="option">
          <Tooltip title="EN --> VI" arrow>
            <div
              className="item"
              style={{ opacity: config.direc === "en" ? 1 : 0.7 }}
              onClick={() => onClick("direc", "en")}
            >
              <ArrowForwardIcon />
            </div>
          </Tooltip>
          <Tooltip title="VI --> EN" arrow>
            <div
              className="item"
              style={{ opacity: config.direc === "vi" ? 1 : 0.7 }}
              onClick={() => onClick("direc", "vi")}
            >
              <ArrowBackIcon />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className={classes.select}>
        <div className="title">Chọn số lượng từ</div>
        <div className="option">
          <div
            className="item"
            style={{ opacity: config.amount === 10 ? 1 : 0.7 }}
            onClick={() => onClick("amount", 10)}
          >
            10
          </div>
          {amount >= 15 && (
            <div
              className="item"
              style={{ opacity: config.amount === 15 ? 1 : 0.7 }}
              onClick={() => onClick("amount", 15)}
            >
              15
            </div>
          )}
          {amount >= 20 && (
            <div
              className="item"
              style={{ opacity: config.amount === 20 ? 1 : 0.7 }}
              onClick={() => onClick("amount", 20)}
            >
              20
            </div>
          )}
        </div>
      </div>
      <Button className={classes.btn} onClick={() => setBeginTest(true)}>
        Bắt đầu <ArrowRightAltIcon />
      </Button>
    </div>
  );
};

export default ConfigTest;
