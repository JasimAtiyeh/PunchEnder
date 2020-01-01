import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
        _id
        funBucks
      }
    }
  `,
  SIGNUP_USER: gql`
    mutation SignupUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        token
        loggedIn
        _id
        funBucks
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
        _id
      }
    }
  `,
  CREATE_PROJECT: gql`
    mutation CreateProject($name: String!, $description: String!, $category: ID!) {
      newProject(name: $name, description: $description, category: $category) {
        _id
        category {
          _id
          name
        }
        description
        goal
        launched
        name
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
  `,
  LAUNCH_PROJECT: gql`
    mutation LaunchProject($_id: ID!) {
      launchProject(_id: $_id) {
        _id
        projectCreator {
          _id
          name
        }
        category {
          _id
          name
          description
        }
        name
        description
        goal
        amountRaised
        launched
        image
      }
    }
  `,
  UPLOAD_PROJECT_IMAGE: gql`
    mutation UploadProjectImage($_id: ID!, $image: Upload!) {
      uploadProjectImage(_id: $_id, image: $image) {
        _id
        image
      }
    }
  `,
  UPLOAD_USER_IMAGE: gql`
    mutation UploadUserImage($_id: ID!, $image: Upload!) {
      uploadUserImage(_id: $_id, image: $image) {
        _id
        image
      }
    }
  `,
  CREATE_REWARD: gql`
    mutation CreateReward($name: String!, $description: String!, $tier: Int!, $pledgeAmount: Int!, $project: ID!) {
      newReward(pledgeAmount: $pledgeAmount, name: $name, description: $description, tier: $tier, project: $project) {
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
  DELETE_REWARD: gql`
    mutation DeleteReward($_id: ID!) {
      deleteReward(_id: $_id) {
        _id
        tier
        project {
          _id
        }
      }
    }
  `,
  UPDATE_REWARD: gql`
    mutation UpdateReward($_id: ID!, $name: String, $description: String, $pledgeAmount: Int) {
      updateReward(_id: $_id, name: $name, description: $description, pledgeAmount: $pledgeAmount) {
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
  UPDATE_REWARD_TIER: gql`
    mutation UpdateReward($_id: ID!, $tier: Int!) {
      updateRewardTier(_id: $_id, tier: $tier) {
        _id
        tier
      }
    }
  `,
  FOLLOW_PROJECT: gql`
    mutation FollowProject($user_id: ID!, $project_id: ID!) {
      followProject(user_id: $user_id, project_id: $project_id) {
        _id
        followedProjects {
          _id
        }
      }
    }
  `,
  UNFOLLOW_PROJECT: gql`
    mutation UnFollowProject($user_id: ID!, $project_id: ID!) {
      unFollowProject(user_id: $user_id, project_id: $project_id) {
        _id
        followedProjects {
          _id
        }
      }
    }
  `,
  PLEDGE_PROJECT: gql`
    mutation PledgeProject($user_id: ID!, $project_id: ID!, $reward_id:ID, $pledgeAmount: Int!) {
      pledgeProject(user_id: $user_id, project_id: $project_id, reward_id: $reward_id, pledgeAmount: $pledgeAmount) {
        _id
        project {
          _id
          name
          amountRaised
          image
        }
        reward {
          _id
          name
          description
        }
        amount
      }
    }
  `,
  CREATE_COMMENT: gql`
    mutation CreateComment($project: ID!, $body: String!) {
      newComment(project: $project, body: $body) {
        _id
        body
        date
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
  CREATE_UPDATE: gql`
    mutation CreateUpdate($project: ID!, $body: String!, $title: String!) {
      newUpdate(project: $project, body: $body, title: $title) {
        _id
        body
        title
        date
        project {
          _id
          projectCreator {
            _id
            name
          }
        }
      }
    }
  `,
  UPDATE_UPDATE: gql`
    mutation UpdateUpdate($_id: ID!, $body: String!, $title: String!) {
      updateUpdate(_id: $_id, body: $body, title: $title) {
        _id
        body
        title
        date
        project {
          _id
          projectCreator {
            _id
            name
          }
        }
      }
    }
  `,
  DELETE_UPDATE: gql`
    mutation deleteUpdate($_id: ID!) {
      deleteUpdate(_id: $_id) {
        _id
      }
    }
  `,
  ADD_USER_BALANCE: gql`
    mutation addUserBalance($_id: ID!, $amount: Float!) {
      addUserBalance(_id: $_id, amount: $amount) {
        _id
        funBucks
      }
    }
  `
};
