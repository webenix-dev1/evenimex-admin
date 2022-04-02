import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as s from "../../styles/component/bottomtab.style";
import router from "../../utils/router";
import { Container, Row, Col } from "react-bootstrap";
import InlineSVG from "svg-inline-react";
import {
  HomeIcon_svg,
  SearchIcon_svg,
  MeementTabIcon_svg,
  ChatIcon_svg,
  UserSliderIcon_svg,
} from "../../assets/svgs/svgOfPage";

const BottomTab = () => {
  const Router = useRouter();
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    setActivePath(Router.pathname);
  }, []);

  return (
    <s.FooterBarMain>
      <Container>
        <Row>
          <Col md={12}>
            <s.TabMenuMain>
              <s.TabMenuUl>
                <s.TabMenuLi
                  onClick={() => {
                    Router.push(router.HOME);
                    setActivePath(router.HOME);
                  }}
                  className={activePath == router.HOME ? "fill_icon" : ""}
                >
                  <InlineSVG src={HomeIcon_svg} className="Home_Icon" />
                </s.TabMenuLi>
                <s.TabMenuLi
                  onClick={() => {
                    Router.push(router.SEARCH);

                    setActivePath(router.SEARCH);
                  }}
                  className={activePath == router.SEARCH ? "fill_icon" : ""}
                >
                  <InlineSVG src={SearchIcon_svg} className="Search_Icon" />
                </s.TabMenuLi>
                <s.TabMenuLi
                  onClick={() => {
                    Router.push(router.HOME);
                  }}
                  className={activePath == "/meement-icon" ? "fill_icon" : ""}
                >
                  <InlineSVG
                    src={MeementTabIcon_svg}
                    className="Meement_Icon"
                  />
                </s.TabMenuLi>
                <s.TabMenuLi
                  onClick={() => {
                    Router.push(router.HOME);
                  }}
                  className={activePath == "/chats" ? "fill_icon" : ""}
                >
                  <InlineSVG src={ChatIcon_svg} className="Chat_Icon" />
                  <s.NotifactionCount>10</s.NotifactionCount>
                </s.TabMenuLi>
                <s.TabMenuLi
                  onClick={() => {
                    Router.push(router.HOME);
                  }}
                  className={activePath == "/user-details" ? "fill_icon" : ""}
                >
                  <InlineSVG src={UserSliderIcon_svg} className="User_Icon" />
                  <s.NotifactionCount>10</s.NotifactionCount>
                </s.TabMenuLi>
              </s.TabMenuUl>
            </s.TabMenuMain>
          </Col>
        </Row>
      </Container>
    </s.FooterBarMain>
  );
};
export default memo(BottomTab);
