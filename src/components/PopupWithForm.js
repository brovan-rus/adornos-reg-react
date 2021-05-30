import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  content,
  title,
  children,
  isOpen,
  onClose,
  submitButtonText,
  onSubmit,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} content="form">
      <h2 className="popup__title">{title}</h2>
      <form
        name={content}
        className="form"
        action="#"
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button className="form__submit-button" type="submit">
          {submitButtonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
