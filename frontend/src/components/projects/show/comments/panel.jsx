import React from 'react';
import { getDateNumAndText } from '../../../../util/num_util';

const CommentPanel = props => {
  const { comment } = props;
  const [dateNum, dateText] = getDateNumAndText(new Date(parseInt(comment.date)));

  return (
    <li className="comment-panel">
      <div className="comment-panel-header">
        <div className="comment-panel-img-container">
          <div className="comment-panel-img" />
        </div>
        <div className="comment-panel-info">
          <p>{comment.author.name}</p>
          <span>{dateNum} {dateText} ago</span>
        </div>
      </div>
      <p className="comment-panel-body">
        {comment.body}
      </p>
    </li>
  )
};

export default CommentPanel;