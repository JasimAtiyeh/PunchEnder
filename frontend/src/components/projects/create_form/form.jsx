import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import CategoryPage from "./category_page";
import DescriptionPage from "./description_page";
import NamePage from "./name_page";
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
import { withRouter } from "react-router-dom";
const { FETCH_PROJECTS } = Queries;
const  { CREATE_PROJECT } = Mutations;

// Using hooks here to make it simpler to use multiple form components.

const ProjectCreateForm = props => {
  const [category, setCategory] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [page, setPage] = useState(1);

  const [createProject] = useMutation(CREATE_PROJECT,
    {
      update(cache, { data: { newProject } }) {
        try {
          const rootQuery = cache.readQuery({ query: FETCH_PROJECTS });
          cache.writeQuery({
            query: FETCH_PROJECTS,
            data: { projects: rootQuery.projects.concat([newProject]) },
          });
        } catch {
        }
      }
    });

  let component;
  if (page === 1) {
    component = <CategoryPage category={category} setCategory={setCategory} setPage={setPage} />;
  } else if (page === 2) {
    component = <NamePage name={name} setName={setName} setPage={setPage} />;
  } else {
    component = <DescriptionPage 
      description={description}
      setPage={setPage} 
      setDescription={setDescription} />;
  }

  return (
    <div className="project-create-form-container">
      <span>{page} of 3</span>
      <form
        onSubmit={e => {
          e.preventDefault();
          createProject({ variables: { name, description, category } })
            .then(res => props.history.push(`/projects/${res.data.newProject._id}/build/basics`))
        }}>
        {component}
      </form>
    </div>
  )
}

export default withRouter(ProjectCreateForm);