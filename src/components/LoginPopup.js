import React from "react";
import PopupWithForm from "./PopupWithForm";

function LoginPopup({ isOpen, onClose, onLogin, buttonText }) {
  const [email, setEmail] = React.useState(false);
  const [password, setPassword] = React.useState();

  const handleSetUserName = (e) => {
    setEmail(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email.toLowerCase(),
      password: password,
    };
    onLogin(user);
  };

  React.useEffect(() => {
    setPassword("");
    setEmail("");
  }, [isOpen, buttonText]);

  return (
    <PopupWithForm
      title="Войти"
      submitButtonText={buttonText}
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
        name="email"
        placeholder="Адрес электронной почты"
        value={email}
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
