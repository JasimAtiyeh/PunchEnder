import React, { useState } from 'react';
import { EditorState, RichUtils, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js/dist/Draft.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import editorStyles from './editorStyles.css';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton
} from "draft-js-buttons";
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const plugins = [
  staticToolbarPlugin
];

class StoryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = this.focus.bind(this);
  }

  focus = () => {
    this.editor.focus();
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onChange(editorState) {
    this.setState({ editorState })
  }

  render() {
    return (
      <div className="editor-container">
        <div className="editor" onClick={this.focus}>
          <Toolbar>
            {
              (externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
          <Editor
            editorState={this.state.editorState}
            ref={(element) => { this.editor = element; }}
            handleKeyCommand={this.handleKeyCommand}
            plugins={plugins}
            onChange={this.onChange.bind(this)} />
        </div>
      </div>
    )
  }
};

export default StoryEditor;
