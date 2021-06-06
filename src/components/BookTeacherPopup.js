import React from "react";
import PopupWithForm from "./PopupWithForm";

function BookTeacherPopup({
  isOpen,
  onClose,
  onTeacherBook,
  teacher,
  buttonText,
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSetPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      fullName: name,
      email: email,
      phoneNumber: phoneNumber,
    };
    onTeacherBook(teacher, user);
  };

  React.useEffect(() => {
    setName("");
    setEmail("");
    setPhoneNumber("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Записаться к преподавателю"
      submitButtonText={buttonText}
      content="teacher-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        type="text"
        name="name"
        placeholder="Представьтесь пожалуйста"
        value={name}
        onChange={handleSetName}
      />

      <input
        className="form__input"
        required
        autoComplete="off"
        minLength="2"
        type="email"
        name="url"
        placeholder="Введите адрес электронной почты"
        value={email}
        onChange={handleSetEmail}
      />

      <input
        aria-invalid="false"
        aria-required="true"
        type="text"
        size="40"
        placeholder="Телефон 7(___)___-__-__"
        title="Номер должен содержать 11 цифр и начинаться с 7"
        //pattern="7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}"
        maxlength="15"
        id="phone"
        className="form__input"
        required
        autoComplete="off"
        name="phone"
        value={phoneNumber}
        onChange={handleSetPhoneNumber}
      />
    </PopupWithForm>
  );
}

export default BookTeacherPopup;
