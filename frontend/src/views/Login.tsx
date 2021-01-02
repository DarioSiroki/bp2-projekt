import { Form, Input, Button, Checkbox, Typography, Layout } from 'antd';
import { Row, Col } from 'antd';

const layout = {
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Content style={{ margin: '24px 16px 0'}}>
        <Title> LOGIN </Title>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p>Not a member? <a href="/sign-up">Sign up</a> </p>
      </Content>
    </Layout>
  );
};

export default Login;
