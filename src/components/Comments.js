import React from "react";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { addCommentToBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Comments = ({ blogId, comments }) => {
  const dispatch = useDispatch();
    const { reset: resetComment, ...comment } = useField("text");
    const addComment = async (event) => {

        event.preventDefault();
        const newComment = { id: blogId, comment: comment.value }
        try { 
            dispatch(addCommentToBlog(newComment));
            dispatch(
              setNotification(
                `New coment "${newComment.comment}" added`,
                false,
                3
              )
            );
            resetComment();
        } catch (e) {
      dispatch(setNotification(`Error commenting the blog!`, true, 3));
        }

    };
    return (
      <div>
        <h4>Comments</h4>
        <form onSubmit={addComment}>
          new comment:
          <input {...comment} />
          <button type="submit">add comment</button>
        </form>
        {comments.length !== 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={`comment_${index}`}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>no comments for this blog</p>
        )}
      </div>
    );
}

export default Comments;