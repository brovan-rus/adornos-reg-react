function Card({ teacher, user, handleBook, onCardDelete, isRegistrationOpen }) {
  function handleCardDelete() {
    onCardDelete(teacher);
  }
  const clients = teacher.clients ? teacher.clients.length : 0;
  return (
    <div className="mdl-card assistent-card mdl-shadow--2dp">
      <button
        type="button"
        className={
          user.isAdmin ? "card__trash-button" : "card__trash-button_inactive"
        }
        onClick={handleCardDelete}
      />
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
      <div className="mdl-card__supporting-text">
        {teacher.isGuest
          ? "Приглашённый ассистент. Стоимость прохода - 1000 рублей."
          : "Ассистент Adornos Center. Стоимость прохода - 2000 рублей."}
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          disabled={clients > 1 && !teacher.isBookedByMe && !isRegistrationOpen}
          onClick={handleBook}
        >
          {teacher.isBookedByMe && "Отказаться"}
          {clients > 1 && !teacher.isBookedByMe
            ? "Запись закрыта"
            : "Записаться"}
        </button>

        <div>
          {clients > 0 &&
            teacher.clients.map((client) => {
              return (
                <p key={client.clientId} className="assistent-card--person">
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
