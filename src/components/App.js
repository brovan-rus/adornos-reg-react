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
import TeacherSelectSnackbar from "./TeacherSelectSnackbar";

function App() {
  const [lessonDate, setLessonDate] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState({ isAmin: false });
  const [addUserButtonText, setAddUserButtonText] = React.useState("Добавить");
  const [addTeacherButtonText, setAddTeacherButtonText] =
    React.useState("Добавить");
  const [loginButtonText, setLoginButtonText] = React.useState("Войти");
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
  const [selectedTeachersList, setSelectedTeachersList] = React.useState([]);
  const [teacherSelectSnackbarMessage, setTeacherSelectSnackbarMessage] =
    React.useState("");

  const handleOpenAddUserPopup = () => {
    setIsAddUserPopupOpen(true);
  };
  const handleOpenAddTeacherPopup = () => {
    setAddTeacherButtonText("Добавить");
    setIsTeacherAddPopupOpen(true);
  };
  const handleOpenLoginPopup = () => {
    setLoginButtonText("Войти");
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
        teachersList.forEach((teacher) => {
          console.log(teacher);
          handleTeacherDel(teacher);
        });
      })
      .catch((e) => console.log(e))
      .finally(closeAllPopups);
  };

  const handleTeacherDel = (teacher) => {
    if (teacher.clients) {
      teacher.clients.forEach((client) => {
        api
          .userAddBookPossibility(client.clientId)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      });
      api
        .removeTeacherCard(teacher._id)
        .then(() => {
          setTeachersList((state) =>
            state.filter((c) => c._id !== teacher._id)
          );
        })
        .catch((e) => console.log(e));
    } else {
      api
        .removeTeacherCard(teacher._id)
        .then(() => {
          setTeachersList((state) =>
            state.filter((c) => c._id !== teacher._id)
          );
        })
        .catch((e) => console.log(e));
    }
  };

  const handleAddTeacher = (teacher) => {
    api
      .addTeacherCard(teacher)
      .then((newTeacher) => {
        setTeachersList([newTeacher, ...teachersList]);
      })
      .then(closeAllPopups)
      .catch((e) => {
        console.log(e);
        setAddTeacherButtonText("Заполните все поля");
      });
  };

  const handleUserAdd = (user) => {
    api
      .addUser(user)
      .then((res) => {
        console.log(res);
        setAddUserButtonText("Добавлен");
      })
      .then(closeAllPopups)
      .catch((e) => {
        console.log(e);
        setAddUserButtonText("Произошла ошибка");
      });
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
      .catch((e) => {
        console.log(e);
        setLoginButtonText("Неправильное имя пользователя или пароль");
      });
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

  const handleTeacherSelect = (selectedTeacher) => {
    setSelectedTeachersList([...selectedTeachersList, selectedTeacher]);
    setTeacherSelectSnackbarMessage(
      `Выбрано: ${
        selectedTeachersList.length + 1
      } преподаватель. Обновить список?`
    );
  };

  const handleTeacherDeselect = (selectedTeacher) => {
    const selectedTeachersListCropped = selectedTeachersList;
    selectedTeachersListCropped.forEach((t, i, arr) => {
      if (t._id === selectedTeacher._id) {
        return arr.splice(i, 1);
      }
    });
    setSelectedTeachersList(selectedTeachersListCropped);
    setTeacherSelectSnackbarMessage(
      `Выбрано: ${selectedTeachersList.length} преподаватель. Обновить список?`
    );
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

  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <TeacherSelectSnackbar
        isOpen={selectedTeachersList.length > 0}
        message={teacherSelectSnackbarMessage}
      />
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
              isRegistrationOpen={isRegistrationOpen}
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
                      onSelect={handleTeacherSelect}
                      onDeselect={handleTeacherDeselect}
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
        buttonText={addTeacherButtonText}
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
        buttonText={loginButtonText}
      />
      <ChangeDatePopup
        isOpen={isDateChangePopupOpen}
        onClose={closeAllPopups}
        onDateChange={handleChangeDate}
        curretDate={practicDate}
      />
    </div>
  );
}

export default App;
