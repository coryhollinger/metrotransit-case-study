import { render, screen } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage Component", () => {
  it("should render without crashing", () => {
    render(<ErrorMessage error="An error occurred" />);
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("should display the correct error message", () => {
    const errorMessage = "An error occurred";
    render(<ErrorMessage error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should not render when no message is provided", () => {
    const { container } = render(<ErrorMessage error="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
