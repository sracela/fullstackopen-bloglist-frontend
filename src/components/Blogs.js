import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import {
  Heading,
  Pane,
  Card,
  Avatar,
  Text,
  Badge,
  Paragraph,
  Small,
  Strong,
} from "evergreen-ui";
import {
  useHistory,
} from "react-router-dom";

export const BlogItem = ({ blog }) => {
  const history = useHistory();
  return (
    // <Link style={{ textDecoration: "none" }} to={`/blogs/${blog.id}`}>
      <Card
        key={blog.id}
        // boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
        background="white"
        elevation={3}
        hoverElevation={4}
        activeElevation={4}
        padding={24}
        width={274}
        minHeight={230}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        position="relative"
        cursor="pointer"
        onClick={() => history.push(`/blogs/${blog.id}`)}
      >
        <Pane
          height={102}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Heading is="h4" size={600}>
            {blog.title}
          </Heading>
          <Paragraph color="muted" marginTop={8}>
            Created by: {blog.author}
          </Paragraph>
        </Pane>
        <Pane
          height={18}
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
                <Avatar name={blog.user.username} size={30} />
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                to={`/users/${blog.user.id}`}
              >
                <Text color="info" marginLeft={8}>
                  <Small textTransform="uppercase">{blog.user.username}</Small>
                </Text>
              </Link>
            </>
          )}
        </Pane>

        <Text
          color="dark"
          marginLeft={8}
          alignSelf="end"
          position="absolute"
          right={"0%"}
          bottom={"0%"}
          padding={24}
        >
          <Strong>{blog.likes} likes</Strong>
        </Text>
      </Card>
    // </Link>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  return (
    <Pane padding={8} display="flex" flexDirection="column">
      <Pane display="flex" justifyContent="space-between" alignItems="center">
        <Pane>
          <Heading size={700}>All Blogs</Heading>
          <Heading size={100} marginTop="default">
            {users.length} USERS
          </Heading>
        </Pane>
        <Pane marginTop="20px">
          <Paragraph>{blogs.length} Total Blogs</Paragraph>
          <Paragraph marginTop="default" marginBottom="default">
            <Link style={{ textDecoration: "none" }} to="/users">
              <Badge color="red">VIEW USERS</Badge>
            </Link>
          </Paragraph>
        </Pane>
      </Pane>
      <Pane backgroundColor="#E4E7EB" height="0.25px" />
      <Pane marginY={32} width="100%">
        <BlogForm />
      </Pane>
      <Pane
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        columnGap={8}
        rowGap={32}
        listStyle="none"
        alignItems="start"
      >
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
      </Pane>
    </Pane>
  );
};

export default Blogs;
