import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddTeacherPopup({ isOpen, onClose, onTeacherAdd }) {
  const [name, setName] = React.useState();
  const [isGuest, setIsGuest] = React.useState();
  const [url, setUrl] = React.useState();
  const handleSetIsGuest = (e) => {
    setIsGuest(e.target.checked);
  };
  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const teacher = {
      name: name,
      photoUrl: url,
      isGuest: isGuest,
    };
    onTeacherAdd(teacher);
  };

  React.useEffect(() => {
    setName("");
    setUrl("");
    setIsGuest(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Добавить преподавателя"
      submitButtonText="Добавить"
      content="teacher-add"
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
        name="name"
        placeholder="Имя и фамилия преподавателя"
        value={name}
        onChange={handleSetName}
      />

      <input
        className="form__input form__input_info_name"
        id="teacher-name-input"
        required
        autoComplete="off"
        minLength="2"
        type="text"
        name="url"
        placeholder="Ссылка на URL адрес фотографии"
        value={url}
        onChange={handleSetUrl}
      />
      <div className="form__container">
        <span className="form__text">Приглашённый преподаватель?</span>
        <input
          className="form__input form__input_type_checkbox"
          id="card-link-input"
          type="checkbox"
          name="guest"
          checked={isGuest}
          onChange={handleSetIsGuest}
        />
      </div>
    </PopupWithForm>
  );
}

export default AddTeacherPopup;
