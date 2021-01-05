import { Form, Input, Button, Checkbox, Typography, Layout } from "antd";
import { Row, Col } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};


const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const history = useHistory();
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
      lozinka,
    });
    window.localStorage.setItem("key", result.data.token);
    history.push("/dashboard");
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Layout>
          <Content style={{ margin: "24px 16px 0", textAlign: "center" }}>
            <Title style={{}}> REGISTER </Title>
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

              <Form.Item style={{placeContent: "center"}}>
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
