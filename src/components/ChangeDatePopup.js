import React from "react";
import PopupWithForm from "./PopupWithForm";

function ChangeDatePopup({ isOpen, onClose, onDateChange }) {
  const [date, setDate] = React.useState();
  const handleSetDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDateChange(date);
  };

  React.useEffect(() => {
    setDate(0);
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Изменить дату практики"
      submitButtonText="Изменить"
      content="date-change"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_info_name"
        id="teacher-name-input"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        type="date"
        name="date"
        placeholder="Имя и фамилия клиента"
        value={date}
        onChange={handleSetDate}
      />
    </PopupWithForm>
  );
}

export default ChangeDatePopup;
