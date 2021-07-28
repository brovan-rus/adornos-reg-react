import React from "react";
import PopupWithForm from "./PopupWithForm";

function SignupPopup({ isOpen, onClose, onSignup, buttonText }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState();
  const [name, setName] = React.useState();
  const [phone, setPhone] = React.useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handleSetPhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSetName = (e) => {
    setName(e.target.value);
  };

  React.useEffect(() => {
    if (password === passwordConfirm) {
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
    }
  }, [password, passwordConfirm]);

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSetPasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showPasswordError) {
      const user = {
        email: email,
        password: password,
        name: name,
        phone: phone,
      };
      onSignup(user);
    }
  };

  React.useEffect(() => {
    setPassword("");
    setEmail("");
    setPasswordConfirm("");
    setName("");
    setPhone("");
  }, [isOpen]);

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
        placeholder="Контактный телефон"
        value={phone}
        onChange={handleSetPhone}
      />

      <div className="form__password-wrapper">
        <span
          className="form__password-icon"
          onMouseOver={handleShowPassword}
          onMouseLeave={handleHidePassword}
        />

        <input
          className="form__input form__input_info_name form__input_type_password"
          required
          autoComplete="off"
          minLength="2"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handleSetPassword}
        />
      </div>

      <input
        className="form__input form__input_info_name form__input_type_password-confirm"
        required
        autoComplete="off"
        minLength="2"
        type="password"
        name="password"
        placeholder="Повторите пароль"
        value={passwordConfirm}
        onChange={handleSetPasswordConfirm}
      />
      <span
        className={
          showPasswordError
            ? "form__password-error"
            : "form__password-error form__password-error_hidden"
        }
      >
        Введённые Вами пароли не совпадают
      </span>
    </PopupWithForm>
  );
}

export default SignupPopup;
