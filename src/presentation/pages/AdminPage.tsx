import { Outlet } from "react-router-dom";

const AdminPage = () => (
  <div>
    <h1>Admin Panel</h1>
    <Outlet />
  </div>
);

export default AdminPage;
