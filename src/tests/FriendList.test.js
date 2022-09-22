import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FriendList from "../components/FriendList";

describe("FriendList component", () => {
  it("renders the correct elements", () => {
    const { container } = render(
      <FriendList
        friends={[
          {
            _id: 1,
            full_name: "Ben Chanapai",
            profile_pic_url: "",
          },
          {
            _id: 2,
            full_name: "John Chanapai",
            profile_pic_url: "",
          },
        ]}
        friendRequests={[
          {
            _id: 1,
            full_name: "Ben Chanapai",
            profile_pic_url: "",
          },
          {
            _id: 2,
            full_name: "John Chanapai",
            profile_pic_url: "",
          },
        ]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
