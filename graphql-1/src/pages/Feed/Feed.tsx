import React, { useState, Fragment, useEffect } from "react";

import Post from "../../components/Feed/Post/Post";
import Button from "../../components/Button/Button";
import FeedEdit from "../../components/Feed/FeedEdit/FeedEdit";
import Input from "../../components/Form/Input/Input";
import Paginator from "../../components/Paginator/Paginator";
import Loader from "../../components/Loader/Loader";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import "./Feed.css";
import { render } from "react-dom";
export interface Post {
  title: string;
  content: string;
  imageUrl: string;
  _id: string;
  creator: {
    name: string;
  };
  createdAt: string;
  image: string | Blob;
}
type Props = {
  token: string | null;
  userId: string | null;
};
const Feed: React.FC<Props> = ({ token }) => {
  // state = {
  //   isEditing: false,
  //   posts: [],
  //   totalPosts: 0,
  //   editPost: null,
  //   status: "",
  //   postPage: 1,
  //   postsLoading: true,
  //   editLoading: false,
  // };
  // const [feed, setFeed] = useState({
  //   isEditing: false,
  //   totalPosts: 0,
  //   editPost: null,
  //   status: "",
  //   postPage: 1,
  //   postsLoading: true,
  //   editLoading: false,
  //   error: null,
  // })
  const [posts, setPost] = useState<Post[] | []>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editPost, setEditPost] = useState<Post | undefined>(undefined);
  const [status, setStatus] = useState("");
  const [postPage, setPostPage] = useState(1);
  const [postsLoading, setPostsLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  useEffect(() => {
    fetch("http://localhost:8080/auth/status", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch user status.");
        }
        return res.json();
      })
      .then((resData) => {
        setStatus(resData.status);
      })
      .catch(catchError);

    loadPosts();
  }, []);

  const loadPosts = (direction?: "next" | "previous") => {
    if (direction) {
      setPostsLoading(true);
      setPost([]);
    }
    let page = postPage;
    if (direction === "next") {
      page++;
      setPostPage(page);
    }
    if (direction === "previous") {
      page--;
      setPostPage(page);
    }
    fetch("http://localhost:8080/feed/posts?page=" + page, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch posts.");
        }
        return res.json();
      })
      .then((resData) => {
        setTotalPosts(resData.totalItems);
        setPostsLoading(false);
        setPost(resData.posts);
        // posts: resData.posts.map((post: Post) => {
        //   return {
        //     ...post,
        //     imagePath: post.imageUrl,
        //   };
        // }),
      })
      .catch(catchError);
  };

  const statusUpdateHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("http://localhost:8080/auth/status", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Can't update status!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch(catchError);
  };

  const newPostHandler = () => {
    setIsEditing(true);
  };

  const startEditPostHandler = (postId: string) => {
    setIsEditing(true);
    setEditPost(posts.find((p) => p._id === postId));
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    setEditPost(undefined);
  };

  const finishEditHandler = (postData: Post) => {
    setEditLoading(true);
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("image", postData.image);
    let url = "http://localhost:8080/feed/post";
    let method = "POST";
    if (editPost) {
      url = "http://localhost:8080/feed/post/" + editPost._id;
      method = "PUT";
    }

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt,
        };
        setIsEditing(false);
        setEditPost(undefined);
        setEditLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEditing(false);
        setEditPost(undefined);
        setEditLoading(false);
        setError(err);
      });
  };

  const statusInputChangeHandler = (input: any, value: string) => {
    setStatus(value);
  };

  const deletePostHandler = (postId: string) => {
    setPostsLoading(true);
    fetch("http://localhost:8080/feed/post/" + postId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        loadPosts();
        // setFeed(prev...feed,State => {
        //   const updatedPosts = prevState.posts.filter(p => p._id !== postId);
        //   return { posts: updatedPosts, postsLoading: false };
        // });
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setPostsLoading(false);
      });
  };

  const errorHandler = () => {
    setError(null);
  };

  const catchError = (error: unknown) => {
    setError(error);
  };

  return (
    <Fragment>
      <ErrorHandler error={error} onHandle={errorHandler} />
      <FeedEdit
        editing={isEditing}
        selectedPost={editPost}
        loading={editLoading}
        onCancelEdit={cancelEditHandler}
        onFinishEdit={finishEditHandler}
      />
      <section className="feed__status">
        <form onSubmit={statusUpdateHandler}>
          <Input
            type="text"
            placeholder="Your status"
            control="input"
            onChange={statusInputChangeHandler}
            value={status}
          />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </form>
      </section>
      <section className="feed__control">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section className="feed">
        {postsLoading && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Loader />
          </div>
        )}
        {posts.length <= 0 && !postsLoading ? (
          <p style={{ textAlign: "center" }}>No posts found.</p>
        ) : null}
        {!postsLoading && (
          <Paginator
            onPrevious={loadPosts.bind(this, "previous")}
            onNext={loadPosts.bind(this, "next")}
            lastPage={Math.ceil(totalPosts / 2)}
            currentPage={postPage}>
            {posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString("en-US")}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={startEditPostHandler(post._id)}
                onDelete={deletePostHandler(post._id)}
              />
            ))}
          </Paginator>
        )}
      </section>
    </Fragment>
  );
};

export default Feed;
