import type { IRoute } from "../interfaces/route-interface";
import Friends from "../pages/Friends";
import History from "../pages/History";
import Participant from "../pages/Participant";
import NewBill from "../pages/NewBill";
import BillTest from "../pages/BillTest";
import ViewBill from "../pages/ViewBill";
import CreatedBills from "../pages/CreatedBills";

export const RouteSetting: IRoute[] = [
  {
    name: "App",
    path: "/",
    element: <></>,
  },
  {
    name: "New Bill",
    path: "/new-bill",
    element: <NewBill />,
  },
  {
    name: "Friends",
    path: "/friends",
    element: <Friends />,
  },
  {
    name: "History",
    path: "/history",
    element: <History />,
  },
  {
    name: "Bill-Test",
    path: "/bill",
    element: <BillTest />,
  },
  {
    name: "Created Bills",
    path: "/created-bills",
    element: <CreatedBills />,
  },
  {
    name: "Participant",
    path: "/participant",
    element: <Participant />,
  },
  {
    name: "View Bill",
    path: "/view-bill/:billId",
    element: <ViewBill />,
  },
];
