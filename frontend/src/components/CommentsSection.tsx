import { Comment, Avatar, Form, Button, List, Input } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import ApiWrapper from "../ApiWrapper";
import { IComment } from "../interfaces/db";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => (
      // @ts-ignore
      <Comment {...props} />
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

interface Props {
  taskId: string;
}

const CommentsSection = (props: Props) => {
  const [comments, setComments] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    ApiWrapper.post("tasks/getComments", {
      zadatak_id: props.taskId,
    }).then(({ data }) => {
      if (data) {
        const comments: any[] = [];
        data.forEach((comment: IComment) => {
          comments.push({
            author: comment.korisnik_id,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: comment.tekst,
            datetime: dayjs().format(comment.kreiran),
          });
        });
        setComments(comments);
      }
    });
  }, []);

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(false);

    setTimeout(() => {
      setSubmitting(false);
      ApiWrapper.post("tasks/addComment", {
        tekst: value,
        zadatak_id: props.taskId,
      });
      setComments([
        {
          author: "Me",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: <p>{value}</p>,
          datetime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        ...comments,
      ]);
      setValue("");
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default CommentsSection;
