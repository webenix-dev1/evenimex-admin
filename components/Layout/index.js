import React from "react";
import { useRouter } from "next/router";
import BottomTab from "../BottomTab";
import Header from "../Header";
import { PagesLayout } from "../../styles/global/main.style";
import router from "../../utils/router";

const Layout = ({ children }) => {
  const routers = useRouter();

  return (
    <PagesLayout>
      {/* {routers.pathname != router.SIGNIN &&
        routers.pathname != router.SIGNUP &&
        routers.pathname != router.REGISTER && <Header />} */}
      <div className="main">{children}</div>
      {/* {routers.pathname != router.SIGNIN &&
        routers.pathname != router.SIGNUP &&
        routers.pathname != router.REGISTER && <BottomTab />} */}
    </PagesLayout>
  );
};

export default Layout;
