import React from "react";
import TeacherPopup from "./TeacherPopup";

function EditTeacherPopup({
  isOpen,
  onClose,
  onTeacherEdit,
  buttonText,
  currentTeacherData,
}) {
  return (
    <TeacherPopup
      title="Редактировать преподавателя"
      buttonText={buttonText}
      content="teacher-add"
      isOpen={isOpen}
      onClose={onClose}
      onTeacherSubmit={onTeacherEdit}
      currentTeacherData={currentTeacherData}
    />
  );
}

export default EditTeacherPopup;
