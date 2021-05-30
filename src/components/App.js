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
  const [lessonDate, setLessonDate] = React.useState("31 мая 2020");
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

  const handleChangeDate = (date) => {
    const practicDate = new Date(date);
    practicDate.setHours(11, 0);
    setPracticDate(practicDate);
    setLessonDate(dateFormat(practicDate));
    closeAllPopups();
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
        console.log(answer);
      })
      .catch((err) => console.log(err));
  }, []);

  const card = {
    name: "Кирилл Паршаков",
    dances: 2,
    photoURL:
      "https://center.adornos.ru/wp-content/uploads/2020/02/parshakov.jpg",
    clients: [
      { id: 1, name: "Константин Бровцев" },
      { id: 2, name: "Елена Бровцева" },
    ],
    _id: "id",
  };
  const user = {
    name: "Анна Ли",
    isAdmin: true,
  };

  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header
        isAdmin={user.isAdmin}
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
              isAdmin={user.isAdmin}
              handleOpenDateChangePopup={handleOpenDateChangePopup}
            />
            <div className="mdl-cell--12-col">
              <section className="cards">
                {teachersList.map((teacher, i) => {
                  return (
                    <Card
                      teacher={teacher}
                      key={teacher._id}
                      user={user}
                      isRegistrationOpen={isRegistrationOpen}
                      onCardDelete={handleTeacherDel}
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
      <AddUserPopup isOpen={isAddUserPopupOpen} onClose={closeAllPopups} />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups} />
      <ChangeDatePopup
        isOpen={isDateChangePopupOpen}
        onClose={closeAllPopups}
        onDateChange={handleChangeDate}
      />
    </div>
  );
}

export default App;
