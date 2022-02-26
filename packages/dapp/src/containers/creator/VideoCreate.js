import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  notification,
  Result,
  Row,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { InboxOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import Web3Context from "../../web3/store/web3-context";
import CollectionContext from "../../web3/store/collection-context";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, push } from "firebase/database";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const VideoCreate = () => {
  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);
  let navigate = useNavigate();

  const [form] = useForm();
  const [uploading, setUploading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const createVideoInFirebase = (
    title,
    description,
    thumbnailImageUrl,
    videoUrl,
    receipt
  ) => {
    const db = getDatabase();
    const videosListRef = ref(db, "videos");
    const newVideoRef = push(videosListRef);
    set(newVideoRef, {
      title: title,
      description: description,
      thumbnailImageUrl: thumbnailImageUrl,
      videoUrl: videoUrl,
      owner: web3Ctx.account,
      receipt: receipt,
    });
  };

  const onCreate = async (values) => {
    if (web3Ctx.account == null) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } catch (error) {
        notification["error"]({
          message: "Error",
          description: error,
        });
      }
      return;
    }

    if (web3Ctx.networkId != 3) {
      notification["error"]({
        message: "Error",
        description:
          "This network is not supported. Please connect to Ropsten network in MetaMask!",
      });
      return;
    }

    let { title, description, thumbnailImageUrl, videoUrl } = values;

    const metadata = {
      title: "Asset Metadata",
      type: "object",
      properties: {
        title: {
          type: "string",
          description: title,
        },
        description: {
          type: "string",
          description: description,
        },
        thumbnailImageUrl: {
          type: "string",
          description: thumbnailImageUrl,
        },
      },
    };

    setUploading(true);
    const metadataAdded = await ipfs.add(JSON.stringify(metadata));
    setUploading(false);

    if (!metadataAdded) {
      notification["error"]({
        message: "Error",
        description: "Something went wrong when creating metadata",
      });
      return;
    }

    setMinting(true);
    collectionCtx.contract.methods
      .safeMint(metadataAdded.path)
      .send({ from: web3Ctx.account })
      .on("transactionHash", (hash) => {
        collectionCtx.setNftIsLoading(true);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        if (confirmationNumber == 0) {
          createVideoInFirebase(
            title,
            description,
            thumbnailImageUrl,
            videoUrl,
            receipt
          );

          setMinting(false);
          setMintSuccess(true);
        }
      })
      .on("error", (e) => {
        setMinting(false);
        notification["error"]({
          message: "Error",
          description: "Something went wrong when pushing to the blockchain",
        });
        collectionCtx.setNftIsLoading(false);
      });
  };

  const onMintAgain = () => {
    setMintSuccess(false);
    form.resetFields();
  };

  if (mintSuccess) {
    return (
      <Result
        style={{ marginTop: 20 }}
        status="success"
        title="Successfully created new video and access token!"
        subTitle="You can check this new video and token in videos page."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => navigate("/videos")}
          >
            Go Videos
          </Button>,
          <Button key="buy" onClick={onMintAgain}>
            Create Again
          </Button>,
        ]}
      />
    );
  }

  return (
    <Row style={{ margin: 20 }}>
      {minting && (
        <Col>
          <Alert message="Minting..." type="info" showIcon />
        </Col>
      )}
      {uploading && (
        <Col>
          <Alert message="Uploading metadata..." type="info" showIcon />
        </Col>
      )}
      <Col span={24} style={{ marginTop: 10 }}>
        <Card title="Create New Video">
          <Form
            form={form}
            layout="vertical"
            labelCol={8}
            wrapperCol={16}
            onFinish={onCreate}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input video title!" }]}
            >
              <Input placeholder="Input video title here." />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input video description!" },
              ]}
            >
              <Input.TextArea placeholder="Input video description here." />
            </Form.Item>

            <Form.Item
              label="Thumbnail Image Url"
              name="thumbnailImageUrl"
              rules={[
                {
                  required: true,
                  message: "Please input thumbnail image url!",
                },
              ]}
            >
              <Input placeholder="Input thumbnail image url." />
            </Form.Item>

            <Form.Item
              label="Video Url"
              name="videoUrl"
              rules={[{ required: true, message: "Please input video url!" }]}
            >
              <Input placeholder="Input video url." />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default VideoCreate;
