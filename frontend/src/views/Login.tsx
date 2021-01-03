import { Form, Input, Button, Checkbox, Typography, Layout } from "antd";
import { Row, Col } from "antd";
import ApiWrapper from "../ApiWrapper";

const layout = {
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const onFinish = async(values: any) => {
    console.log("Success:", values);
    const result = await ApiWrapper.post("/users/login", {
      email: values.email,
      password: values.password
    })
    console.log(result)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row >
      <Col span={4}></Col>
      <Col span={16}>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <Title> LOGIN </Title>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
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
