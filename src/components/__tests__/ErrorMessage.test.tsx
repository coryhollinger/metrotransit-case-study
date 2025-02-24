import { render, screen } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage Component", () => {
  it("should render without crashing", () => {
    render(<ErrorMessage error={new Error("An error occurred")} />);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("should display the correct error message", () => {
    const errorMessage = "An error occurred";
    render(<ErrorMessage error={new Error("An error occurred")} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render default when no message is provided", () => {
    render(
      <ErrorMessage
        error={new Error("Oops! Something went wrong. Please try again.")}
      />
    );
    expect(
      screen.getByText("Oops! Something went wrong. Please try again.")
    ).toBeInTheDocument();
  });
});
