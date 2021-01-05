import { Form, Input, Button, Checkbox, Typography, Layout } from "antd";
import { Row, Col } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const [key, setKey] = useState(window.localStorage.getItem("key"));
  const history = useHistory();

  useEffect(() => {
    if (key != null) {
      history.push("/dashboard");
    }
  });

  const onSubmit = async (values: any) => {
    const result = await ApiWrapper.post("/users/login", {
      email: values.email,
      lozinka: values.password,
    });
    window.localStorage.setItem("key", result.data.token);
    setKey(result.data.token);
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Layout>
          <Content style={{ margin: "24px 16px 0", textAlign: "center" }}>
            <Title> LOGIN </Title>
            <Form
              {...layout}
              name="basic"
              onFinish={onSubmit}
            >
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
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item style={{placeContent: "center"}}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <p>
              Not a member? <a href="/register">Register</a>{" "}
            </p>
          </Content>
        </Layout>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default Login;
