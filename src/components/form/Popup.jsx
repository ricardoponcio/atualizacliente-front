/* eslint-disable react/prop-types */
import React from "react";
import Button from "./Button";
import "./Popup.scss";

const Popup = ({
  isVisible,
  children,
  customTitle = "",
  showCloseButton = true,
  onClose = () => {},
  options = [],
  autoClosePopupOnClickOptions = true,
}) => {
  return (
    isVisible && (
      <div className="popup-wrapper">
        <div className="popup-overlay" onClick={onClose}></div>
        <div className="popup-container">
          <div className="popup-header">
            {customTitle && <div className="popup-header-title"></div>}
            {showCloseButton && (
              <div className="popup-header-close" onClick={onClose}>
                X
              </div>
            )}
          </div>
          <div className="popup-content">{children}</div>
          {options && options.length > 0 && (
            <div className="popup-options">
              {options?.map((option, idx) => (
                <Button
                  key={`popup-option-${idx}-${new Date().getTime()}`}
                  value={option.value}
                  onClick={() => {
                    if (autoClosePopupOnClickOptions) {
                      onClose();
                    }
                    option.onClick();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Popup;
