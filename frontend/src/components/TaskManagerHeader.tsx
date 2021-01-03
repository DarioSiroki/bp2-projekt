import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";

const { Header } = Layout;

const TaskManagerHeader = () => {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("key");
    history.push("/");
  };

  return (
    <Header className="header">
      <div className="logo">
        <p>TaskManager</p>
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item style={{ float: "right" }} key="1" onClick={logoutHandler}>
          <LogoutOutlined />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default TaskManagerHeader;
