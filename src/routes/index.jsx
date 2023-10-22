import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/homePage"));
const TrackingPage = lazy(() => import("../pages/trackingPage"));

export default function Router() {
  return (
    <Routes>
      <Route path={`/`} element={<HomePage />} />
      <Route path={`/tracking/:id`} element={<TrackingPage />} />
    </Routes>
  );
}
