import IconButton from "@mui/material/IconButton/IconButton";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

type AlertSnackBarProps = {
  open: boolean;
  text: string;
  severity?: "error" | "warning" | "info" | "success";
  setIsOpenAlert: (isOpenAlert: boolean) => void;
  onClose?: () => void;
};

function AlertSnackBar({
  open,
  text,
  severity = "info",
  onClose = () => { },
  setIsOpenAlert,
}: AlertSnackBarProps) {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpenAlert(false);
    onClose();
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        action={action}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

export default AlertSnackBar;
