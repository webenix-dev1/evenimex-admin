import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import * as s from "../../styles/component/header.style";
import router from "../../utils/router";
import { Container, Row, Col } from "react-bootstrap";
let refContainer = null;
const Header = () => {
  const routers = useRouter();

  return (
    <s.HeaderBarMain>
      <Container>
        <Row>
          <s.NavBarMain>
            <s.NavLogo>
              <Link href={router.HOME} passHref>
                <s.NavBarLogo>
                  <img src="/images/MeeMentlogonew.png" alt="Meement Logo" />
                </s.NavBarLogo>
              </Link>
            </s.NavLogo>
          </s.NavBarMain>
        </Row>
      </Container>
    </s.HeaderBarMain>
  );
};

export default Header;
