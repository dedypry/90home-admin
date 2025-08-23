import { Route, Routes } from "react-router-dom";

import DashboardLayout from "./components/layouts/dashboard";
import HomePage from "./pages/home";
import ErrorNotFoundPage from "./pages/errors/not-found";
import AuthLayout from "./components/layouts/auth";
import LoginPage from "./pages/auth/login";
import RolePage from "./pages/settings/roles";
import ProductPage from "./pages/product";
import ProductCreatePage from "./pages/product/create";
import DeveloperPage from "./pages/developers";

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route element={<HomePage />} path="/" />

        <Route path="/products">
          <Route element={<ProductPage />} path="" />
          <Route element={<ProductCreatePage />} path="create" />
        </Route>
        <Route path="/developers">
          <Route element={<DeveloperPage />} path="" />
        </Route>
        <Route path="/settings">
          <Route element={<RolePage />} path="roles" />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route element={<LoginPage />} path="/login" />
      </Route>

      {/* Page Error */}
      <Route
        element={
          <DashboardLayout>
            <ErrorNotFoundPage />
          </DashboardLayout>
        }
        path="*"
      />
    </Routes>
  );
}

export default App;
