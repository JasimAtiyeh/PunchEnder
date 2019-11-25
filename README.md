<!-- # KickStarter Clone

## Models
* Users
  * Name - String
  * Email - String
  * Password - String
  * Projects - Array
  * Backed Projects - Array
  * Followed Projects - Array
  * Funbucks
* Pledges?
* Projects
  * Name - String
  * Goal - Int
  * Amount Raised - Int
  * Backers - Array?
  * Time Limit - Int
  * Description - String
  * Comments - Array
  * Updates - Array
  * Rewards - Array
  * Category - ID
* Comments - Project
  * Body - String
  * Author ID - ID
* Categories
  * Name - String
  * Projects - Array
* Rewards - Project
* Updates - Project -->

# PunchEnder
PunchEnder is a clone of the popular crowd sourcing website KickStarter.

### Overview
PunchEnder gives users the ability to create a project that they would like to be funded by our base of users. PunchEnder also gives users the ability to discover projects that they would like to fund. They can give any amount that they like, or give a particular amount and be rewarded by the project creator.

### Functionality & MVP
* Projects - Users can create projects that can be completely funded by our community of users. Creating a project entails adding details, a goal for funding, and rewards that users can get for backing a project.

* Backing projects & rewards - Users that explore PunchEnder can find projects that they are interested in and can back those projects through funding them. When a project is backed, the user backing the project can choose to fund a specific amount to get a reward from the user that is creating the project. This is usually a gesture or special gift for being backed.

* Search - Find projects based off of the title or other key information in the project with our search feature.

* Categories / Discover feature - The root page of PunchEnder will show a complete list of the projects that are hosted on our site. To make the browsing of the projects a bit easier, users can filter the list of projects down by browsing by category.

* Likes - Users are able to show support for a particular project by liking a project. They can then see the list of projects that they have supported under their user profile.

### Technologies & Technical Challenges
Backend: MongoDB and Node.js
Frontend: React, GraphQL
Style: HTML and CSS

### Future Concepts
* Credit card payments

### Collaborators
Jasim Atiyeh, Han Kyul Kim