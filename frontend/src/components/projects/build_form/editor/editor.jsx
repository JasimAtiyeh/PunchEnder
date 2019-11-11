import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import tboptions from './options';

class StoryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorState: props.story ? 
        EditorState.createWithContent(convertFromRaw(JSON.parse(props.story))) 
        : EditorState.createEmpty() 
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    if (!this.props.needSave) { this.props.setNeedSave(true) };
    this.setState({ editorState });
    const content = editorState.getCurrentContent();
    const contentString = JSON.stringify(convertToRaw(content));
    this.props.setStory(contentString);
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        toolbarClassName="story-toolbar"
        wrapperClassName="story-wrapper"
        editorClassName="story-editor"
        onEditorStateChange={this.onChange}
        toolbar={tboptions}
      />
    )
  }
};

export default StoryEditor;