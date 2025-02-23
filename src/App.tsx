"use client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import RoutePicker from "./components/RoutePicker";
import DirectionPicker from "./components/DirectionPicker";
import SearchResults from "./components/StopDisplay";
import Header from "./components/Header";
import { ErrorBoundary } from "react-error-boundary";
import { ERROR_BOUNDARY_MESSAGE } from "./strings";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary
          FallbackComponent={() => <div>{ERROR_BOUNDARY_MESSAGE}</div>}
        >
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<RoutePicker />} />
              <Route path="search/:routeId" element={<DirectionPicker />} />
            </Route>
            <Route
              path="search/:routeId/:direction"
              element={<SearchResults />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
