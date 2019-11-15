import React from 'react';
import { getDateNumAndText } from '../../../../util/num_util';

const CommentPanel = props => {
  const { comment } = props;
  const [dateNum, dateText] = getDateNumAndText(new Date(parseInt(comment.date)));
  const image = comment.author.image ? comment.author.image :
    "https://ksr-ugc.imgix.net/missing_user_avatar.png?ixlib=rb-2.1.0&w=80&h=80&fit=crop&v=&auto=format&frame=1&q=92&s=d89e3180fafd307918a94a3c9dd79c45";

  return (
    <li className="comment-panel">
      <div className="comment-panel-header">
        <div className="comment-panel-img-container">
          <img 
            className="comment-panel-img"
            src={image}
          />
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