import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  SIGNUP_USER: gql`
    mutation SignupUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  CREATE_PROJECT: gql`
    mutation CreateProject($name: String!, $description: String!, $category: ID!) {
      newProject(name: $name, description: $description, category: $category) {
        _id
        name
        description
        category {
          _id
          name
        }
      }
    }
  `,
  UPDATE_PROJECT_BASICS: gql`
    mutation UpdateProjectBasics($_id: ID!, $name: String, $description: String, $category: ID, $goal: Int, $endDate: String) {
      updateProjectBasics(_id: $_id, name: $name, description: $description, category: $category, goal: $goal, endDate: $endDate) {
        _id
        name
        description
        endDate
        goal
        category {
          _id
          name
        }
      }
    }
  `,
  UPDATE_PROJECT_STORY: gql`
    mutation UpdateProjectStory($_id: ID!, $story: String) {
      updateProjectStory(_id: $_id, story: $story) {
        _id
        story
      }
    }
  `
};
