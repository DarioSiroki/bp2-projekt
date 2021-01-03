import { Layout, Menu, Breadcrumb, Typography } from "antd";
import { HomeTwoTone } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Paragraph, Title } = Typography;

const dashboard = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <p>TaskManager</p>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              textAlign: "center",
            }}
          >
            <HomeTwoTone style={{ fontSize: "200px" }} />
            <Title> Set up an organization </Title>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default dashboard;
