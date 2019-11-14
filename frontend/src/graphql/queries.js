import gql from "graphql-tag";

export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_PROJECTS: gql`
    {
      projects {
        _id
        projectCreator {
          _id
          name
        }
        name
        description
        goal
        amountRaised
        category {
          _id
          name
        }
        launched
        image
      }
    }
  `,
  FETCH_USER: gql`
    query FetchUser($id: ID!) {
      user(_id: $id) {
        _id
        name
        projects {
          projectCreator {
            _id
            name
          }
          name
          description
          goal
          amountRaised
          category {
            _id
            name
          }
        }
        backedProjects {
          projectCreator {
            _id
            name
          }
          name
          description
          goal
          amountRaised
          category {
            _id
            name
          }
        }
        date
      }
    }
  `,
  FETCH_UNFINISHED_PROJECT: gql`
    query FetchUnfinishedProject($_id: ID!) {
      project(_id: $_id) {
        _id
        name
        description
        goal
        endDate
        image
        launched
        story
        rewards {
          _id
          name
          pledgeAmount
          tier
          description
        }
        projectCreator {
          _id
        }  
        category {
          _id
          name
        }
      }
    }
  `,
  FETCH_FINISHED_PROJECT: gql`
    query FetchFinishedProject($_id: ID!) {
      project(_id: $_id) {
        _id
        name
        description
        goal
        endDate
        amountRaised
        launched
        story
        rewards {
          _id
          name
          pledgeAmount
          tier
          description
        }
        backers {
          _id
        }
        projectCreator {
          _id
        }  
        category {
          _id
          name
          icon
        }
      }
    }
  `,
  FETCH_CATEGORIES: gql`
    query FetchCategories {
      categories {
        _id
        name
      }
    }
  `,
  FETCH_REWARDS: gql`
    query FetchRewards {
      rewards {
        _id
        name
        description
        pledgeAmount
        tier
        project {
          _id
        }
      }
    }
  `,
  FETCH_CATEGORY: gql`
    query FetchCategory($_id: ID!) {
      category(_id: $_id) {
        _id
        name
        description
        projects {
          _id
          projectCreator {
            _id
            name
          }
          name
          description
          goal
          amountRaised
          launched
          image
        }
      }
    }
  `,
  FETCH_PROJECTS_CATEGORIES: gql`
    query FetchCategories {
      categories {
        _id
        name
        projects {
          _id
          projectCreator {
            name
            _id
          }
          name
          description
          goal
          amountRaised
          category {
            name
            _id
          }
          launched
          image
        }
      }
    }
  `,
  SEARCH_PROJECTS: gql`
    query SearchProjects($filter: String!) {
      searchProjects(filter: $filter) {
        _id
        name
        image
        projectCreator {
          _id
          name
        }
      }
    }
  `,
  SEARCH_CATEGORIES: gql`
    query SearchCategories($filter: String!) {
      searchCategories(filter: $filter) {
        _id
        name
        description
    }
  }
  `,
  SEARCH_PROJECTS_AND_CATEGORIES: gql`
    query SearchProjectAndCategories($filter: String!) {
      searchCategories(filter: $filter) {
        _id
        name
        description
      }
      searchProjects(filter: $filter) {
        _id
        name
        image
        goal
        amountRaised
        endDate
        projectCreator {
          _id
          name
        }
      }
    }
  `,
  FETCH_PROJECT_COMMENTS: gql`
    query FetchProjectComments($project: ID!) {
      projectComments(project: $project) {
        _id
        body
        author {
          _id
          name
        }
        project {
          _id
        }
      }
    }
  `,
};