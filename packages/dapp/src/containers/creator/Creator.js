import { Alert, Button, Card, Col, Image, List, Row, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoDetailForm from "./VideoDetailForm";
import { getDatabase, ref, set, onValue } from "firebase/database";
import Web3Context from "../../web3/store/web3-context";

const Creator = () => {
  const web3Ctx = useContext(Web3Context);
  const isConnected = web3 && web3Ctx.account;

  const [videos, setVideos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const videosDbRef = ref(db, "/videos");
    onValue(
      videosDbRef,
      (snapshot) => {
        var myVideos = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childData.owner == web3Ctx.account) {
            myVideos = [
              ...myVideos,
              Object.assign(childData, { key: childKey }),
            ];
          }
        });
        setVideos(myVideos);
      },
      { onlyOnce: true }
    );
  }, []);

  const renderVideoThumbnailItem = (item, key) => {
    return (
      <Card hoverable style={{ marginBottom: 20 }} bodyStyle={{ padding: 0 }}>
        <Image
          src={item.thumbnailImageUrl}
          preview={false}
          onClick={() => {
            setSelectedIndex(videos.indexOf(item));
          }}
        />
      </Card>
    );
  };

  return (
    <Col style={{ margin: 20 }}>
      <Row>
        <Link to="/video-create">
          <Button type="primary">Create New Video</Button>
        </Link>
      </Row>
      <Row gutter={10} style={{ marginTop: 20 }}>
        <Col span={4}>
          <Card title="My Videos">
            <List
              locale={{ emptyText: "No Videos" }}
              dataSource={videos}
              renderItem={renderVideoThumbnailItem}
            />
          </Card>
        </Col>
        <Col flex={1}>
          {videos.length == 0 && (
            <Alert message="No video yet!" type="info" showIcon />
          )}
          {videos.length > 0 && selectedIndex == -1 && (
            <Alert message="Select an video thumbnail!" type="info" showIcon />
          )}
          {videos.length > 0 && selectedIndex >= 0 && (
            <Col>
              <Card title="Video Detail">
                {<VideoDetailForm video={videos[selectedIndex]} />}
              </Card>
            </Col>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default Creator;
