import { render, screen, fireEvent } from "@testing-library/react";
import PickerItem from "../PickerItem";

describe("PickerItem Component", () => {
  it("should render without crashing", () => {
    render(<PickerItem handleClick={vi.fn()} buttonText="Route 1" />);
    expect(screen.getByText("Route 1")).toBeInTheDocument();
  });

  it("should call handler when clicked", () => {
    const handleClick = vi.fn();
    render(<PickerItem buttonText="Route 1" handleClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
