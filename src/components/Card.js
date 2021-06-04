import React from "react";
function Card({
  teacher,
  user,
  onTeacherBook,
  onTeacherUnbook,
  onCardDelete,
  isRegistrationOpen,
  isLoggedIn,
  onSelect,
  onDeselect,
}) {
  function handleCardDelete() {
    onCardDelete(teacher);
  }
  const clients = teacher.clients ? teacher.clients.length : 0;
  const haveBookPossibility = user.tickets > 0;
  // console.log(user.tickets);

  const isButtonActive =
    isLoggedIn && !(clients > 1) && isRegistrationOpen && haveBookPossibility;

  const isBookedByMe =
    clients > 0 &&
    teacher.clients.some((client) => client.clientId === user._id);

  const handleBook = () => {
    onTeacherBook(teacher, isBookedByMe);
  };

  const handleUnbook = () => {
    onTeacherUnbook(teacher, isBookedByMe);
  };

  const [isSelected, setIsSelected] = React.useState(false);

  const handleSelect = () => {
    if (isSelected === false) {
      onSelect(teacher);
    } else onDeselect(teacher);
    setIsSelected(!isSelected);
  };

  return (
    <div className="mdl-card assistent-card mdl-shadow--2dp">
      <div className="card__controls">
        <button
          type="button"
          className="card__trash-button"
          onClick={handleCardDelete}
        />

        <input
          type="checkbox"
          className="card__select"
          checked={isSelected}
          onChange={handleSelect}
        />
      </div>

      <div className="mdl-card__media mdl-card--expand">
        <img
          className="assistent-card__image"
          src={teacher.photoUrl}
          alt={teacher.name}
        />
      </div>
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">{teacher.name}</h2>
      </div>
      <div className="mdl-card__menu">
        <span
          className="mdl-badge mdl-badge--dark-background"
          data-badge={2 - clients}
        >
          Свободно проходов
        </span>
      </div>
      <div className="mdl-card__supporting-text card__description">
        {teacher.description}
      </div>
      <div className="mdl-card__supporting-text">
        Стоимость захода составляет {teacher.price} руб.
      </div>
      <div className="two-columns">
        <div className="mdl-card__actions mdl-card--border mdl-card__actions_two-columns">
          <button
            className="mdl-button mdl-js-button mdl-button_bottom-margin mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            disabled={!isButtonActive}
            onClick={handleBook}
          >
            {clients > 1 ? "Запись закрыта" : "Записаться"}
          </button>

          {isBookedByMe && isLoggedIn && (
            <button
              className="mdl-button mdl-js-button mdl-button_bottom-margin mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              onClick={handleUnbook}
            >
              Отказаться
            </button>
          )}
        </div>

        <div>
          {clients > 0 &&
            teacher.clients.map((client, i) => {
              return (
                <p key={i} className="assistent-card--person">
                  {client.clientName}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Card;
