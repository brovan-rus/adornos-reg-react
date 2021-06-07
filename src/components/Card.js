import React from "react";
import ClientChip from "./ClientChip";
function Card({
  teacher,
  user,
  onTeacherBook,
  onTeacherUnbook,
  onCardDelete,
  isRegistrationOpen,
  onSelect,
  onDeselect,
  selectedTeachersList,
}) {
  const [isSelected, setIsSelected] = React.useState();

  React.useEffect(() => {
    setIsSelected(
      selectedTeachersList &&
        selectedTeachersList.some((selectedTeacher) => {
          return selectedTeacher._id === teacher._id;
        })
    );
  }, []);

  function handleCardDelete() {
    onCardDelete(teacher);
  }
  const clients = teacher.clients ? teacher.clients.length : 0;

  const isButtonActive = !(clients > 1) && isRegistrationOpen;

  const handleBook = () => {
    onTeacherBook(teacher);
  };

  const handleSelect = () => {
    if (isSelected === false) {
      onSelect(teacher);
    } else {
      onDeselect(teacher);
    }
    setIsSelected(!isSelected);
  };

  const handleUnbook = (clientId) => {
    onTeacherUnbook(teacher, clientId);
  };

  return (
    <div className="mdl-card assistent-card mdl-shadow--2dp card">
      <div
        className={`card__controls ${!user.isAdmin && "card__controls_hidden"}`}
      >
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
          Свободно заходов
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
        </div>

        <div>
          {
            //user.isAdmin &&
            clients > 0 &&
              teacher.clients.map((client) => {
                return (
                  <ClientChip
                    key={client.id}
                    className="assistent-card--person"
                    title={client.email}
                    onDelete={() => handleUnbook(client.id)}
                  />
                );
              })
          }
        </div>
      </div>
    </div>
  );
}

export default Card;
