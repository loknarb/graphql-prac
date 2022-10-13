import React from "react";

import Button from "../../Button/Button";
import "./Post.css";
type Props = {
  author: string;
  date: string;
  title: string;
  id: string;
  onStartEdit: () => void;
  onDelete: () => void;
  image: string;
  content: string;
};
const Post: React.FC<Props> = ({ author, date, title, id, onStartEdit, onDelete }) => (
  <article className="post">
    <header className="post__header">
      <h3 className="post__meta">
        Posted by {author} on {date}
      </h3>
      <h1 className="post__title">{title}</h1>
    </header>
    {/* <div className="post__image">
      <Image imageUrl={image} contain />
    </div>
    <div className="post__content">{content}</div> */}
    <div className="post__actions">
      <Button mode="flat" link={id}>
        View
      </Button>
      <Button mode="flat" onClick={onStartEdit}>
        Edit
      </Button>
      <Button mode="flat" design="danger" onClick={onDelete}>
        Delete
      </Button>
    </div>
  </article>
);

export default Post;
