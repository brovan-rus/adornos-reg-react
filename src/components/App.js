import "../index.css";
import Header from "./Header";
import Intro from "./Intro";
import React from "react";
import Card from "./Card";
import AddTeacherPopup from "./AddTeacherPopup";
import LoginPopup from "./LoginPopup";
import ChangeDatePopup from "./ChangeDatePopup";
import { dateFormat } from "../utils/utils";
import api from "../utils/api";
import TeacherSelectSnackbar from "./TeacherSelectSnackbar";
import BookTeacherPopup from "./BookTeacherPopup";

function App() {
  const [lessonDate, setLessonDate] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState({ isAmin: false });
  const [bookTeacherButton, setBookTeacherButton] = React.useState({
    text: "Записаться",
    isDisabled: false,
  });
  const [addTeacherButtonText, setAddTeacherButtonText] =
    React.useState("Добавить");
  const [loginButtonText, setLoginButtonText] = React.useState("Войти");
  const [isTeacherAddPopupOpen, setIsTeacherAddPopupOpen] =
    React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [currentTeacher, setCurrentTeacher] = React.useState();
  const [isDateChangePopupOpen, setIsDateChangePopupOpen] =
    React.useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = React.useState(false);
  const [isBookTeacherPopupOpen, setIsBookTeacherPopupOpen] =
    React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [practicDate, setPracticDate] = React.useState();
  const [teachersList, setTeachersList] = React.useState([]);
  const [selectedTeachersList, setSelectedTeachersList] = React.useState([]);
  const [teacherSelectSnackbarMessage, setTeacherSelectSnackbarMessage] =
    React.useState("");

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
    setIsBookTeacherPopupOpen(false);
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
        // teachersList.forEach((teacher) => {
        //   console.log(teacher);
        //   handleTeacherDel(teacher);
        // });
        api
          .resetUsersBookPossibilities()
          .then(() => {
            api
              .clearCurrentTeacherList()
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
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

  const handleTeacherBookPopupOpen = (teacher) => {
    setIsBookTeacherPopupOpen(true);
    setCurrentTeacher(teacher);
  };

  const handleTeacherBook = (teacher, user) => {
    console.log(teacher, user);
    api
      .addUser(user)
      .then((bookingClient) => {
        console.log(bookingClient);
        api
          .addClient(teacher._id, bookingClient._id, bookingClient.fullName)
          .then((updatedTeacherCard) => {
            console.log(teacher, bookingClient);
            setSelectedTeachersList((state) =>
              state.map((t) => (t._id === teacher._id ? updatedTeacherCard : t))
            );
          })
          .catch((e) => console.log(e));
      })
      .then(() => closeAllPopups())
      .catch((e) => console.log(e));

    // api
    //   .userRemoveBookPossibility(currentUser._id)
    //   .then((updatedUser) => {
    //     setCurrentUser(updatedUser[0]);
    //   })
    //   .then(() =>
    //     api
    //       .addClient(teacher._id, currentUser._id, currentUser.fullName)
    //       .then((updatedTeacherCard) => {
    //         setSelectedTeachersList((state) =>
    //           state.map((t) => (t._id === teacher._id ? updatedTeacherCard : t))
    //         );
    //       })
    //       .catch((e) => console.log(e))
    //   )
    //   .catch((e) => console.log(e));
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
            setSelectedTeachersList((state) =>
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

  const handleCurrentTeacherListRenew = () => {
    api
      .clearCurrentTeacherList()
      .then(() => setTeacherSelectSnackbarMessage("Обновление..."))
      .then(() => {
        selectedTeachersList.forEach((teacher) => {
          api.addToCurrentTeacherList(teacher).then((res) => console.log(res));
        });
      })
      .then(() =>
        setTimeout(() => {
          setTeacherSelectSnackbarMessage(
            `Выбрано: ${selectedTeachersList.length} преподаватель.`
          );
        }, 820)
      )
      .catch((e) => console.log(e));
  };

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
      .getCurrentTeacherList()
      .then((answer) => {
        setSelectedTeachersList(answer);
        setTeacherSelectSnackbarMessage(
          `Выбрано: ${answer.length} преподаватель.`
        );
      })
      .catch((e) => console.log(e));

    api
      .getDate()
      .then((date) => {
        setDate(new Date(date));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      {currentUser.isAdmin && (
        <TeacherSelectSnackbar
          isOpen={selectedTeachersList.length > 0}
          message={teacherSelectSnackbarMessage}
          onApprove={handleCurrentTeacherListRenew}
        />
      )}
      <Header
        isAdmin={currentUser.isAdmin}
        handleLoginOpen={handleOpenLoginPopup}
        handleTeacherPopupOpen={handleOpenAddTeacherPopup}
        isLoggedIn={isLoggedIn}
        // handleAddUserPopupOpen={handleOpenAddUserPopup}
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
                {currentUser.isAdmin
                  ? teachersList.map((teacher) => {
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
                          selectedTeachersList={selectedTeachersList}
                        />
                      );
                    })
                  : selectedTeachersList.map((teacher) => {
                      return (
                        <Card
                          teacher={teacher}
                          key={teacher._id}
                          user={currentUser}
                          isRegistrationOpen={isRegistrationOpen}
                          onCardDelete={handleTeacherDel}
                          isLoggedIn={isLoggedIn}
                          onTeacherBook={handleTeacherBookPopupOpen}
                          onTeacherUnbook={handleTeacherUnbook}
                          onSelect={handleTeacherSelect}
                          onDeselect={handleTeacherDeselect}
                          selectedTeachersList={selectedTeachersList}
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
      <BookTeacherPopup
        isOpen={isBookTeacherPopupOpen}
        onClose={closeAllPopups}
        onTeacherBook={handleTeacherBook}
        buttonText={bookTeacherButtonText}
        teacher={currentTeacher}
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
        currentDate={practicDate}
      />
    </div>
  );
}

export default App;
