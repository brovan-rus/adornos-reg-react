import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

function TeacherSelectSnackbar({ isOpen, onApprove, message }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={isOpen}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              className={`${
                message.split("Обновить").length < 2 && "snackbar__icon_hidden"
              }`}
              size="small"
              aria-label="close"
              color="inherit"
              onClick={onApprove}
            >
              <DoneOutlineIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default TeacherSelectSnackbar;
