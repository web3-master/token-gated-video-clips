import { Alert, Button, Card, Col, Image, List, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoDetailForm from "./VideoDetailForm";

const Creator = () => {
  const [videos, setVideos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setVideos([
      {
        id: 1,
        title: "video1",
        description: "this is video1",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png",
      },
      {
        id: 2,
        title: "video2",
        description: "this is video2",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png",
      },
      {
        id: 3,
        title: "video3",
        description: "this is video3",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png",
      },
      {
        id: 4,
        title: "video4",
        description: "this is video4",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnailUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/800px-Big_Buck_Bunny_thumbnail_vlc.png",
      },
    ]);
  }, []);

  const renderVideoThumbnailItem = (item, key) => {
    return (
      <Card hoverable style={{ marginBottom: 20 }} bodyStyle={{ padding: 0 }}>
        <Image src={item.thumbnailUrl} preview={false} />
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
          <Card title="Thumbnails">
            <List
              locale={{ emptyText: "Empty" }}
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
              <Card title="Video Detail">{<VideoDetailForm />}</Card>
            </Col>
          )}
        </Col>
        {/* <Col span={10}>
          <Card title="Access Token">
            <Row>
              <Col span={4}>Title:</Col>
              <Col span={20}>Video 1</Col>
            </Row>
            <Row>
              <Col span={4}>Description:</Col>
              <Col span={20}>This is video1</Col>
            </Row>
            <Row>
              <Col span={4}>Thumbnail:</Col>
              <Col span={20}></Col>
            </Row>
          </Card>
        </Col> */}
      </Row>
    </Col>
  );
};

export default Creator;
