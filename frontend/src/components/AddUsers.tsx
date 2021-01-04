import { Form, Input, Button, Layout, Typography, Select } from "antd";
import { Row, Col } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useEffect, useState } from "react";
import { IPermission } from "../interfaces/db";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const { Paragraph } = Typography;
const { Content } = Layout;

const AddUser = () => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<string[]>([]);
  const organizationId = window.location.pathname.split("/").pop() as string;

  useEffect(() => {
    ApiWrapper.get("permissions").then(({ data }) => {
      setPermissions(data);
    });
  }, []);

  const onSubmit = async (values: any) => {
    const { ime, prezime, nadimak, email, lozinka } = values;
    const { data } = await ApiWrapper.post("users/registerFromMember", {
      ime,
      prezime,
      nadimak,
      email,
      lozinka,
      organizacija_id: organizationId,
    });
    await ApiWrapper.post("permissions/set", {
      korisnik_id: data,
      // @ts-ignore
      dopustenja: permissions.map(permission.privilegija_id),
    });
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <Form {...layout} name="basic" onFinish={onSubmit}>
              <Form.Item
                label="Name"
                name="ime"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Surname"
                name="prezime"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nickname"
                name="nadimak"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="lozinka"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Password"
                name="lozinka"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Paragraph>Permissions:</Paragraph>
              <Select
                style={{ width: "60%" }}
                mode="multiple"
                placeholder="..."
                value={selectedPermission}
                onChange={setSelectedPermission}
              >
                {permissions.map((permission, i) => {
                  return (
                    <Select.Option value={permission.privilegija_id} key={i}>
                      {permission.naziv}
                    </Select.Option>
                  );
                })}
              </Select>
              <br />
              <br />
              <br />
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

export default AddUser;
