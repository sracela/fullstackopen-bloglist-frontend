import React from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import {
  Card,
  Heading,
  Pane,
  Strong,
  Avatar,
  Paragraph,
  TrashIcon,
  Badge,
  Pill,
  ThumbsUpIcon,
} from "evergreen-ui";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  if (!blog) {
    return (
      <Card
        elevation={3}
        margin="auto"
        background="white"
        width={500}
        height={500}
        display="grid"
        placeItems="center"
      >
        <Heading size={100} textAlign="center">
          no data
        </Heading>
      </Card>
    );
  }

  const handleLike = (blogObject) => async () => {
    try {
      await dispatch(likeBlog(blogObject));
      dispatch(setNotification(`Like!`, false, 3));
    } catch (e) {
      dispatch(setNotification(`Error liking the blog!`, true, 3));
    }
  };

  const handleRemove = (blogObject) => async () => {
    if (window.confirm(`Do you really want to remove ${blogObject.title}?`)) {
      try {
        await dispatch(removeBlog(blogObject));
        dispatch(setNotification(`Remove!`, false, 3));
      } catch (e) {
        dispatch(setNotification(`Error removing the blog!`, true, 3));
      }
    }
  };
  return (
    <Pane
      padding={8}
      display="flex"
      flexDirection="column"
      width="100%"
      id={blog.id}
    >
      <Card
        elevation={3}
        margin="auto"
        background="white"
        textAlign="center"
        height={500}
        position="relative"
      >
        <Pane borderRadius={4} height={500} overflow="hidden">
          <img src={"../calm.jpg"} width="100%" height="100%" alt="Blog" />
        </Pane>

        <Card
          elevation={3}
          margin="auto"
          background="white"
          textAlign="center"
          height={250}
          width="90%"
          position="absolute"
          top="45%"
          right="5%"
          hoverElevation={4}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
          padding={16}
        >
          <Pane textAlign="left">
            <Badge color="purple">Coding</Badge>
            <Heading is="h3" size={700} marginTop={8}>
              {blog.title}
            </Heading>
          </Pane>
          <Pane alignSelf="center">
            <Heading size={100} color="red">
              <Pill display="inline-flex" margin={8} color="red" isSolid>
                {blog.likes}
              </Pill>
              LIKES
            </Heading>
          </Pane>
          <Pane
            textAlign="center"
            display="flex"
            justifyContent="space-around"
            marginX="auto"
            width="100%"
          >
            <Pane>
              <Paragraph size={400} color="muted">
                Created by:
              </Paragraph>
              <Paragraph>
                <Strong>{blog.author}</Strong>
              </Paragraph>
            </Pane>
            <Pane>
              <Paragraph size={400} color="muted">
                It can be visited at
              </Paragraph>
              <Paragraph>
                <Strong>{blog.url}</Strong>
              </Paragraph>
            </Pane>
          </Pane>

          <Pane width="100%" display="flex" justifyContent="center">
            <Badge
              height={32}
              width={32}
              padding={8}
              borderRadius="100%"
              color="red"
              cursor="pointer"
              onClick={handleLike(blog)}
            >
              <ThumbsUpIcon />
            </Badge>

            <Badge
              height={32}
              width={32}
              padding={8}
              marginLeft={8}
              borderRadius="100%"
              cursor="pointer"
              color="blue"
              onClick={handleRemove(blog)}
            >
              <TrashIcon />
            </Badge>
          </Pane>

          <Pane
            color="dark"
            marginLeft={8}
            alignSelf="end"
            position="absolute"
            right={"0%"}
            top={"0%"}
            padding={16}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
          >
            {blog.user && (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/users/${blog.user.id}`}
                >
                  <Avatar name={blog.user.username} size={36} />
                </Link>
              </>
            )}
          </Pane>
        </Card>
      </Card>
      <Pane marginTop={32}>
        <Comments blogId={blog.id} comments={blog.comments} />
      </Pane>
    </Pane>
  );
};
export default Blog;
