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
import EditTeacherPopup from "./EditTeacherPopup";
import SignupPopup from "./SignupPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [formattedPracticDate, setFormattedPracticDate] =
    React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState({
    isAdmin: false,
    isLoggedIn: false,
  });
  const [bookTeacherButtonText, setBookTeacherButtonText] =
    React.useState("Записаться");
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
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [practicDate, setPracticDate] = React.useState();
  const [teachersList, setTeachersList] = React.useState([]);
  const [selectedTeachersList, setSelectedTeachersList] = React.useState([]);
  const [teacherSelectSnackbarMessage, setTeacherSelectSnackbarMessage] =
    React.useState("");
  const [editTeacherButtonText, setEditTeacherButtonText] =
    React.useState("Изменить");
  const [isTeacherEditPopupOpen, setIsTeacherEditPopupOpen] =
    React.useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  const [currentTeacherData, setCurrentTeacherData] = React.useState({});
  const handleOpenAddTeacherPopup = () => {
    setAddTeacherButtonText("Добавить");
    setIsTeacherAddPopupOpen(true);
  };

  const handleSignup = (email, password) => {};

  const handleOpenSignupPopup = () => {
    setIsSignupPopupOpen(true);
  };

  const logout = () => {
    setCurrentUser({ isAdmin: false, isLoggedIn: false });
    localStorage.removeItem("jwt");
  };

  const handleOpenTeacherEditPopup = (teacherData) => {
    setAddTeacherButtonText("Изменить");
    setCurrentTeacherData(teacherData);
    setIsTeacherEditPopupOpen(true);
  };

  const handleTeacherBookPopupOpen = (teacher) => {
    setIsBookTeacherPopupOpen(true);
    setCurrentTeacher(teacher);
    setBookTeacherButtonText("Записаться");
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
    setIsTeacherEditPopupOpen(false);
    setIsSignupPopupOpen(false);
  };

  const setDateOnPage = (date) => {
    setPracticDate(date);
    setFormattedPracticDate(dateFormat(date));
  };

  const handleChangeDate = (date) => {
    const practicDate = new Date(date);
    practicDate.setHours(11, 0);
    api
      .setDate(practicDate)
      .then(({ isRegistrationOpened }) => {
        setIsRegistrationOpen(isRegistrationOpened);
        setDateOnPage(practicDate);
        api.resetUsersBookPossibilities().then(() => {
          api.resetAllTeachersBooking().then((updatedTeachersList) => {
            setTeachersList(updatedTeachersList);
            api.clearCurrentTeacherList().then(() => {
              setSelectedTeachersList([]);
              setTeacherSelectSnackbarMessage(`Выбрано: 0 преподавателей.`);
            });
          });
        });
      })
      .catch((e) => console.log(e))
      .finally(closeAllPopups);
  };

  const handleTeacherDel = async (teacher) => {
    if (teacher.clients) {
      for (const client of teacher.clients) {
        await handleTeacherUnbook(teacher, client.id);
      }
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
      .then((newTeacher) => setTeachersList([newTeacher, ...teachersList]))
      .then(closeAllPopups)
      .catch((e) => {
        console.log(e);
        setAddTeacherButtonText("Заполните все поля");
      });
  };

  const handleEditTeacher = (teacher) => {
    api
      .updateTeacherData(currentTeacherData._id, teacher)
      .then((editedTeacher) => {
        setTeachersList((state) =>
          state.map((t) => (t._id === editedTeacher._id ? editedTeacher : t))
        );
      })
      .then(closeAllPopups)
      .catch((e) => {
        console.log(e);
        setEditTeacherButtonText("Проверьте корректность заполнения формы");
      });
  };

  const handleLogin = (user) => {
    api
      .userLogin(user)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        api.userAuth(token).then((currentUser) => {
          setCurrentUser({ ...currentUser, isLoggedIn: true });
          console.log(currentUser);
        });
      })
      .then(closeAllPopups)
      .catch((e) => {
        console.log(e);
        setLoginButtonText("Неправильное имя пользователя или пароль");
      });
  };

  const handleTeacherBook = (teacher, user) => {
    api
      .addUser(user)
      .then((bookingClient) => {
        if (bookingClient.tickets < 1) {
          setBookTeacherButtonText(
            "Вы достигли максимального количества записей."
          );
        } else {
          api
            .addClient(teacher._id, bookingClient)
            .then((updatedTeacherCard) => {
              teacher.price > 0
                ? api
                    .userRemoveBookPossibility(bookingClient._id)
                    .then((res) => console.log(res))
                    .catch((e) => console.log(e))
                : api
                    .userRemoveBookPossibility(bookingClient._id)
                    .then(() =>
                      api.userRemoveBookPossibility(bookingClient._id)
                    )
                    .then((res) => console.log(res))
                    .catch((e) => console.log(e));
              setSelectedTeachersList((state) =>
                state.map((t) =>
                  t._id === teacher._id ? updatedTeacherCard : t
                )
              );
              setTeachersList((state) =>
                state.map((t) =>
                  t._id === teacher._id ? updatedTeacherCard : t
                )
              );
            })
            .then(closeAllPopups)
            .catch((e) => {
              console.log(e);
              setBookTeacherButtonText(
                "Вы уже записаны к этому преподавателю!"
              );
            });
        }
      })
      .catch((e) => console.log(e));
  };

  const handleTeacherUnbook = async (teacher, clientId) => {
    teacher.price > 0
      ? api
          .userAddBookPossibility(clientId)
          .then(() =>
            api
              .removeClient(teacher._id, clientId)
              .then((updatedTeacherCard) => {
                setTeachersList((state) =>
                  state.map((t) =>
                    t._id === teacher._id ? updatedTeacherCard : t
                  )
                );
              })
              .catch((e) => console.log(e))
          )
          .catch((e) => console.log(e))
      : api
          .userAddBookPossibility(clientId)
          .then(() => api.userAddBookPossibility(clientId))
          .then(() =>
            api
              .removeClient(teacher._id, clientId)
              .then((updatedTeacherCard) => {
                setTeachersList((state) =>
                  state.map((t) =>
                    t._id === teacher._id ? updatedTeacherCard : t
                  )
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
      .getCurrentTeacherList()
      .then((previousTeachersList) => {
        const deletedTeachers = previousTeachersList.filter(
          (x) => !selectedTeachersList.some((y) => x._id === y._id)
        );
        deletedTeachers.forEach((deletedTeacher) => {
          if (deletedTeacher.clients.length > 0) {
            deletedTeacher.clients.forEach((client) => {
              console.log(client);
              api
                .userAddBookPossibility(client.id)
                .then((res) => console.log(res))
                .catch((e) => console.log(e));
            });
          }
          api
            .clearTeachersClients(deletedTeacher._id)
            .then((updatedTeacherCard) => {
              setTeachersList((state) =>
                state.map((t) =>
                  t._id === deletedTeacher._id ? updatedTeacherCard : t
                )
              );
            })
            .catch((e) => console.log(e));
        });
        api
          .clearCurrentTeacherList()
          .then(() => setTeacherSelectSnackbarMessage("Обновление..."))
          .then(() => {
            selectedTeachersList.forEach((teacher) => {
              api
                .addToCurrentTeacherList(teacher)
                .then((res) => console.log(res))
                .catch((e) => console.log(e));
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
      })
      .catch((e) => console.log(e));
  };

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
      .then((data) => {
        setIsRegistrationOpen(data.isRegistrationOpened);
        setPracticDate(new Date(data.practicDate));
        setDateOnPage(practicDate);
      })
      .catch((e) => console.log(e));
  }, [currentUser]);

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      api
        .userAuth(localStorage.getItem("jwt"))
        .then((currentUser) => {
          setCurrentUser({ ...currentUser, isLoggedIn: true });
          console.log(currentUser);
        })
        .catch((e) => console.log(e));
    }

    api
      .getDate()
      .then((data) => {
        setIsRegistrationOpen(data.isRegistrationOpened);
        setDateOnPage(new Date(data.practicDate));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        {currentUser.isAdmin && (
          <TeacherSelectSnackbar
            isOpen={true}
            message={teacherSelectSnackbarMessage}
            onApprove={handleCurrentTeacherListRenew}
          />
        )}
        <Header
          handleTeacherPopupOpen={handleOpenAddTeacherPopup}
          handleLoginPopupOpen={handleOpenLoginPopup}
          handleLogout={logout}
          handleSignupPopoupOpen={handleOpenSignupPopup}
        />
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="mdl-grid">
              <Intro
                date={formattedPracticDate}
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
                            isRegistrationOpen={isRegistrationOpen}
                            onCardDelete={handleTeacherDel}
                            onTeacherBook={handleTeacherBookPopupOpen}
                            onTeacherUnbook={handleTeacherUnbook}
                            onSelect={handleTeacherSelect}
                            onDeselect={handleTeacherDeselect}
                            selectedTeachersList={selectedTeachersList}
                            onCardEdit={handleOpenTeacherEditPopup}
                          />
                        );
                      })
                    : selectedTeachersList.map((teacher) => {
                        return (
                          <Card
                            teacher={teacher}
                            key={teacher._id}
                            isRegistrationOpen={isRegistrationOpen}
                            onCardDelete={handleTeacherDel}
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
        <EditTeacherPopup
          isOpen={isTeacherEditPopupOpen}
          onClose={closeAllPopups}
          onTeacherEdit={handleEditTeacher}
          buttonText={editTeacherButtonText}
          currentTeacherData={currentTeacherData}
        />
        <SignupPopup
          isOpen={isSignupPopupOpen}
          onClose={closeAllPopups}
          onSignup={handleSignup}
          buttonText="Зарегистрироваться"
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
    </CurrentUserContext.Provider>
  );
}

export default App;
