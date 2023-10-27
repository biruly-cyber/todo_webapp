import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom" instead of "react-dom/client"
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export const server = "http://localhost:4000/api/v1";

export const Context = createContext({ isAuthenticated: false }); // Fix the typo here

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}> {/* Fix the typo here */}
      <App />
    </Context.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

reportWebVitals();
