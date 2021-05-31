import React from "react";
import PopupWithForm from "./PopupWithForm";

function ChangeDatePopup({ isOpen, onClose, onDateChange, currentDate }) {
  const [date, setDate] = React.useState();
  const handleSetDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDateChange(date);
  };

  React.useEffect(() => {
    const formattedDate =
      currentDate && currentDate.toISOString().substr(0, 10);
    setDate(formattedDate);
    console.log(date);
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
        value={date}
        onChange={handleSetDate}
      />
    </PopupWithForm>
  );
}

export default ChangeDatePopup;
