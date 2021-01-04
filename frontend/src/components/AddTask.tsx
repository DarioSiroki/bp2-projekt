import { Form, Input, Button, Layout, Typography, Select } from "antd";
import { Row, Col } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useState, useEffect } from "react";
import { IStatus, IPriority } from "../interfaces/db";

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
  const [statuses, setStatuses] = useState<IStatus[]>([]);
  const [priorities, setPriorities] = useState<IPriority[]>([]);

  useEffect(() => {
    ApiWrapper.get("statuses").then(({ data }) => {
      setStatuses(data);
    });
    ApiWrapper.get("priorities").then(({ data }) => {
      setPriorities(data);
    });
  }, []);

  const onSubmit = async (values: any) => {
    const { naziv, opis } = values;
    await ApiWrapper.post("/projects/create", {
      naziv,
      opis,
      organizacija_id: props.organizationId,
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
              <Paragraph>Instructions:</Paragraph>
              <TextArea rows={4} />

              <Paragraph>Priority:</Paragraph>
              <Select style={{ width: 120 }}>
                {priorities.map((priority, i) => {
                  return (
                    <Select.Option value={priority.prioritet_id} key={i}>
                      {priority.naziv}
                    </Select.Option>
                  );
                })}
              </Select>

              <Paragraph>Assigned:</Paragraph>

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
