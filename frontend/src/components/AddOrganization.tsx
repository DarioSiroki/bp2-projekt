import { Form, Input, Button, Layout } from "antd";
import { Row, Col } from "antd";
import ApiWrapper from "../ApiWrapper";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const { Content } = Layout;

const AddOrganization = () => {
  const onSubmit = async (values: any) => {
    const { naziv, slika_url } = values;
    await ApiWrapper.post("/organizations/create", {
      naziv,
      slika_url,
    });
    window.location.reload();
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
              <Form.Item
                label="Name"
                name="naziv"
                rules={[
                  {
                    required: true,
                    message: "Please input your organization name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Image URL"
                name="slika_url"
                rules={[
                  {
                    required: true,
                    message: "Please input organization avatar URL!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

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

export default AddOrganization;
