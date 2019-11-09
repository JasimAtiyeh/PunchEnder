
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
  FETCH_CATEGORIES: gql`
    {
      categories {
        _id
        name
      }
    }
  `,
};