export default {
  options: ['inline', 'blockType', 'list', 'link', 'image', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline'],
  },
  blockType: {
    inDropdown: false,
    options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
  },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
  },
  image: {
    uploadCallback: undefined,
    defaultSize: {
      height: 'auto',
        width: 'auto',
    },
  },
  history: {
    inDropdown: false,
    options: ['undo', 'redo'],
  },
};