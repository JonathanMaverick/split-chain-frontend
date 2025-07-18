import { Route, Routes } from "react-router-dom";
import { RouteSetting } from "../../settings/RouteSetting";
import type { IRoute } from "../../interfaces/route-interface";

function RouteComponent() {
  return (
    <>
      <Routes>
        {RouteSetting.map((menu: IRoute, index) => (
          <Route key={index} path={menu.path} element={menu.element} />
        ))}
      </Routes>
    </>
  );
}

export default RouteComponent;
