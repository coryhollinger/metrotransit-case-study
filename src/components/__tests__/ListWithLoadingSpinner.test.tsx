import { render, screen } from "@testing-library/react";
import ListWithLoadingSpinner from "../ListWithLoadingSpinner";
import { ListItem } from "@mui/material";

describe("ListWithLoadingSpinner Component", () => {
  it("should render without crashing", () => {
    render(<ListWithLoadingSpinner isLoading={false} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should display loading spinner when isLoading is true", () => {
    render(<ListWithLoadingSpinner isLoading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should not display loading spinner when isLoading is false", () => {
    render(<ListWithLoadingSpinner isLoading={false} />);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("should display list items when isLoading is false", () => {
    render(
      <ListWithLoadingSpinner isLoading={false}>
        <ListItem>Item 1</ListItem>
      </ListWithLoadingSpinner>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });
});
