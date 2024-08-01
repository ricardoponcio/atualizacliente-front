/* eslint-disable react/prop-types */
import DOMPurify from "dompurify";
import React from "react";
import "./HtmlBox.scss";

const HtmlBox = ({ content }) => {
  const cleanedHTML = DOMPurify.sanitize(content);
  return (
    <div
      className={`my-custom-html-box`}
      dangerouslySetInnerHTML={{ __html: cleanedHTML }}
    ></div>
  );
};

export default HtmlBox;
