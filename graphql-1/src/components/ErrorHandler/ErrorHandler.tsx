import React from "react";

import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";

type Props = {
  error: unknown;
  onHandle: () => void;
};
const ErrorHandler: React.FC<Props> = ({ onHandle, error }) => (
  <>
    {error && <Backdrop onClick={onHandle} open />}
    {error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={onHandle}
        onAcceptModal={onHandle}
        acceptEnabled
        isLoading={false}>
        <p>{error.message}</p>
      </Modal>
    )}
  </>
);

export default ErrorHandler;
