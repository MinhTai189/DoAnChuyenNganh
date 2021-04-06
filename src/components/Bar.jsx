import { Fab, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    alignItems: "center",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    border: "1px solid",
    // padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    borderRadius: 100,
  },
  field: {
    flex: 1,

    "& input": {
      padding: "10px",
      borderRadius: 100,
      outline: "none",
      fontSize: 15,
    },
  },
  sort: {},
}));

const Bar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.field}>
        <input type="text" />

        <Fab variant="extended" size="small" color="primary" aria-label="add">
          <SearchIcon />
        </Fab>
      </div>

      <div className={classes.sort}>
        <Fab variant="extended" size="small" color="primary" aria-label="add">
          <DateRangeIcon />
        </Fab>
        <Fab variant="extended" size="small" color="primary" aria-label="add">
          <SortByAlphaIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Bar;
