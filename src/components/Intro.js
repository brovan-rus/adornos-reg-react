function Intro({ date, isAdmin, handleOpenDateChangePopup }) {
  return (
    <section className="mdl-cell intro mdl-cell--12-col">
      <h2
        onClick={isAdmin ? handleOpenDateChangePopup : ""}
        className={`mdl-typography--title-color-contrast mdl-typography--text-center ${
          isAdmin && "change-title"
        }`}
      >
        {" "}
        Регистрация на ближайшую практику школе Adornos Center {date}{" "}
        {date && "открыта!"}
      </h2>
      <p className="mdl-typography--body-1-color-contrast mdl-typography--font-light">
        Для выбора ассистента и записи на практике необходимо
        зарегистрироваться. Запись открывается ровно за неделю до начали
        практики.
      </p>
      <p className="mdl-typography--body-1-color-contrast mdl-typography--font-light">
        На текущей практике будут ассистировать:
      </p>
    </section>
  );
}

export default Intro;
