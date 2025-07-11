import React, { useEffect } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Aboutus from "./pages/Aboutus/Aboutus";
import Contactus from "./pages/Contactus/Contactus";
import Achivement from "./pages/Achivement/Achivement";
import Process from "./pages/Process/Process";
import Home from "./pages/Homepage/Home";
import Appointment from "./pages/Homepage/Appointment";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import useAuthStore from "./store/authStore";
import NotFound from "./pages/ErrorPages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect/AuthRedirect";
import ManageClients from "./pages/Adminlogin/Manage";
import Listing from "./pages/DashboardPages/Listing";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import AppointmentEdit from "./pages/Appointment/AppointmentEdit";
import AppointmentDelete from "./pages/Appointment/AppointmentDelete";
import BlogPage from "./pages/Blog/BlogPage";
import ManageQuestions from "./pages/DashboardPages/ManageQuestions";
import AddQuestions from "./pages/DashboardPages/AddQuestions";

import ManageQuestion from "./pages/Admin/ManageQuestions/ManageQuestion";
import QueForm from "./components/Admin/Questions/QueForm";

import QueList from "./components/Admin/Questions/QueList";
import QuestionForm from "./components/Admin/Questions/QueForm";
import QuestionList from "./pages/Admin/ManageQuestions/QuestionList";
import AddQuestionForm from "./pages/Admin/ManageQuestions/AddQuestionForm";
import QuestionnairePage from "./pages/Appointment/QuestionnairePage";
import UDashboard from "./pages/Dashboard/UDashboard";
import Clientlisting from "./pages/ManageClient/Clientlisting";
import BlogDetailsPage from "./pages/Blog/BlogDetailsPage";
function App() {
  console.log("first line read");
  const { user, checkAuth, loading } = useAuthStore();
  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, []);
  console.log(user);
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route
            path="login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="signup"
            element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            }
          />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailsPage />} />
          <Route path="achievement" element={<Achivement />} />
          <Route path="process" element={<Process />} />
          <Route path="contactus" element={<Contactus />} />

          <Route path="*" element={<NotFound />} />
          <Route
            path="appointment"
            element={
              <ProtectedRoute roles={["admin", "user"]}>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="user-dashboard"
            element={
              <ProtectedRoute roles={["admin", "user"]}>
                <UDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/questionnaire/:appointmentId"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <QuestionnairePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />

        {/* admin routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Listing />} />
          <Route path="ManageClients" element={<ManageClients />} />
          <Route path="listing" element={<Listing />} />
          <Route path="clientlisting" element={<Clientlisting />} />
          <Route path="delete/:id" element={<AppointmentDelete />} />
          <Route path="appointment/edit/:id" element={<AppointmentEdit />} />
          <Route path="manage-questions" element={<QuestionList />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
