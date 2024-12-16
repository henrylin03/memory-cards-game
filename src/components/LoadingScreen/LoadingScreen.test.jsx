import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingScreen from ".";

describe("Loading screen component", () => {
  it("renders the container article", () => {
    render(<LoadingScreen />);
    expect(
      screen.getByRole("status", { name: /Loading/i })
    ).toBeInTheDocument();
  });

  it("renders the loading image", () => {
    render(<LoadingScreen />);

    const loadingImage = screen.getByRole("img", {
      name: "Loading animation",
    });

    expect(loadingImage).toBeInTheDocument();
  });

  it("renders text to advise loading state", () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/.../)).toBeInTheDocument();
  });
});
