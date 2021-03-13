import React from "react";
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { addCommentToBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from "./Togglable";
import {
  Card,
  Heading,
  Pane,
  TextInputField,
  ArrowRightIcon,
  Button,
  Paragraph,
} from "evergreen-ui";

const Comments = ({ blogId, comments }) => {
  const dispatch = useDispatch();
  const { reset: resetComment, ...comment } = useField("text");
  const addComment = async (event) => {
    event.preventDefault();
    const newComment = { id: blogId, comment: comment.value };
    try {
      dispatch(addCommentToBlog(newComment));
      dispatch(
        setNotification(`New coment "${newComment.comment}" added`, false, 3)
      );
      resetComment();
    } catch (e) {
      dispatch(setNotification(`Error commenting the blog!`, true, 3));
    }
  };
  return (
    <Pane width="100%">
      <Heading size={600}>Comments ({comments.length})</Heading>

      <form onSubmit={addComment}>
        <Pane display="flex" width="100%" marginTop={16}>
          <TextInputField
            width="75%"
            placeholder="Type your comment"
            {...comment}
          />
          <Button
            type="submit"
            appearance="primary"
            height={30}
            iconAfter={ArrowRightIcon}
            marginLeft={8}
            marginTop={4}
          >
            ADD
          </Button>
        </Pane>
      </form>

      <Togglable buttonLabel="Show comments" id={"comments"}>
        <Pane width="100%" marginTop={8} 
        display="grid"
        height="100%"
        gridTemplateColumns={`repeat(${comments.length}, 30%)`}
        gridTemplateRows="repeat(1, 10%)"
        gridAutoColumns="15%"
        gridAutoFlow="column"
        listStyle="none"
        alignItems="start"
        overflowX="auto">
          {comments.length !== 0 ? (
            comments.map((comment, index) => (
              <Card
                marginY={8}
                marginX={32}
                minWidth="200px"
                minHeight="50px"
                elevation={3}
                padding={0}
                background="white"
                key={`comment_${index}`}
                display="flex"
              >
                <Pane width="5px" background="purple" height="100%"></Pane>
                <Pane margin={8}>
                  <Heading as="h5" size={400}>
                    Comment {index}
                  </Heading>
                  <Paragraph>{comment}</Paragraph>
                </Pane>
              </Card>
            ))
          ) : (
            <Card>
              <Paragraph>no comments for this blog</Paragraph>
            </Card>
          )}
        </Pane>
      </Togglable>
    </Pane>
  );
};

export default Comments;
