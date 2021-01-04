import { Card, Modal, Form, Input } from "antd";
import {
  EditOutlined,
  RightCircleTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import ApiWrapper from "../ApiWrapper";
import { IOrganization } from "../interfaces/db";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

interface Props {
  list: IOrganization[];
}

const OrganizationsList = (props: Props) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState("");
  const [newName, setNewName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    ApiWrapper.post("organizations/update", {
      organizacija_id: currentOrganization,
      naziv: newName,
    })
      .then(console.log)
      .catch(console.log)
      .finally(() => {
        setConfirmLoading(false);
        setVisible(false);
      });
  };

  const deleteHandler = async (organizationId: string) => {
    ApiWrapper.post("organizations/delete", {
      organizacija_id: organizationId,
    }).then(console.log);
    window.location.reload();
  };

  return (
    <>
      {props.list.map((org, i) => {
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
                  setCurrentOrganization(org.organizacija_id);
                }}
              />,
              <DeleteOutlined
                style={{ color: "red" }}
                key="setting"
                onClick={() => deleteHandler(org.organizacija_id)}
              />,
              <RightCircleTwoTone
                key="ellipsis"
                onClick={() =>
                  history.push(`/dashboard/${org.organizacija_id}`)
                }
              />,
            ]}
            cover={<img alt="example" src={org.slika_url} />}
          >
            <Meta title={org.naziv} />
          </Card>
        );
      })}
      <Modal
        title="Edit organization name"
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
        </Form>
      </Modal>
    </>
  );
};

export default OrganizationsList;
