/* eslint-disable react/prop-types */
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "./HtmlEditor.scss";

const HtmlEditor = ({ valor = "", onChange = () => {} }) => {
  const [estadoEditor, setEstadoEditor] = useState();

  useEffect(() => {
    setEstadoEditor(
      valor
        ? EditorState.createWithContent(ContentState.createFromText(valor))
        : EditorState.createEmpty()
    );
  }, []);

  useEffect(() => {
    if (estadoEditor)
      onChange(draftToHtml(convertToRaw(estadoEditor.getCurrentContent())));
  }, [estadoEditor]);

  return (
    <div className="my-custom-html-editor">
      <Editor
        editorState={estadoEditor}
        onEditorStateChange={setEstadoEditor}
      />
    </div>
  );
};

export default HtmlEditor;
