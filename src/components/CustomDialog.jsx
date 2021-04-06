import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiDialogContent-root": {
      overflowY: "hidden",
    },

    "& .MuiDialog-paper": {
      margin: 8,
    },
  },
});

const CustomDialog = (props) => {
  const {
    open,
    close,
    title,
    content,
    cancel,
    agree,
    colorTitle = "transparent",
    eventAgree,
    eventCancel,
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={() => {
        close(false);
        eventCancel();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ background: `${colorTitle}` }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {cancel && (
          <Button
            onClick={() => {
              close(false);
              eventCancel();
            }}
            color="primary"
          >
            {cancel}
          </Button>
        )}
        <Button
          onClick={() => {
            close(false);
            eventAgree();
          }}
          color="primary"
          autoFocus
        >
          {agree}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
