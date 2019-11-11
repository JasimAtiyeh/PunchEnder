import { convertFromRaw } from 'draft-js';

export default project => {
  const storyContent = project.story ? convertFromRaw(JSON.parse(project.story)).getPlainText() : false;

  return (
    Boolean(
      project.category &&
      project.description &&
      project.endDate &&
      project.goal &&
      project.name &&
      storyContent
    )
  )
};