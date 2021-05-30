import { Link } from "react-router-dom";
function Header({
  isAdmin,
  handleLoginPopupOpen,
  handleAddUserPopupOpen,
  handleTeacherPopupOpen,
  isLoggedIn,
}) {
  return (
    <>
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <h1 className="mdl-layout-title">Регистрация на практику</h1>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            {!isLoggedIn && (
              <a
                onClick={handleLoginPopupOpen}
                className="mdl-navigation__link link"
              >
                Войти
              </a>
            )}

            {isAdmin && (
              <a
                className="mdl-navigation__link link"
                onClick={handleTeacherPopupOpen}
              >
                Добавить преподавателя
              </a>
            )}

            {isAdmin && (
              <a
                className="mdl-navigation__link link"
                onClick={handleAddUserPopupOpen}
              >
                Добавить пользователя
              </a>
            )}
          </nav>
        </div>
      </header>
      <div className="mdl-layout__drawer mdl-layout--small-screen-only">
        <span className="mdl-layout-title"></span>
        <nav className="mdl-navigation">
          {!isLoggedIn && (
            <a
              onClick={handleLoginPopupOpen}
              className="mdl-navigation__link link"
            >
              Войти
            </a>
          )}
          {/*<a className="mdl-navigation__link link" href="">*/}
          {/*  Выйти*/}
          {/*</a>*/}
          {isAdmin && (
            <a
              to="/"
              className="mdl-navigation__link link"
              onClick={handleTeacherPopupOpen}
            >
              Добавить преподавателя
            </a>
          )}

          {isAdmin && (
            <a
              className="mdl-navigation__link link"
              onClick={handleAddUserPopupOpen}
            >
              Добавить пользователя
            </a>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;
