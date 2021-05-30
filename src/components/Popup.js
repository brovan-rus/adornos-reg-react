function Popup({ isOpen, onClose, content, children }) {
  const overlayHandler = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      onClose();
    }
  };
  return (
    <div
      onClick={overlayHandler}
      className={`popup popup_content_${content}, ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup__container_content_${content}`}>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Popup;
