function Card({
  teacher,
  user,
  onTeacherBook,
  onTeacherUnbook,
  onCardDelete,
  isRegistrationOpen,
  isLoggedIn,
}) {
  function handleCardDelete() {
    onCardDelete(teacher);
  }
  const clients = teacher.clients ? teacher.clients.length : 0;
  // const isButtonDisabled =
  //   clients > 1 && !teacher.isBookedByMe && !isRegistrationOpen && !isLoggedIn;
  const isButtonActive = isLoggedIn && !(clients > 1) && isRegistrationOpen;

  const isBookedByMe =
    clients > 0 &&
    teacher.clients.some((client) => client.clientId === user.userId);

  // console.log(teacher.clients.some((client) => client._id === user.userId));

  // console.log(isBookedByMe);

  // card.likes.some(
  //   (like) => like._id === currentUser.userId
  // );

  const handleBook = () => {
    onTeacherBook(teacher, isBookedByMe);
  };

  const handleUnbook = () => {
    onTeacherUnbook(teacher, isBookedByMe);
  };

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
