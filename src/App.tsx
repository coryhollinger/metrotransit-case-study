"use client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import RoutePicker from "./components/RoutePicker";
import DirectionPicker from "./components/DirectionPicker";
import SearchResults from "./components/SearchResults";
import Header from "./components/Header";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary
          FallbackComponent={() => (
            <div>Oops! Something went wrong. Try reloading the page.</div>
          )}
        >
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<RoutePicker />} />
              <Route path=":routeId" element={<DirectionPicker />} />
            </Route>
            <Route
              path="results/:routeId/:direction"
              element={<SearchResults />}
            />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
