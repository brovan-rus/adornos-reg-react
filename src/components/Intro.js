function Intro({
  date,
  isAdmin,
  handleOpenDateChangePopup,
  isRegistrationOpen,
}) {
  return (
    <section className="mdl-cell intro mdl-cell--12-col">
      <h2
        onClick={isAdmin ? handleOpenDateChangePopup : ""}
        className={`mdl-typography--title-color-contrast mdl-typography--text-center ${
          isAdmin && "change-title"
        }`}
      >
        Регистрация на практику {date}
      </h2>
      <h2 className="mdl-typography--title-color-contrast mdl-typography--text-center intro-subtitle">
        {isRegistrationOpen && "открыта!"}
      </h2>
      <p className="mdl-typography--body-1-color-contrast mdl-typography--font-light">
        Для выбора ассистента и записи на практику необходимо
        зарегистрироваться. Запись открывается за неделю до начала практики.
      </p>
      <p className="mdl-typography--body-1-color-contrast mdl-typography--font-light">
        На текущей практике будут ассистировать:
      </p>
    </section>
  );
}

export default Intro;
