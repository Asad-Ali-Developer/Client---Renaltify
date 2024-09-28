import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./components/MainLayout"
import Home from "./pages/Home"
import Tenants from "./pages/Tenants"
import About from "./pages/About"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import { AuthProvider } from "./store/authToken"
import RegisterTenant from "./pages/RegisterTenant"
import ShowTenantDetails from "./pages/ShowTenantDetails"
import UpdateTenant from "./pages/UpdateTenant"
import UserProfile from "./pages/UserProfile"



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/tenants/add_tenant" element={<RegisterTenant />} />
        <Route path="/tenant/:_id/view" element={<ShowTenantDetails />} />
        <Route path="/tenant/:_id/update" element={<UpdateTenant />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)


const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App