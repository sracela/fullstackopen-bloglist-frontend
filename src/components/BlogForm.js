import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import { Pane, Button, Dialog, TextInputField } from "evergreen-ui";

const BlogForm = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const [isShown, setIsShown] = useState(false);

  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetURL, ...url } = useField("text");

  const handleReset = () => resetTitle(resetAuthor(resetURL()));

  useEffect(handleReset, [isShown]);

  const addBlog = async (event) => {
    console.log("🚀 ~ file: BlogForm.js ~ line 23 ~ addBlog ~ event", event);
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: currentUser,
    };
    try {
      await dispatch(createBlog(newBlog));
      dispatch(
        setNotification(`New blog "${newBlog.title}" created`, false, 3)
      );
      handleReset();
      setIsShown(false);
    } catch (e) {
      dispatch(setNotification(`Error creating new blog`, true, 3));
      handleReset();
      setIsShown(false);
    }
  };

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title="New Blog"
        onCloseComplete={addBlog}
        confirmLabel="ADD BLOG"
      >
        <form>
          <TextInputField
            label="Title"
            placeholder="The best blog ever"
            {...title}
          />
          <br />
          <br />
          <TextInputField
            label="Author"
            placeholder="The best writer ever"
            {...author}
          />
          <br />
          <br />
          <TextInputField label="URL" placeholder="fantasti.co" {...url} />
          <br />
          <br />
        </form>
      </Dialog>
      <Pane width="100%" padding={32} position="relative">
        <Button
          position="absolute"
          right={"0%"}
          bottom={16}
          intent="warning"
          appearance="primary"
          onClick={() => setIsShown(true)}
        >
          CREATE NEW BLOG
        </Button>
      </Pane>
    </Pane>
  );
};

export default BlogForm;
