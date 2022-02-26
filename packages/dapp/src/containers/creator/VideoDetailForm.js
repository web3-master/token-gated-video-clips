import { Button, Form, Input, notification, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { InboxOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import Web3Context from "../../web3/store/web3-context";

const VideoDetailForm = ({ video }) => {
  const web3Ctx = useContext(Web3Context);
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(video);
  }, [video]);

  const saveVideoInFirebase = (
    title,
    description,
    thumbnailImageUrl,
    videoUrl
  ) => {
    const db = getDatabase();
    const videoRef = ref(db, "videos/" + video.key);
    set(videoRef, {
      title: title,
      description: description,
      thumbnailImageUrl: thumbnailImageUrl,
      videoUrl: videoUrl,
      owner: video.owner,
      receipt: video.receipt,
    });
  };

  const onSave = async (values) => {
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

    saveVideoInFirebase(title, description, thumbnailImageUrl, videoUrl);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      labelCol={8}
      wrapperCol={16}
      onFinish={onSave}
      initialValues={video}
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
        rules={[{ required: true, message: "Please input video description!" }]}
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
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VideoDetailForm;
