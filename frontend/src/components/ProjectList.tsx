import { Card, Modal, Form, Input } from "antd";
import {
  EditOutlined,
  RightCircleTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import ApiWrapper from "../ApiWrapper";
import { IProject } from "../interfaces/db";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

interface Props {
  list: IProject[];
}

const ProjectList = (props: Props) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    ApiWrapper.post("projects/update", {
      projekt_id: currentProject,
      naziv: newName,
      opis: newDescription,
    })
      .then(console.log)
      .catch(console.log)
      .finally(() => {
        setConfirmLoading(false);
        setVisible(false);
        setNewDescription("");
        setNewName("");
      });
  };

  const deleteHandler = async (projekt_id: string) => {
    ApiWrapper.post("projects/delete", {
      projekt_id,
    }).then(console.log);
    window.location.reload();
  };

  return (
    <>
      {props.list.map((project, i) => {
        return (
          <Card
            key={i}
            style={{
              width: 300,
              marginTop: 16,
              display: "inline-block",
              margin: "50px",
            }}
            actions={[
              <EditOutlined
                style={{ color: "green" }}
                key="edit"
                onClick={() => {
                  showModal();
                  setCurrentProject(project.projekt_id);
                }}
              />,
              <DeleteOutlined
                style={{ color: "red" }}
                key="setting"
                onClick={() => deleteHandler(project.projekt_id)}
              />,
              <RightCircleTwoTone
                key="ellipsis"
                onClick={() =>
                  history.push(`/dashboard/${project.organizacija_id}`)
                }
              />,
            ]}
          >
            <Meta title={project.naziv} description={project.opis} />
          </Card>
        );
      })}
      <Modal
        title="Edit Project Details"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form name="basic" initialValues={{ remember: true }}>
          <Form.Item
            label="New name"
            name="naziv"
            rules={[{ required: true, message: "Please input the new name!" }]}
          >
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="New description"
            name="opis"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectList;
