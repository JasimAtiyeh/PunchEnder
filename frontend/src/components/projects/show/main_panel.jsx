import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { useMutation } from '@apollo/react-hooks';
import Mutations from "../../../graphql/mutations";
import Queries from "../../../graphql/queries";
import { numWithCommas, getDateNumAndText } from '../../../util/num_util';
const { FOLLOW_PROJECT, UNFOLLOW_PROJECT } = Mutations;
const { FETCH_FINISHED_PROJECT, FETCH_FINISHED_PROJECTS, FETCH_CATEGORY, CURRENT_USER } = Queries;

const MainPanel = props => {
  const { name, description, image, endDate, amountRaised, backers, goal, category, followedBy, _id } = props.project;
  const followed = followedBy.some(u => u._id === localStorage.userId);

  // This "currentUser" uses the client rather than the localStorage.
  const currentUser = props.client.readQuery({ query: CURRENT_USER }).currentUser;

  const [followProject] = useMutation(
    FOLLOW_PROJECT,
    {
      update(cache, { data: { followProject } }) {
        try {
          const rootQuery = cache.readQuery({ query: FETCH_FINISHED_PROJECTS });
          const relevantProject = rootQuery.finishedProjects.find(p => p._id === _id);
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy.push(followProject);
          cache.writeQuery({
            query: FETCH_FINISHED_PROJECTS,
            data: { finishedProjects: rootQuery.finishedProjects },
          });
        } catch {
        }
        try {
          const rootQuery = cache.readQuery({ query: FETCH_CATEGORY, variables: { _id: category._id }, });
          const relevantProject = rootQuery.category.projects.find(p => p._id === _id);
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy.push(followProject);
          cache.writeQuery({
            query: FETCH_CATEGORY,
            variables: { _id: category._id },
            data: { category: rootQuery.category },
          });
        } catch {
        }
        try {
          const rootQuery = cache.readQuery({ query: FETCH_FINISHED_PROJECT, variables: { _id }, });
          const relevantProject = rootQuery.project;
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy.push(followProject);
          cache.writeQuery({
            query: FETCH_FINISHED_PROJECT,
            variables: { _id },
            data: { project: rootQuery.project },
          });
        } catch {

        }
      }
    });
  const [unFollowProject] = useMutation(
    UNFOLLOW_PROJECT,
    {
      update(cache, { data: { unFollowProject } }) {
        try {
          const rootQuery = cache.readQuery({ query: FETCH_FINISHED_PROJECTS });
          const relevantProject = rootQuery.finishedProjects.find(p => p._id === _id);
          // unFollowProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy = relevantProject.followedBy.filter(u => u._id !== unFollowProject._id);
          cache.writeQuery({
            query: FETCH_FINISHED_PROJECTS,
            data: { finishedProjects: rootQuery.finishedProjects },
          });
        } catch {
        }
        try {
          const rootQuery = cache.readQuery({ query: FETCH_CATEGORY, variables: { _id: category._id }, });
          const relevantProject = rootQuery.category.projects.find(p => p._id === _id);
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy = relevantProject.followedBy.filter(u => u._id !== unFollowProject._id);
          cache.writeQuery({
            query: FETCH_CATEGORY,
            variables: { _id: category._id },
            data: { category: rootQuery.category },
          });
        } catch {
        }
        try {
          const rootQuery = cache.readQuery({ query: FETCH_FINISHED_PROJECT, variables: { _id }, });
          const relevantProject = rootQuery.project;
          // followProject returns a user object, which is why this might be confusing...
          relevantProject.followedBy = relevantProject.followedBy.filter(u => u._id !== unFollowProject._id);
          cache.writeQuery({
            query: FETCH_FINISHED_PROJECT,
            variables: { _id },
            data: { project: rootQuery.project },
          });
        } catch {

        }
      }
    });
  
  const defaultImage = "https://punchender-dev.s3.us-east-2.amazonaws.com/StockSnap_Q1KHHDXXZT.jpg";
  const endDateObj = new Date(endDate);
  const [dateNum, dateText] = getDateNumAndText(endDateObj);

  return (
    <div className="project-show-main">
      <h1>{name}</h1>
      <p>{description}</p>
      <div className="project-show-main-content">
        <div className="main-content-column-1">
          <div 
            className="main-content-image"
            style={{ backgroundImage: `url(${image || defaultImage})`}}
          />
        </div>
        <div className="main-content-column-2">
          <div className="main-content-amount">
            <em className="amount-total">${numWithCommas(amountRaised)}</em>
            <span className="amount-goal">pledged of ${numWithCommas(goal)} goal</span>
          </div>
          <div className="main-content-backers">
            <em className="backer-num">{backers.length}</em>
            <span className="backer-text">backers</span>
          </div>
          <div className="main-content-date">
            <em>{dateNum}</em>
            <span>{dateText} left</span>
          </div>
          <div className="main-content-buttons">
            <Link 
              to={`/projects/${props.project._id}/pledge`}
              className="project-back-link">
              Back this project
            </Link>
            { currentUser && (followed ? 
              <button
                onClick={e => {
                  e.preventDefault();
                  unFollowProject({
                    variables: {
                      user_id: localStorage.userId,
                      project_id: props.project._id
                    }
                  })
                }}
              >
                Unfollow
              </button>
              :
              <button
                onClick={e => {
                  e.preventDefault();
                  followProject({
                    variables: {
                      user_id: localStorage.userId,
                      project_id: props.project._id
                    }
                  })
                }}
              >
                Remind Me
              </button>
            )}
          </div>

        </div>
      </div>
      <div className="main-content-category">
        <Link 
          to={`/categories/${category._id}`}>
          <i className={`${category.icon}`} /> {category.name}
        </Link>
      </div>
    </div>
  )
};

export default withApollo(MainPanel);