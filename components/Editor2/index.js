import { Editor } from "@tinymce/tinymce-react";
import * as React from "react";
import * as _ from "lodash";

class MCEEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);

    this.state = {
      documentName: "Evenimex Venue",
      editorContent: "",
      displayIsSaving: false,
    };

    this.throttledSaveToServer = _.throttle(() => {
      setTimeout(() => {
        this.debouncedEndSaving();
        console.log(
          "Saved to server",
          this.state.documentName,
          this.state.editorContent
        );
      }, 500);
    }, 500);

    this.debouncedEndSaving = _.debounce(() => {
      this.setState({ displayIsSaving: false });
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.save({ editorContent: this.props.value });
      console.log("Props ::", this.props);
    }
  }

  handleEditorChange(editorContent) {
    this.save({ editorContent });
    console.log("editorContent ::", editorContent);
    this.props.onChange(editorContent);
  }

  handleNameChange(documentName) {
    this.save({ documentName });
  }

  save(newPartialState) {
    this.setState(
      {
        ...newPartialState,
        displayIsSaving: true,
      },
      () => {
        this.throttledSaveToServer();
      }
    );
  }

  componentWillUnmount() {
    this.debouncedEndSaving.cancel();
    this.throttledSaveToServer.cancel();
  }

  render() {
    return (
      <div className="document-editor">
        <Editor
          apiKey="8a43syhz8qtdbal4ozwv5c6uqqqdwzd6kn7mjqkl6stow3fv"
          onEditorChange={this.handleEditorChange}
          value={this.state.editorContent}
          init={{
            icons: "jam",
            // skin: "fabric",
            // content_css: "document",
            resize: false,
          }}
        />
      </div>
    );
  }
}

export default MCEEditor;
