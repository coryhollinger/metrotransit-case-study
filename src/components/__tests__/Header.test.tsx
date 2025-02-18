import { render, screen } from "@testing-library/react";
import Header from "..//Header";
import { MemoryRouter } from "react-router";

const mockedUseNavigate = vi.fn();

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useNavigate: () => mockedUseNavigate,
}));

describe("Header Component", () => {
  it("should render without crashing", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should navigate to '/' when button is pressed", () => {
    render(
      <MemoryRouter initialEntries={["/1"]}>
        <Header />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    button.click();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });

  it("should nnot render button when route is '/'", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const button = screen.queryByRole("button");

    expect(button).toBeNull();
  });
});
