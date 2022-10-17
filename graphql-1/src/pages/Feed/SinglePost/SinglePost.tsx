import React, { Component, useEffect, useState } from "react";

import Image from "../../../components/Image/Image";
import "./SinglePost.css";
interface Props {
  match: {
    params: {
      postId: string;
    };
  };
  token: string;
}
const SinglePost: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const postId = props.match.params.postId;
  useEffect(() => {
    fetch("http://localhost:8080/feed/post/" + postId, {
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch status");
        }
        return res.json();
      })
      .then((resData) => {
        setTitle(resData.post.title);
        setAuthor(resData.post.creator.name);
        setDate(new Date(resData.post.createdAt).toLocaleDateString("en-US"));
        setImage(resData.post.imageUrl);
        setContent(resData.post.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="single-post">
      <h1>{title}</h1>
      <h2>
        Created by {author} on {date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={image} />
      </div>
      <p>{content}</p>
    </section>
  );
};

export default SinglePost;
