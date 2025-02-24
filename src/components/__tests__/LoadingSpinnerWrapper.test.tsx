import { render, screen } from "@testing-library/react";
import LoadingSpinnerWrapper from "../LoadingSpinnerWrapper";

describe("ListWithLoadingSpinner Component", () => {
  it("should render children without crashing", () => {
    render(
      <LoadingSpinnerWrapper isLoading={false}>
        <div data-testid="test-div"></div>
      </LoadingSpinnerWrapper>
    );
    expect(screen.getByTestId("test-div")).toBeInTheDocument();
  });

  it("should display loading spinner when isLoading is true", () => {
    render(<LoadingSpinnerWrapper isLoading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should not display loading spinner when isLoading is false", () => {
    render(<LoadingSpinnerWrapper isLoading={false} />);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});
