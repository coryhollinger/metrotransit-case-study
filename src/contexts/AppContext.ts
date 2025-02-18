import { createContext } from "react";

export interface AppState {
  routeName: string;
  directionName: string;
}

interface AppContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextType>({
  appState: { routeName: "", directionName: "" },
  setAppState: () => {},
});

export default AppContext;
