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
  const onSubmit = async (values: any) => {
    const { ime, prezime, nadimak, email, lozinka } = values;
    console.log("Success:", values);
    await ApiWrapper.post("users/register", {
      ime,
      prezime,
      nadimak,
      email,
      lozinka,
    });
    const result = await ApiWrapper.post("/users/login", {
      email,
      password: lozinka,
    });
    console.log(result.data);
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <Title> REGISTER </Title>
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

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <p>
              Already have an account? <a href="/">Login</a>{" "}
            </p>
          </Content>
        </Layout>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default Login;
