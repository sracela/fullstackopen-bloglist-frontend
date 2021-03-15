import blogReducer from "./blogReducer";
import deepFreeze from "deep-freeze";

describe("blogReducer", () => {
  test("returns new state with action NEW_BLOG", () => {
    const state = [];
    const action = {
      type: "NEW_BLOG",
      data: {
        title: "Test New Blog",
        author: "sara",
        url: "testNewBlog.com",
        likes: 2,
        id: 1,
      },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
  });
  test("returns new state with action LIKE", () => {
    const state = [
      {
        title: "Test New Blog 1",
        author: "sara",
        url: "testNewBlog1.com",
        likes: 1,
        id: 1,
      },
      {
        title: "Test New Blog 2",
        author: "sara",
        url: "testNewBlog2.com",
        likes: 2,
        id: 2,
      },
    ];

    const action = {
      type: "LIKE_BLOG",
      data: {
        id: 2,
      },
    };

    deepFreeze(state);
    const newState = blogReducer(state, action);

    expect(newState).toHaveLength(2);

    expect(newState).toContainEqual(state[0]);

    expect(newState).toContainEqual({
      title: "Test New Blog 2",
      author: "sara",
      url: "testNewBlog2.com",
      likes: 3,
      id: 2,
    });
  });
});
