import { Button, Form, Input, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

const VideoDetailForm = () => {
  const [form] = useForm();
  const [thumbnailImageFileBuffer, setThumbnailImageFileBuffer] =
    useState(null);
  const [videoFileBuffer, setVideoFileBuffer] = useState(null);

  const onSave = (values) => {};

  const onThumbnailImageFileSelected = (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setThumbnailImageFileBuffer(Buffer(reader.result));
    };
    return false;
  };

  const onVideoFileSelected = (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setVideoFileBuffer(Buffer(reader.result));
    };
    return false;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      labelCol={8}
      wrapperCol={16}
      onFinish={onSave}
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
        label="Thumbnail Image"
        name="thumbnailImage"
        rules={[
          { required: true, message: "Please select video thumbnail image!" },
        ]}
      >
        <Upload.Dragger
          name="thumbnailImage"
          beforeUpload={onThumbnailImageFileSelected}
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag image file to this area to upload
          </p>
        </Upload.Dragger>
      </Form.Item>

      <Form.Item
        label="Video"
        name="video"
        rules={[{ required: true, message: "Please select video file!" }]}
      >
        <Upload.Dragger
          name="video"
          beforeUpload={onVideoFileSelected}
          maxCount={1}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag video file to this area to upload
          </p>
        </Upload.Dragger>
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
