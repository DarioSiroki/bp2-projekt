import { Layout, Breadcrumb, Menu } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useState, useEffect } from "react";
import OrganizationsList from "../components/OrganizationsList";
import AddOrganization from "../components/AddOrganization";
import { IOrganization } from "../interfaces/db";
import TaskManagerHeader from "../components/TaskManagerHeader";
import { UnorderedListOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;

const Dashboard = () => {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    ApiWrapper.get("/organizations/list").then(({ data }) => {
      setOrganizations(data as IOrganization[]);
      if (data.length > 0) {
        setSelectedKeys(["list"]);
      } else {
        setSelectedKeys(["add"]);
      }
    });
  }, []);

  return (
    <Layout>
      <TaskManagerHeader />
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
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
            <Menu mode="horizontal" selectedKeys={selectedKeys}>
              <Menu.Item key="list" onClick={() => setSelectedKeys(["list"])}>
                <UnorderedListOutlined />
                My organizations
              </Menu.Item>
              <Menu.Item key="add" onClick={() => setSelectedKeys(["add"])}>
                <PlusCircleOutlined />
                Add organization
              </Menu.Item>
            </Menu>
            {selectedKeys.includes("list") ? (
              <OrganizationsList list={organizations} />
            ) : (
              <AddOrganization />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
