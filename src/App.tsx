import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import ReportEnroll from "./pages/reports/reportEnroll";
import ReportStudent from "./pages/reports/reportStudent";
import ReportCourse from "./pages/reports/reportCourse";
import ReportProgram from "./pages/reports/reportProgram";
import ReportPayment from "./pages/reports/reportPayment";
const PanelMain: React.LazyExoticComponent<React.ComponentType<any>> =
  React.lazy(() => import("./layout/mainPanel"));
const PanelCourses: React.LazyExoticComponent<React.ComponentType<any>> =
  React.lazy(() => import("./pages/courses"));
const PanelPrograms: React.LazyExoticComponent<React.ComponentType<any>> =
  React.lazy(() => import("./pages/programs"));
const PanelStudents: React.LazyExoticComponent<React.ComponentType<any>> =
  React.lazy(() => import("./pages/students"));
const PanelEnrollment: React.LazyExoticComponent<React.ComponentType<any>> =
  React.lazy(() => import("./pages/enrollment"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PanelMain />,
    children: [
      {
        path: "/Enrollments",
        element: <PanelEnrollment />,
      },
      {
        path: "/Courses",
        element: <PanelCourses />,
      },
      {
        path: "/Programs",
        element: <PanelPrograms />,
      },
      {
        path: "/Students",
        element: <PanelStudents />,
      },
      {
        path: "/reports/Enrollments",
        element: <ReportEnroll />,
      },
      {
        path: "/reports/Students",
        element: <ReportStudent />,
      },
      {
        path: "/reports/Courses",
        element: <ReportCourse />,
      },
      {
        path: "/reports/Programs",
        element: <ReportProgram />,
      },
      {
        path: "/reports/Payments",
        element: <ReportPayment />,
      },
    ],
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <React.Suspense fallback={<LinearProgress />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </React.StrictMode>
  );
};

export default App;
