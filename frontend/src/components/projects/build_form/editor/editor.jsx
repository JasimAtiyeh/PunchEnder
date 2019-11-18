import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import tboptions from './options';

// https://jpuri.github.io/react-draft-wysiwyg
// I was making a custom editor with slatejs, but there was a fatal error

class StoryEditor extends React.Component {
  constructor(props) {
    super(props);
    const editorState = Boolean(props.story) ?
      EditorState.createWithContent(convertFromRaw(JSON.parse(props.story)))
      : EditorState.createEmpty() 
    this.state = { editorState };
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
        placeholder="Story here."
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