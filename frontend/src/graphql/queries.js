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
        projectCreator {
          name
        }
        name
        description
        goal
        amountRaised
        category {
          name
        }
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
            name
          }
          name
          description
          goal
          amountRaised
          category {
            name
          }
        }
        backedProjects {
          projectCreator {
            name
          }
          name
          description
          goal
          amountRaised
          category {
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
};