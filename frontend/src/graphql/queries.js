
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
        projectCreator
        name
        description
        goal
        amountRaised
        endDate
        backers
        comments
        updates
        rewards
        category
        pledges
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
};