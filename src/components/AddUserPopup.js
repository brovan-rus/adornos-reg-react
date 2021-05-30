import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddTeacherPopup({ isOpen, onClose, onUserAdd }) {
  const [fullName, setFullName] = React.useState("");
  const [userName, setUserName] = React.useState(false);
  const [password, setPassword] = React.useState();

  const handleSetFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleSetUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUserAdd(userName, fullName, password);
  };

  React.useEffect(() => {
    setPassword("");
    setUserName("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Добавить клиента"
      submitButtonText="Добавить"
      content="user-add"
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
        type="text"
        name="fullName"
        placeholder="Имя и фамилия клиента"
        value={fullName}
        onChange={handleSetFullName}
      />

      <input
        className="form__input form__input_info_name"
        id="teacher-name-input"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        type="text"
        name="userName"
        placeholder="Имя пользователя"
        value={userName}
        onChange={handleSetUserName}
      />

      <input
        className="form__input form__input_info_name"
        id="teacher-name-input"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handleSetPassword}
      />
    </PopupWithForm>
  );
}

export default AddTeacherPopup;
