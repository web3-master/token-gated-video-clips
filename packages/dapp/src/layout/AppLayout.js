import { Layout, Row, Col, Typography } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../containers/home/Home";
import Creator from "../containers/creator/Creator";
import Videos from "../containers/videos/Videos";
import Video from "../containers/video/Video";

const AppLayout = () => {
  return (
    <Row>
      <Col span={24}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{ backgroundColor: "white", height: 100, paddingTop: 20 }}
          >
            <Link to="/">
              <Typography.Title>Token Gated Video Clips</Typography.Title>
            </Link>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/creator" element={<Creator />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/video" element={<Video />} />
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
