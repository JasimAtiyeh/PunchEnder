import React, { useState } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Bold from './bold';
import Italic from './italic';
import FormatToolbar from './format_toolbar';

// const content = JSON.stringify(value.toJSON());

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'Enter your story here.',
          },
        ],
      },
    ],
  },
})

class StoryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state={ value: initialValue };
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMarkClick = this.onMarkClick.bind(this);
    this.renderEditor = this.renderEditor.bind(this);
    this.renderMark = this.renderMark.bind(this);
  }

  focus() {
    this.editor.focus();
  }

  onChange({ value }) {
    this.setState({ value });
  }

  onKeyDown(e, change) {
    if (!e.ctrlKey) { return };
    e.preventDefault();
    switch (e.key) {
      case 'b': {
        change.toggleMark('bold');
        return true;
      }
      case 'i': {
        change.toggleMark('italic');
        return true;
      }
    }
  }

  onMarkClick(e, type) {
    e.preventDefault();
    this.editor.change(change => {
      change.toggleMark(type);
      this.onChange(change);
    });
  }

  renderEditor(props, editor, next) { 
    this.editor = editor; 
    return(<React.Fragment> { next() }</React.Fragment >);
  }

  renderMark(props) {
    switch(props.mark.type) {
      case 'bold':
        return <Bold {...props} />;
      case 'italic':
        return <Italic {...props} />;
    }
  }

  render() {
    return (
      <div className="editor-container">
        <FormatToolbar>
          <button
            onPointerDown={e => this.onMarkClick(e, 'bold')} 
            className="format-toolbar-button">
            <i className="fas fa-bold" />
          </button>
          <button
            onPointerDown={e => this.onMarkClick(e, 'italic')}
            className="format-toolbar-button">
            <i className="fas fa-italic" />
          </button>
        </FormatToolbar>
        <div className="editor" onClick={this.focus}>
          <Editor 
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderEditor={this.renderEditor}
            renderMark={this.renderMark}
            value={this.state.value} 
          />
        </div>
      </div>
    )
  }
};

export default StoryEditor;
