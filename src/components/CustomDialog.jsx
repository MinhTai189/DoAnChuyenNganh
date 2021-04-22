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
    handleClose,
    title,
    content,
    cancel,
    agree,
    colorTitle = "transparent",
    eventAgree,
    eventCancel,
    isMutiple = false,
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={() => {
        handleClose(false);
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
              handleClose(false);
              eventCancel();
            }}
            color="primary"
          >
            {cancel}
          </Button>
        )}
        <Button
          onClick={() => {
            handleClose(isMutiple);
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
