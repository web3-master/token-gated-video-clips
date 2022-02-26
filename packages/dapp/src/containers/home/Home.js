import { Col, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from "../../images/video-clip.png";

const Home = () => {
  return (
    <Row align="center" justify="center" style={{ marginTop: 100 }}>
      <Col>
        <img src={logo} width={400} />
      </Col>
      <Col span={8} style={{ marginTop: 100 }}>
        <Space direction="vertical" size={100}>
          <Link to="/creator">
            <Typography.Title>I am a creator!</Typography.Title>
          </Link>

          <Link to="/videos">
            <Typography.Title>Show all videos</Typography.Title>
          </Link>
        </Space>
      </Col>
    </Row>
  );
};

export default Home;
