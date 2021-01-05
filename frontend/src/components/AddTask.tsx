import {
  Form,
  Input,
  Button,
  Layout,
  Typography,
  Select,
  Upload,
  message,
} from "antd";
import { Row, Col } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useState, useEffect } from "react";
import { IPriority, IUser } from "../interfaces/db";
import { InboxOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const { Content } = Layout;
const { TextArea } = Input;
const { Paragraph } = Typography;

interface Props {
  organizationId: string;
  projectId: string;
}

const AddTask = (props: Props) => {
  const organizationId = window.location.pathname.split("/")[2] as string;
  const projectId = window.location.pathname.split("/")[3] as string;
  const [users, setUsers] = useState<IUser[]>([]);
  const [instructions, setInstructions] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<IPriority[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    ApiWrapper.get("priorities").then(({ data }) => {
      setPriorities(data);
    });
    ApiWrapper.post("users/list", {
      organizacija_id: organizationId,
    }).then(({ data }) => {
      console.log(data);
      setUsers(data);
    });
  }, [organizationId]);

  const propsUpload = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList: any = fileList.slice();
      newFileList.splice(index, 1);
      return setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);
      return false;
    },
    multiple: true,
    fileList: fileList,
  };

  const onSubmit = async () => {
    console.log(fileList);
    const { data: taskId } = await ApiWrapper.post("/tasks/create", {
      instrukcije: instructions,
      prioritet_id: selectedPriority,
      organizacija_id: organizationId,
      projekt_id: projectId,
    });
    await ApiWrapper.post("/tasks/assign", {
      taskId,
      selectedUsers,
    });
    fileList.forEach((file) => {
      ApiWrapper.post("/tasks/addAttachment", {
        naziv: file.name,
        putanja: file.name,
        zadatak_id: taskId.toString(),
      });
    });
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
            >
              <Paragraph>Instructions:</Paragraph>
              <TextArea
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
              <br />
              <br />

              <Paragraph>Priority:</Paragraph>
              <Select
                style={{ width: 120 }}
                value={selectedPriority}
                onChange={setSelectedPriority}
              >
                {priorities.map((priority, i) => {
                  return (
                    <Select.Option value={priority.prioritet_id} key={i}>
                      {priority.naziv}
                    </Select.Option>
                  );
                })}
              </Select>
              <br />
              <br />
              <Paragraph>Assigned:</Paragraph>
              <Select
                style={{ width: "60%" }}
                mode="multiple"
                placeholder="..."
                value={selectedUsers}
                onChange={setSelectedUsers}
              >
                {users.map((user, i) => {
                  return (
                    <Select.Option value={user.korisnik_id} key={i}>
                      {user.nadimak}
                    </Select.Option>
                  );
                })}
              </Select>
              <br />
              <br />
              <br />

              <Upload.Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload attachments
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload
                </p>
              </Upload.Dragger>
              <br />
              <br />

              <hr />
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default AddTask;
