import { NavLink, Outlet } from "react-router-dom";
import style from "./MainLayout.module.css";

function MainLayout() {
  return (
    <>
      <nav className={style.nav}>
        <NavLink to="/">Pagination By Pages</NavLink>
        <NavLink to="/scroll">Infinity scroll</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
