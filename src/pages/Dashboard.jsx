import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "" });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  useEffect(() => {
    const fetchUser = async () => {
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   navigate("/login");
      //   return;
      // }

      try {
        // const config = {
        //   headers: { Authorization: `Bearer ${token}` },
        // };
        const { data } = await api.get("/api/users/me");
        setUser({ name: data.firstName, role: data.role });
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // endpoint that clears the auth cookie on the server
      await api.post("/api/users/logout");
    } catch (e) {
      console.log("logout error", e);
    } finally {
      // client-side cleanup / redirect
      setUser({ name: "", role: "" });
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Dashboard Page</h1>

<div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-2xl font-bold border-b">LMS</div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <h1 className="text-xl font-semibold">
            Welcome {user.role ? `${user.role} ${user.name}` : user.name} 👋
          </h1>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Profile
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded shadow">Total Courses</div>
            <div className="p-4 bg-white rounded shadow">Progress</div>
            <div className="p-4 bg-white rounded shadow">Enrolled Students</div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}