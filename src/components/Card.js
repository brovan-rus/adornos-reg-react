function Card({ card, user, handleBook, onCardDelete, isRegistrationOpen }) {
  function handleCardDelete() {
    onCardDelete(card);
  }
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
          src={card.photoURL}
          alt={card.name}
        />
      </div>
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">{card.name}</h2>
      </div>
      <div className="mdl-card__menu">
        <span
          className="mdl-badge mdl-badge--dark-background"
          data-badge={card.dances}
        >
          Свободно проходов
        </span>
      </div>
      <div className="mdl-card__supporting-text">
        {card.isGuest
          ? "Ассистент Adornos Center. Стоимость прохода - 2000 рублей."
          : "Приглашённый ассистент. Стоимость прохода - 1000 рублей."}
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
          disabled={
            card.clients.length > 1 && !card.isBookedByMe && !isRegistrationOpen
          }
          onClick={handleBook}
        >
          {card.isBookedByMe && "Отказаться"}
          {card.clients.length > 1 && !card.isBookedByMe
            ? "Запись закрыта"
            : "Записаться"}
        </button>

        <div>
          {card.clients.length > 0 &&
            card.clients.map((client) => {
              return (
                <p key={client.id} className="assistent-card--person">
                  {client.name}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Card;
