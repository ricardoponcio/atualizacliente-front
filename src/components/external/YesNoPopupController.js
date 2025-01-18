import Popup from "react-popup";

export const openYesNoPopup = (customTitle, content, onClickYes, onClickNo) => {
  Popup.create({
    title: customTitle,
    content,
    buttons: {
      left: [
        {
          text: "Yes",
          className: "danger",
          action: function () {
            onClickYes && onClickYes(this);
            Popup.close();
          },
        },
      ],
      right: [
        {
          text: "Alt",
          key: "ctrl+enter",
          action: function () {
            onClickNo && onClickNo(this);
            Popup.close();
          },
        },
      ],
    },
  });
};
