import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserHistory } from "history";

import { MainHotelListing } from "./hotel_listing/main";
import { api } from "./services/api";

import "./reset.css";
import "./global.css";

const history = createBrowserHistory();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainHotelListing history={history} api={api} />
  </React.StrictMode>
);
