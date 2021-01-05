import { Comment, Tooltip, Avatar, Divider, Badge, Select, Button } from "antd";
import { CloudDownloadOutlined, DeleteTwoTone } from "@ant-design/icons";
import ApiWrapper from "../ApiWrapper";
import { ITask, IStatus, IPrioritet } from "../interfaces/db";
import { useState, useEffect } from "react";

import dayjs from "dayjs";
import CommentsSection from "./CommentsSection";

interface Props {
  list: ITask[];
}

const TaskList = (props: Props) => {
  const [attachments, setAttachments] = useState({});
  const [allPriorities, setAllPriorities] = useState<IPrioritet[]>([]);
  const [allStatuses, setAllStatuses] = useState<IStatus[]>([]);
  const [tasks, setTasks] = useState<ITask[]>(props.list);

  useEffect(() => {
    props.list.forEach(async (task) => {
      const { data } = await ApiWrapper.post("/tasks/getAttachments", {
        zadatak_id: task.zadatak_id,
      });
      if (!data) return;
      data.forEach((attachment) => {
        setAttachments({
          ...attachments,
          [attachment.zadatak_id]: attachment.naziv,
        });
      });
    });
    ApiWrapper.get("/statuses").then(({ data }) => {
      setAllStatuses(data);
    });
    ApiWrapper.get("/priorities").then(({ data }) => {
      setAllPriorities(data);
    });
  }, []);

  const deleteTaskHandler = async (zadatak_id: string) => {
    ApiWrapper.post("tasks/delete", {
      zadatak_id,
    }).then(console.log);
    setTasks(tasks.filter((task) => task.zadatak_id !== zadatak_id));
  };

  const statusColors = {
    "U tijeku": "warning",
    "Na čekanju": "processing",
    Završen: "success",
  };

  const determineStatusColor = (x) => {
    console.log("determineStatusColor", x);
    return statusColors[x];
  };

  const priorityColor = {
    visoki: "error",
    srednji: "warning",
    nizak: "success",
  };

  const determinePriorityColor = (x) => {
    console.log("determinePriorityColor", x);
    return priorityColor[x];
  };

  const changeTaskStatus = (status_id, zadatak_id) => {
    ApiWrapper.post("statuses/set", {
      zadatak_id,
      status_id,
    });
  };

  const changeTaskPriority = (prioritet_id, zadatak_id) => {
    ApiWrapper.post("priorities/set", {
      zadatak_id,
      prioritet_id,
    });
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const deCapitalize = (str) => str.charAt(0).toLowerCase() + str.slice(1);

  return (
    <div style={{ textAlign: "left" }}>
      {tasks.map((task, i) => {
        return (
          <div>
            <Comment
              key={i}
              author={<a>{task.kreator_id}</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={<p>{task.instrukcije}</p>}
              datetime={
                <Tooltip title="Created on">
                  <span>
                    {dayjs(task.kreirano).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                </Tooltip>
              }
              actions={[
                <Badge status={determineStatusColor(task.status_id)} />,
                <Select
                  style={{ width: "200px" }}
                  defaultValue={"Status: " + deCapitalize(task.status_id)}
                  onChange={(e) => changeTaskStatus(e, task.zadatak_id)}
                >
                  {allStatuses.map((status, i) => (
                    <Select.Option value={status.status_id} key={i}>
                      Status: {deCapitalize(status.naziv)}
                    </Select.Option>
                  ))}
                </Select>,
                <Badge
                  status={determinePriorityColor(task.prioritet_id)}
                  style={{ marginLeft: "20px" }}
                />,
                <Select
                  style={{ width: "200px" }}
                  defaultValue={capitalize(task.prioritet_id) + " prioritet"}
                  onChange={(e) => changeTaskPriority(e, task.zadatak_id)}
                >
                  {allPriorities.map((priority, i) => (
                    <Select.Option value={priority.prioritet_id} key={i}>
                      {capitalize(priority.naziv)} prioritet
                    </Select.Option>
                  ))}
                </Select>,
                <Button
                  danger
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    deleteTaskHandler(task.zadatak_id);
                  }}
                >
                  Delete
                </Button>,
              ]}
            />
            {Object.keys(attachments)
              .filter((taskId) => taskId === task.zadatak_id)
              .map((taskId, i) => (
                <>
                  <a key={i}>
                    <CloudDownloadOutlined style={{ padding: "15px" }} />
                    {attachments[taskId]}
                  </a>
                </>
              ))}
            <div
              style={{
                backgroundColor: "#e6f7ff",
                border: "1px solid #1C6EA4",
                borderRadius: " 0px 40px 0px 0px",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "10px",
              }}
            >
              <CommentsSection taskId={task.zadatak_id} />
            </div>
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
