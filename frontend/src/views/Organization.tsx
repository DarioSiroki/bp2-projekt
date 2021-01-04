import { Layout, Breadcrumb, Menu } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useState, useEffect } from "react";
import ProjectList from "../components/ProjectList";
import AddProject from "../components/AddProject";
import { IProject } from "../interfaces/db";
import TaskManagerHeader from "../components/TaskManagerHeader";
import { UnorderedListOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;

const Organization = () => {
  const organizationId = window.location.pathname.split("/").pop() as string;
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    ApiWrapper.post("/projects/list", {
      organizacija_id: organizationId,
    }).then(({ data }) => {
      if (data !== null) {
        setProjects(data as IProject[]);
        if (data !== null && data.length > 0) {
          setSelectedKeys(["list"]);
        } else {
          setSelectedKeys(["add"]);
        }
      } else {
        setProjects([]);
        setSelectedKeys(["add"]);
      }
    });
  }, [organizationId]);

  return (
    <Layout>
      <TaskManagerHeader />
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <a href="/dashboard">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Organization</Breadcrumb.Item>
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
                My Projects
              </Menu.Item>
              <Menu.Item key="add" onClick={() => setSelectedKeys(["add"])}>
                <PlusCircleOutlined />
                Add Project
              </Menu.Item>
            </Menu>
            {selectedKeys.includes("list") ? (
              <ProjectList list={projects} />
            ) : (
              <AddProject organizationId={organizationId} />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Organization;
