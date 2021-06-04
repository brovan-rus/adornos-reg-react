import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddTeacherPopup({ isOpen, onClose, onTeacherAdd, buttonText }) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [price, setPrice] = React.useState();
  const [url, setUrl] = React.useState();

  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSetPrice = (e) => {
    setPrice(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const teacher = {
      name: name,
      photoUrl: url,
      description: description,
      price: price,
    };
    onTeacherAdd(teacher);
  };

  React.useEffect(() => {
    setName("");
    setUrl("");
    setPrice(0);
    setDescription("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Добавить преподавателя"
      submitButtonText={buttonText}
      content="teacher-add"
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
        name="name"
        placeholder="Имя и фамилия преподавателя"
        value={name}
        onChange={handleSetName}
      />

      <input
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        minLength="2"
        type="text"
        name="url"
        placeholder="Ссылка на URL адрес фотографии"
        value={url}
        onChange={handleSetUrl}
      />

      <textarea
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        minLength="2"
        name="url"
        placeholder="Краткое описание преподавателя"
        value={description}
        onChange={handleSetDescription}
      />

      <span>Стоимость захода</span>

      <input
        className="form__input form__input_info_name"
        required
        autoComplete="off"
        minLength="2"
        type="number"
        name="url"
        placeholder=""
        value={price}
        onChange={handleSetPrice}
      />
    </PopupWithForm>
  );
}

export default AddTeacherPopup;
