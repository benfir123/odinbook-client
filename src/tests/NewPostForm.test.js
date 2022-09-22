import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewPostForm from "../components/NewPostForm";

describe("NewPostForm component", () => {
  it("renders the correct elements", () => {
    const { container } = render(
      <NewPostForm
        user={{
          full_name: "Ben Chanapai",
          first_name: "Ben",
          profile_pic_url: "",
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the correct input value", () => {
    const onChangeMock = jest.fn();
    render(
      <NewPostForm
        user={{
          full_name: "Ben Chanapai",
          first_name: "Ben",
          profile_pic_url: "",
        }}
        setPostText={onChangeMock}
      />
    );
    const input = screen.getByRole("textbox");

    userEvent.click(input);
    userEvent.type(input, "Lion");

    expect(input).toHaveValue("Lion");
  });
});
