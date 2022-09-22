import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Post from "../components/Post";

describe("Post component", () => {
  it("renders the correct elements", () => {
    const { container } = render(
      <Post
        user={{
          id: 1,
        }}
        post={{
          author: {
            full_name: "Ben Chanapai",
            profile_pic_url: "",
          },
          text: "Test post!",
          added_formatted: "29 Sep 2021",
          likes: [],
          comments: [],
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
