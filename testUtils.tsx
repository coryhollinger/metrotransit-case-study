import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router";

interface RenderWithMemoryRouterOptions
  extends Omit<Parameters<typeof render>[1], "wrapper"> {
  initialEntries?: string[];
}

const renderWithMemoryRouter = (
  ui: ReactElement,
  options?: RenderWithMemoryRouterOptions
) => {
  const { initialEntries, ...renderOptions } = options || {};
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export { renderWithMemoryRouter };
