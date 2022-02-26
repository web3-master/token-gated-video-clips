import { Layout, Row, Col } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import Market from "../containers/Market";
import Minter from "../containers/Minter";
import AppMenu from "../menu/AppMenu";
import Account from "../components/Account";
import logo from "../images/video-clip.png";
import { Route, Routes } from "react-router-dom";
import web3 from "../web3/connection/web3";
import Web3Context from "../web3/store/web3-context";
import CollectionContext from "../web3/store/collection-context";
import MarketplaceContext from "../web3/store/marketplace-context";
import { useContext } from "react";
import Profile from "../containers/Profile";
import Detail from "../containers/Detail";
import WrongNetwork from "../containers/WrongNetwork";

const AppLayout = () => {
  const web3Ctx = useContext(Web3Context);
  const isConnected = web3 && web3Ctx.account;

  return (
    <Row>
      <Col span={24}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header>Token Gated Video Clips</Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/creator" element={<Creator />} />
              <Route path="/buyer" element={<Buyer />} />
            </Routes>
          </Content>
          <Footer
            style={{
              position: "sticky",
              bottom: 0,
            }}
          >
            © 2022 All rights reserved by Daniel Armstrong.
          </Footer>
        </Layout>
      </Col>
    </Row>
  );
};

export default AppLayout;
