"use client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import RoutePicker from "./components/RoutePicker";
import DirectionPicker from "./components/DirectionPicker";
import SearchResults from "./components/SearchResults";
import Header from "./components/Header";
import { useState } from "react";
import AppContext, { AppState } from "./contexts/AppContext";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [appState, setAppState] = useState<AppState>({
    routeName: "",
    directionName: "",
  });

  return (
    <>
      <BrowserRouter>
        <ErrorBoundary
          FallbackComponent={() => (
            <div>Oops! Something went wrong. Try reloading the page.</div>
          )}
        >
          <AppContext.Provider value={{ appState, setAppState }}>
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
          </AppContext.Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
