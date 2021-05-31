import React from "react";
import PopupWithForm from "./PopupWithForm";

function LoginPopup({ isOpen, onClose, onLogin }) {
  const [userName, setUserName] = React.useState(false);
  const [password, setPassword] = React.useState();

  const handleSetUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      userName: userName,
      password: password,
    };
    onLogin(user);
  };

  React.useEffect(() => {
    setPassword("");
    setUserName("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Войти"
      submitButtonText="Войти"
      content="login"
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

export default LoginPopup;
