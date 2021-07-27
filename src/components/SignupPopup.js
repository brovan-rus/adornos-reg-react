import React from "react";
import PopupWithForm from "./PopupWithForm";

function SignupPopup({ isOpen, onClose, onSignup, buttonText }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  const [name, setName] = React.useState();

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSetPasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    onSignup(user);
  };

  React.useEffect(() => {
    setPassword("");
    setEmail("");
  }, [isOpen, buttonText]);

  return (
    <PopupWithForm
      title="Зарегистрироваться"
      submitButtonText={buttonText}
      content="signup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        type="text"
        name="email"
        placeholder="Представьтесь, пожалуйста"
        value={name}
        onChange={handleSetName}
      />
      <input
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        type="text"
        name="email"
        placeholder="Адрес электронной почты"
        value={email}
        onChange={handleSetEmail}
      />

      <input
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        type="text"
        name="phone"
        placeholder="Адрес электронной почты"
        value={email}
        onChange={handleSetEmail}
      />

      <input
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        minLength="2"
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handleSetPassword}
      />

      <input
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        minLength="2"
        type="password"
        name="password"
        placeholder="Пароль"
        value={passwordConfirm}
        onChange={handleSetPasswordConfirm}
      />
    </PopupWithForm>
  );
}

export default SignupPopup;
