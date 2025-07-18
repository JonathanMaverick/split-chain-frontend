import type { IRoute } from "../interfaces/route-interface";
import Landing from "../page/Landing";
import Participant from "../page/Participant";

export const RouteSetting: IRoute[] = [
  {
    name: "Landing",
    path: "/",
    element: <Landing />,
  },
  {
    name: "Participant",
    path: "/participant",
    element: <Participant />,
  },
];
