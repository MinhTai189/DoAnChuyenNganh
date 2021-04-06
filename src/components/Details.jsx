import { Button, Fab, Grid, Tooltip, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import EmailSharpIcon from "@material-ui/icons/EmailSharp";
import StarSharpIcon from "@material-ui/icons/StarSharp";
import TranslateSharpIcon from "@material-ui/icons/TranslateSharp";
import ViewListSharpIcon from "@material-ui/icons/ViewListSharp";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Chart from "./Chart";
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#042A2B",
    zIndex: 1000,
    padding: `0 ${theme.spacing(1)}px`,
  },
  container: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignSelf: "flex-start",
    paddingRight: theme.spacing(2),

    "& img": {
      height: 115,
      width: 115,
      objectFit: "cover",
      border: `3px solid ${theme.palette.primary.main}`,

      [theme.breakpoints.down("xs")]: {
        height: 100,
        width: 100,
      },
    },

    "& .MuiButton-root": {
      background: theme.palette.primary.main,
      textTransform: "capitalize ",
      color: "#fff",
      width: "100%",
      borderRadius: 0,
      paddingTop: theme.spacing(1),

      "&:hover": {
        opacity: 0.9,
      },
    },

    [theme.breakpoints.down("xs")]: {
      padding: 0,
      alignSelf: "center",
      marginBottom: theme.spacing(1),
    },
  },
  right: {
    flex: 1,
    alignSelf: "flex-start",
    borderLeft: `3px solid ${theme.palette.primary.main}`,

    [theme.breakpoints.down("xs")]: {
      border: "none",
      alignSelf: "center",
    },
  },
  header: {
    padding: "0px 5px 5px",
    textAlign: "center",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    margin: 5,

    "& .MuiTypography-h6": {
      fontSize: "1rem",
      lineHeight: 1.2,
      color: theme.palette.primary.main,
    },

    "& .MuiTypography-body1": {
      fontSize: ".8rem",
      color: "#ccc",
    },
  },
  contentDetail: {},
  row: {
    display: "inline-flex",
    alignItems: "center",
    padding: "2px 10px",
    cursor: "default",
    borderRadius: 100,
    background: "#67697C",
    margin: "5px 0 5px 18px",

    "& .MuiSvgIcon-root": {
      fill: theme.palette.primary.main,
      marginRight: theme.spacing(1),
    },

    "& .MuiTypography-body1": {
      color: "#ccc",
    },
  },
  containerChart: {
    "& .MuiTypography-root": {
      color: theme.palette.primary.main,
      padding: "10px 0 0 20px",

      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
      },
    },

    [theme.breakpoints.down("xs")]: {
      marginRight: theme.spacing(2),
    },
  },
  fixedIcon: {
    position: "fixed",
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    borderRadius: 0,
    height: 35,
    width: 35,

    "& .MuiSvgIcon-root": {
      fontSize: "2em",
      width: "1em",
      height: "1em",
    },
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const Details = ({ setIsOpenDetail }) => {
  const classes = useStyles();
  const [widthChart, setWidthChart] = useState();
  const width = useRef();
  const left = useRef();

  function handleResize() {
    setWidthChart(width.current?.offsetWidth - left.current?.offsetWidth - 2);
  }

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    setWidthChart(width.current.offsetWidth - left.current.offsetWidth);
    return window.removeEventListener("resize", handleResize);
  }, []);

  console.log(widthChart);

  return (
    <Grid className={classes.root} container>
      <Grid item xs={false} sm={1} md={3}></Grid>
      <Grid item xs={12} sm={10} md={6} ref={width}>
        <div className={classes.container}>
          <div className={classes.left} ref={left}>
            <img
              src="https://icapi.org/wp-content/uploads/2019/10/anh-dai-dien-facebook-de-thuong-77.jpg"
              alt="avatar"
            />

            <Button>Đăng xuất</Button>
          </div>

          <div className={classes.right}>
            <div className={classes.header}>
              <Typography variant="h6">Chào Tài Trần!</Typography>
              <Typography component="p">
                Hãy xem một số thống kê của bạn
              </Typography>
            </div>

            <div className={classes.contentDetail}>
              <LightTooltip title="Email của bạn" placement="left">
                <div className={classes.row}>
                  <EmailSharpIcon />
                  <Typography component="span">
                    tranminhtai189@gmail.com
                  </Typography>
                </div>
              </LightTooltip>
              <br />

              <LightTooltip title="Tổng số sao" placement="left">
                <div className={classes.row}>
                  <StarSharpIcon />
                  <Typography component="span">1200</Typography>
                </div>
              </LightTooltip>
              <br />

              <LightTooltip title="Tổng số chủ đề" placement="left">
                <div className={classes.row}>
                  <ViewListSharpIcon />
                  <Typography component="span">20</Typography>
                </div>
              </LightTooltip>
              <br />

              <LightTooltip title="Tổng số từ vựng" placement="left">
                <div className={classes.row}>
                  <TranslateSharpIcon />
                  <Typography component="span">100</Typography>
                </div>
              </LightTooltip>

              <div className={classes.containerChart}>
                <Typography component="p">
                  Bảng thống kê số giờ học trong tuần
                </Typography>
                <Chart width={widthChart} height={widthChart / 2} />
              </div>
            </div>
          </div>
        </div>

        <Fab
          className={classes.fixedIcon}
          color="primary"
          aria-label="add"
          onClick={() => setIsOpenDetail(false)}
        >
          <CloseOutlinedIcon />
        </Fab>
      </Grid>
      <Grid item xs={false} sm={1} md={3}></Grid>
    </Grid>
  );
};

export default Details;
