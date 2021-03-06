import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BlogItem } from "./Blogs";
import {
  Card,
  Heading,
  Text,
  Pane,
  Strong,
  Avatar,
  Badge,
  CommentIcon,
  ThumbsUpIcon,
} from "evergreen-ui";

const User = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const user = users.find((n) => n.id === id.toString());
  console.log("🚀 ~ file: User.js ~ line 21 ~ User ~ user", user);
  if (!user) {
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

  const totalLikes = user.blogs.reduce((prev, curr) => {
    const blog = blogs.find((blog) => blog.id === curr.id);
    return prev + blog.likes;
  }, 0);

  const totalComments = user.blogs.reduce((prev, curr) => {
    const blog = blogs.find((blog) => blog.id === curr.id);
    return prev + blog.comments.length;
  }, 0);

  return (
    <Pane padding={8} display="flex" flexDirection="column" 
      height="100%"
      maxWidth="1000px"
      overflowY="hidden"
      overflowX="hidden">
      <Card
        elevation={3}
        marginX="auto"
        background="white"
        textAlign="center"
        width={500}
        height={380}
        padding={32}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        position="relative"
        marginBottom={32}
      >
        <Avatar name={user?.name} size={100} />
        <Pane alignSelf="center">
          <Heading size={600} marginTop="default">
            {user.name}
          </Heading>
          <Text color="muted">Blog Creator</Text>
          <Pane
            marginTop={32}
            display="flex"
            justifyContent="space-between"
            left="10%"
            position="absolute"
            width="80%"
          >
            <Pane display="flex" flexDirection="column">
              <Badge
                height={32}
                width={32}
                padding={8}
                borderRadius="100%"
                color="red"
              >
                <ThumbsUpIcon />
              </Badge>
              <Text>
                <Strong>{totalLikes}</Strong>
              </Text>
            </Pane>
            <Pane display="flex" flexDirection="column">
              <Badge
                height={32}
                width={32}
                padding={8}
                borderRadius="100%"
                color="blue"
              >
                <CommentIcon />
              </Badge>
              <Text>
                <Strong>{totalComments}</Strong>
              </Text>
            </Pane>
          </Pane>
        </Pane>
      </Card>

      <Heading marginY={32} size={700}>
        Added blogs
      </Heading>
            <Pane
        display="grid"
        height="400px"
        gridTemplateColumns={`repeat(${blogs.length}, 30%)`}
        gridTemplateRows="repeat(1, 10%)"
        gridAutoColumns="15%"
        gridAutoFlow="column"
        listStyle="none"
        alignItems="start"
        overflowX="auto"
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

export default User;
