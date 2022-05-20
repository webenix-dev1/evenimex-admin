import React, { useState, useEffect } from "react";
import { ContentState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
// import { EditorProps } from 'react-draft-wysiwyg'

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyStatefulEditor = ({ value, onChange }) => {
  let _contentState = ContentState.createFromText("");
  const raw = value ? value : convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState JSON
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    onChange(contentState);
  }, []);

  const handleChange = (value) => {
    setContentState(value);
  };
  const handleSubmit = () => {
    onChange(contentState);
  };

  return (
    <div className="MyStatefulEditor">
      {isLoad && (
        <Editor
          // defaultContentState={raw}
          contentState={raw}
          onBlur={(event) => handleSubmit()}
          onContentStateChange={(event) => handleChange(event)}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      )}
    </div>
  );
};
export default MyStatefulEditor;
