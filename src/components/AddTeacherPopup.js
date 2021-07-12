import React from "react";
import TeacherPopup from "./TeacherPopup";

function AddTeacherPopup({ isOpen, onClose, onTeacherAdd, buttonText }) {
  const currentTeacherData = {
    name: "",
    photoUrl: "",
    description: "",
    price: 0,
  };
  return (
    <TeacherPopup
      title="Добавить преподавателя"
      buttonText={buttonText}
      content="teacher-add"
      isOpen={isOpen}
      onClose={onClose}
      onTeacherSubmit={onTeacherAdd}
      currentTeacherData={currentTeacherData}
    />
  );
}

export default AddTeacherPopup;
