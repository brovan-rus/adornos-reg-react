import React from "react";
import ClientChip from "./ClientChip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  teacher,
  onTeacherBookLoginedUser,
  onTeacherBookUnloginedUser,
  onTeacherUnbook,
  onCardDelete,
  isRegistrationOpen,
  onSelect,
  onDeselect,
  onCardEdit,
  selectedTeachersList,
}) {
  const { isAdmin, isLoggedIn, tickets } = React.useContext(CurrentUserContext);
  const currentUser = React.useContext(CurrentUserContext);
  const [isSelected, setIsSelected] = React.useState();

  React.useEffect(() => {
    setIsSelected(
      selectedTeachersList &&
        selectedTeachersList.some((selectedTeacher) => {
          return selectedTeacher._id === teacher._id;
        })
    );
  }, [selectedTeachersList, teacher._id]);

  function handleCardDelete() {
    onCardDelete(teacher);
  }

  function handleCardEdit() {
    onCardEdit(teacher);
  }

  const clients = teacher.clients ? teacher.clients.length : 0;

  let isUnbookButtonHidden = !teacher.clients.some(
    (client) => client._id === currentUser._id
  );

  const isButtonActive =
    (!(clients > 1) || teacher.price === 0) &&
    isRegistrationOpen &&
    (tickets > 0 || tickets === undefined);

  const handleBook = () => {
    if (!isLoggedIn || isAdmin) {
      onTeacherBookUnloginedUser(teacher);
    } else {
      onTeacherBookLoginedUser(teacher, currentUser);
    }
  };

  const handleSelect = () => {
    if (isSelected === false) {
      onSelect(teacher);
    } else {
      onDeselect(teacher);
    }
    setIsSelected(!isSelected);
  };

  console.log(tickets);

  const handleUnbook = (clientId) => {
    onTeacherUnbook(teacher, clientId);
  };

  return (
    <div className="mdl-card assistent-card mdl-shadow--2dp card">
      <div className={`card__controls ${!isAdmin && "card__controls_hidden"}`}>
        <button
          type="button"
          className="card__button_action_delete card__button"
          onClick={handleCardDelete}
        />

        <button
          type="button"
          className="card__button card__button_action_edit"
          onClick={handleCardEdit}
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
      {teacher.price > 0 && (
        <div className="mdl-card__menu">
          <span
            className="mdl-badge mdl-badge--dark-background card__mdl-badge_color_red"
            data-badge={2 - clients}
          >
            Свободно заходов
          </span>
        </div>
      )}
      <div className="mdl-card__supporting-text card__description">
        {teacher.description}
      </div>
      {teacher.price > 0 && (
        <div className="mdl-card__supporting-text">
          Стоимость захода составляет {teacher.price} руб.
        </div>
      )}
      <div className="two-columns">
        <div className="mdl-card__actions mdl-card--border mdl-card__actions_two-columns">
          <button
            className="mdl-button mdl-js-button mdl-button_bottom-margin mdl-button--raised mdl-js-ripple-effect mdl-button--accent card__mdl-button_color_red "
            disabled={!isButtonActive}
            onClick={handleBook}
          >
            {clients > 1 && teacher.price > 0 ? "Запись закрыта" : "Записаться"}
          </button>
          <button
            className="mdl-button mdl-js-button mdl-button_bottom-margin mdl-button--raised mdl-js-ripple-effect mdl-button--accent card__mdl-button_color_red "
            hidden={isUnbookButtonHidden}
            onClick={() => handleUnbook(currentUser._id)}
          >
            Отказаться
          </button>
        </div>

        <div>
          {isAdmin &&
            clients > 0 &&
            teacher.clients.map((client) => {
              return (
                <ClientChip
                  key={client._id}
                  className="assistent-card--person"
                  title={client.email}
                  onDelete={() => handleUnbook(client._id)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Card;
