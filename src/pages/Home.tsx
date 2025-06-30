import { NavLink, Outlet } from "react-router-dom";
import authDocs from "../constants/docs.auth";

type Props = {};

const Home = ({}: Props) => {
  return (
    <div className="flex h-screen">
      <aside className="w-56 bg-gray-900 text-white flex-shrink-0">
        <nav className="h-full flex flex-col py-8">
          <ul className="space-y-2">
            <li>
              {authDocs.map((doc) => (
                <NavLink
                  key={doc.file_path}
                  to={`${doc.path}`}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-800" : ""
                    }`
                  }
                >
                  {doc.title}
                </NavLink>
              ))}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default Home;
