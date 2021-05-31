import "../index.css";
import Header from "./Header";
import Intro from "./Intro";
import React from "react";
import Card from "./Card";
import AddTeacherPopup from "./AddTeacherPopup";
import AddUserPopup from "./AddUserPopup";
import LoginPopup from "./LoginPopup";
import ChangeDatePopup from "./ChangeDatePopup";
import { dateFormat } from "../utils/utils";
import api from "../utils/api";

function App() {
  const [lessonDate, setLessonDate] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState({ isAmin: false });
  const [addUserButtonText, setAddUserButtonText] = React.useState("Добавить");
  const [isTeacherAddPopupOpen, setIsTeacherAddPopupOpen] =
    React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isAddUserPopupOpen, setIsAddUserPopupOpen] = React.useState(false);
  const [isDateChangePopupOpen, setIsDateChangePopupOpen] =
    React.useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [practicDate, setPracticDate] = React.useState();
  const [teachersList, setTeachersList] = React.useState([]);

  const handleOpenAddUserPopup = () => {
    setIsAddUserPopupOpen(true);
  };
  const handleOpenAddTeacherPopup = () => {
    setIsTeacherAddPopupOpen(true);
  };
  const handleOpenLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };
  const handleOpenDateChangePopup = () => {
    setIsDateChangePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsTeacherAddPopupOpen(false);
    setIsDateChangePopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsAddUserPopupOpen(false);
  };

  const setDate = (date) => {
    setPracticDate(date);
    setLessonDate(dateFormat(date));
  };

  const handleChangeDate = (date) => {
    const practicDate = new Date(date);
    practicDate.setHours(11, 0);
    api
      .setDate(date)
      .then((res) => {
        console.log(res);
        setDate(practicDate);
      })
      .catch((e) => console.log(e))
      .finally(closeAllPopups);
  };

  const handleTeacherDel = (teacher) => {
    api
      .removeTeacherCard(teacher._id)
      .then(() =>
        setTeachersList((state) => state.filter((c) => c._id !== teacher._id))
      )
      .catch((e) => console.log(e));
  };

  const handleAddTeacher = (teacher) => {
    api
      .addTeacherCard(teacher)
      .then((newTeacher) => {
        setTeachersList([newTeacher, ...teachersList]);
      })
      .then(closeAllPopups)
      .catch((e) => console.log(e));
  };

  const handleUserAdd = (user) => {
    api
      .addUser(user)
      .then((res) => {
        console.log(res);
        setAddUserButtonText("Добавлен");
      })
      .catch((e) => {
        console.log(e);
        setAddUserButtonText("Произошла ошибка");
      })
      .finally(closeAllPopups);
  };

  const handleLogin = (user) => {
    api
      .userLogin(user)
      .then((currentUser) => {
        setIsLoggedIn(true);
        setCurrentUser(currentUser);
        console.log(currentUser);
      })
      .then(closeAllPopups)
      .catch((e) => console.log(e));
  };

  const handleTeacherBook = (teacher) => {
    api
      .userRemoveBookPossibility(currentUser._id)
      .then((updatedUser) => {
        setCurrentUser(updatedUser[0]);
      })
      .then(() =>
        api
          .addClient(teacher._id, currentUser._id, currentUser.fullName)
          .then((updatedTeacherCard) => {
            setTeachersList((state) =>
              state.map((t) => (t._id === teacher._id ? updatedTeacherCard : t))
            );
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  };

  const handleTeacherUnbook = (teacher) => {
    api
      .userAddBookPossibility(currentUser._id)
      .then((updatedUser) => {
        setCurrentUser(updatedUser[0]);
      })
      .then(() =>
        api
          .removeClient(teacher._id, currentUser._id)
          .then((updatedTeacherCard) => {
            setTeachersList((state) =>
              state.map((t) => (t._id === teacher._id ? updatedTeacherCard : t))
            );
          })
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    setAddUserButtonText("Добавить");
  }, [isAddUserPopupOpen]);

  React.useEffect(() => {
    const registrationStartDate = new Date(practicDate);
    registrationStartDate.setDate(registrationStartDate.getDate() - 7);
    if (
      registrationStartDate - Date.now() < 0 &&
      practicDate - Date.now() > 0
    ) {
      setIsRegistrationOpen(true);
    } else {
      setIsRegistrationOpen(false);
    }
  }, [practicDate, isLoggedIn]);

  React.useEffect(() => {
    api
      .getTeachersList()
      .then((answer) => {
        setTeachersList(answer);
      })
      .catch((err) => console.log(err));
    api
      .getDate()
      .then((date) => {
        setDate(new Date(date));
      })
      .catch((e) => console.log(e));
  }, []);

  const user = {
    name: "Анна Ли",
    isAdmin: true,
  };

  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header
        isAdmin={currentUser.isAdmin}
        handleLoginOpen={handleOpenLoginPopup}
        handleTeacherPopupOpen={handleOpenAddTeacherPopup}
        isLoggedIn={isLoggedIn}
        handleAddUserPopupOpen={handleOpenAddUserPopup}
        handleLoginPopupOpen={handleOpenLoginPopup}
      />
      <main className="mdl-layout__content">
        <div className="page-content">
          <div className="mdl-grid">
            <Intro
              date={lessonDate}
              isAdmin={currentUser.isAdmin}
              handleOpenDateChangePopup={handleOpenDateChangePopup}
            />
            <div className="mdl-cell--12-col">
              <section className="cards">
                {teachersList.map((teacher) => {
                  return (
                    <Card
                      teacher={teacher}
                      key={teacher._id}
                      user={currentUser}
                      isRegistrationOpen={isRegistrationOpen}
                      onCardDelete={handleTeacherDel}
                      isLoggedIn={isLoggedIn}
                      onTeacherBook={handleTeacherBook}
                      onTeacherUnbook={handleTeacherUnbook}
                    />
                  );
                })}
              </section>
            </div>
          </div>
        </div>
      </main>

      <AddTeacherPopup
        isOpen={isTeacherAddPopupOpen}
        onClose={closeAllPopups}
        onTeacherAdd={handleAddTeacher}
      />
      <AddUserPopup
        isOpen={isAddUserPopupOpen}
        onClose={closeAllPopups}
        onUserAdd={handleUserAdd}
        addUserButtonText={addUserButtonText}
      />
      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
        onLogin={handleLogin}
      />
      <ChangeDatePopup
        isOpen={isDateChangePopupOpen}
        onClose={closeAllPopups}
        onDateChange={handleChangeDate}
      />
    </div>
  );
}

export default App;
