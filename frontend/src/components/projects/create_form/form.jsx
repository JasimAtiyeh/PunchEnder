import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import CategoryPage from "./category_page";
import DescriptionPage from "./description_page";
import NamePage from "./name_page";

// Using hooks here to make it simpler to use multiple form components.

const ProjectCreateForm = props => {
  const [category, setCategory] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [page, setPage] = useState(1);
  // const [createProject] = useMutation(CREATE_PROJECT);
  const createProject = null;

  let component;
  if (page === 1) {
    component = <CategoryPage category={category} setCategory={setCategory} setPage={setPage} />;
  } else if (page === 2) {
    component = <NamePage name={name} setName={setName} setPage={setPage} />;
  } else {
    component = <DescriptionPage 
      category={category} 
      name={name} 
      description={description}
      setPage={setPage} 
      setDescription={setDescription} 
      createProject={createProject} />;
  }

  return (
    <div className="project-create-form-container">
      <span>{page} of 3</span>
      <form>
        {component}
      </form>
    </div>
  )
}

export default ProjectCreateForm;