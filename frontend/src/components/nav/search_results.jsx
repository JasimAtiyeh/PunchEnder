import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Queries from "../../graphql/queries";
import CategoryResult from './category_result';
import ProjectResult from './project_result';
const { SEARCH_PROJECTS_AND_CATEGORIES } = Queries;

const SearchResults = props => {
  const { filter, setSearching } = props;
  const { loading, error, data } = useQuery(SEARCH_PROJECTS_AND_CATEGORIES, { variables: { filter } } );
  if (loading) return null;
  if (error) { return <div>{error}</div> };
  const { searchCategories, searchProjects } = data;
  const categoryLis = searchCategories.map(category => {
    return <CategoryResult
      setSearching={setSearching}
      key={category._id} 
      category={category} />;
  });
  const projectLis = searchProjects.map(project => {
    return <ProjectResult
      setSearching={setSearching}
      key={project._id} 
      project={project} />;
  });

  return (
    <div className="search-results">
      { searchCategories.length < 1 && searchProjects.length < 1
        && <div className="search-oops">
          <p>Oops! We couldn't find what you were looking for.</p>
          <span>Try a different search term.</span> 
        </div>
      }
      { searchCategories.length > 0 &&
        <ul className="category-results">
          <li>
            <h3>
              Categories
            </h3>
          </li>
          { categoryLis }
        </ul>
      }
      { searchProjects.length > 0 &&
        <ul className="project-results">
          <li>
            <h3>
              Projects
            </h3>
          </li>
          { projectLis }
        </ul> 
      }
    </div>
  )
};

export default SearchResults;