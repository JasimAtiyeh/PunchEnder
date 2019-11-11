import { convertFromRaw } from 'draft-js';

export default project => {
  const storyContent = convertFromRaw(JSON.parse(project.story)).getPlainText();

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