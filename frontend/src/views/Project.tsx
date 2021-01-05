import { Layout, Breadcrumb, Menu } from "antd";
import ApiWrapper from "../ApiWrapper";
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { ITask } from "../interfaces/db";
import TaskManagerHeader from "../components/TaskManagerHeader";
import { UnorderedListOutlined, PlusCircleOutlined } from "@ant-design/icons";
const { Content } = Layout;

const Tasks = () => {
  const organizationId = window.location.pathname.split("/")[2] as string;
  const projectId = window.location.pathname.split("/")[3] as string;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    ApiWrapper.post("tasks/list", {
      projekt_id: projectId,
      organizacija_id: organizationId,
    }).then(({ data }) => {
      if (data !== null) {
        setTasks(data as ITask[]);
        if (data !== null && data.length > 0) {
          setSelectedKeys(["list"]);
        } else {
          setSelectedKeys(["add"]);
        }
      } else {
        setTasks([]);
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
            <Breadcrumb.Item>
              <a href="/dashboard">Dashboard</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href={`/dashboard/${organizationId}`}>Organization</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tasks</Breadcrumb.Item>
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
                My Tasks
              </Menu.Item>
              <Menu.Item key="add" onClick={() => setSelectedKeys(["add"])}>
                <PlusCircleOutlined />
                Add Task
              </Menu.Item>
            </Menu>
            {selectedKeys.includes("list") ? (
              <TaskList list={tasks} />
            ) : (
              <AddTask organizationId={organizationId} projectId={projectId} />
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Tasks;
