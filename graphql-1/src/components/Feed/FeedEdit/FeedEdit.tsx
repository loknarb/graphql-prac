import React, { Component, Fragment, useEffect, useState } from "react";

import Backdrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/Modal";
import Input from "../../Form/Input/Input";
import FilePicker from "../../Form/Input/FilePicker";
import Image from "../../Image/Image";
import { required, length } from "../../../util/validators";
import { generateBase64FromImage } from "../../../util/image";
import { Post } from "../../../pages/Feed/Feed";

const POST_FORM = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  content: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
};
type EditPost = Pick<Post, "title" | "content" | "image">;
type Props = {
  editing: boolean;
  selectedPost: Post;
  onCancelEdit: () => void;
  onConfirm: (post: Post) => void;
  loading: boolean;
  onFinishEdit: (post: EditPost) => void;
};
const FeedEdit: React.FC<Props> = ({
  editing,
  selectedPost,
  onCancelEdit,
  loading,
  onFinishEdit,
}) => {
  const [postForm, setPostForm] = useState(POST_FORM);
  const [imagePreview, setImagePreview] = useState<null | string | unknown>(null);
  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    if (editing && editing !== editing && selectedPost !== selectedPost) {
      setPostForm({
        title: {
          ...postForm.title,
          value: selectedPost.title,
          valid: true,
        },
        image: {
          ...postForm.image,
          value: selectedPost.imageUrl,
          valid: true,
        },
        content: {
          ...postForm.content,
          value: selectedPost.content,
          valid: true,
        },
      });
      setFormIsValid(true);
    }
    // return () => {
    //    second
    // }
  }, [editing, selectedPost]);

  const postInputChangeHandler = (value: string, files: FileList | null | undefined) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then((b64) => {
          setImagePreview(b64);
        })
        .catch(() => {
          setImagePreview(null);
        });
    }
    setPostForm((prevState) => {
      let isValid = true;
      for (const validator of postForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...postForm,
        [input]: {
          ...postForm[input],
          valid: isValid,
          value: files ? files[0] : value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[input].valid;
      }
      return {
        postForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  const inputBlurHandler = (input: "title" | "image" | "content") => {
    setPostForm({
      ...postForm,
      [input]: {
        ...postForm[input],
        touched: true,
      },
    });
  };

  const cancelPostChangeHandler = () => {
    setPostForm(POST_FORM);
    setFormIsValid(false);
    onCancelEdit();
  };

  const acceptPostChangeHandler = () => {
    const post: EditPost = {
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value,
    };
    onFinishEdit(post);
    setPostForm(POST_FORM);
    setFormIsValid(false);
    setImagePreview(null);
  };

  return editing ? (
    <Fragment>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}>
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler("title")}
            valid={postForm["title"].valid}
            touched={postForm["title"].touched}
            value={postForm["title"].value}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler("image")}
            valid={postForm["image"].valid}
            touched={postForm["image"].touched}
          />
          <div className="new-post__preview-image">
            <>
              {!imagePreview && <p>Please choose an image.</p>}
              {imagePreview && <Image imageUrl={imagePreview} contain left />}
            </>
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler("content")}
            valid={postForm["content"].valid}
            touched={postForm["content"].touched}
            value={postForm["content"].value}
          />
        </form>
      </Modal>
    </Fragment>
  ) : null;
};

export default FeedEdit;
