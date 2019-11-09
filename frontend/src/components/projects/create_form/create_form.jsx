import React from 'react';
import { useMutation } from '@apollo/react-hooks';

const ProjectCreateForm = props => {
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [page, setPage] = useState(1);
  const [createProject] = useMutation(CREATE_PROJECT);

  let component;
  if (page === 1) {
    component = <CategoryPage category={category} setCategory={setCategory} />;
  } else if (page === 2) {
    component = <TitlePage title={title} setTitle={setTitle} />;
  } else {
    component = <DescriptionPage description={description} setDescription={setDescription} />;
  }

  return (
    <div className="project-form-container">
      <form>
        {component}
      </form>
    </div>
  )
}

export default ProjectCreateForm;