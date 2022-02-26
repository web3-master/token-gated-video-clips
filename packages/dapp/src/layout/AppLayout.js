import { Layout, Row, Col, Typography } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../containers/home/Home";
import Creator from "../containers/creator/Creator";
import Videos from "../containers/videos/Videos";
import Video from "../containers/video/Video";
import VideoCreate from "../containers/creator/VideoCreate";
import Account from "../components/Account";
import WrongNetwork from "../components/WrongNetwork";
import { useContext } from "react";
import Web3Context from "../web3/store/web3-context";
import Detail from "../containers/videos/Detail";

const AppLayout = () => {
  const web3Ctx = useContext(Web3Context);

  return (
    <Row>
      <Col span={24}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{ backgroundColor: "white", height: 100, paddingTop: 20 }}
          >
            <Row justify="space-between">
              <Col flex={1}>
                <Link to="/">
                  <Typography.Title>Token Gated Video Clips</Typography.Title>
                </Link>
              </Col>
              <Col>
                <Account />
              </Col>
            </Row>
          </Header>
          <Content>
            {web3Ctx.networkId == 3 ? (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/creator" element={<Creator />} />
                <Route path="/video-create" element={<VideoCreate />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/video" element={<Video />} />
              </Routes>
            ) : (
              <WrongNetwork />
            )}
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
