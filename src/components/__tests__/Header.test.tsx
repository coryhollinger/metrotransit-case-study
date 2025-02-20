import { screen } from "@testing-library/react";
import Header from "..//Header";
import { renderWithMemoryRouter } from "../../../testUtils";

const mockedUseNavigate = vi.fn();

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => mockedUseNavigate,
}));

describe("Header Component", () => {
  it("should render without crashing", () => {
    renderWithMemoryRouter(<Header />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should navigate to '/' when button is pressed", () => {
    renderWithMemoryRouter(<Header />, {
      initialEntries: ["/1"],
    });

    const button = screen.getByRole("button");
    button.click();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });

  it("should not render button when route is '/'", () => {
    renderWithMemoryRouter(<Header />);

    const button = screen.queryByRole("button");

    expect(button).toBeNull();
  });
});
