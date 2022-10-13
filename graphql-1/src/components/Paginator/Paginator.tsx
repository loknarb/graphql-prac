import React from "react";

import "./Paginator.css";
type Props = {
  onPrevious: () => void;
  onNext: () => void;
  lastPage: number;
  currentPage: number;
};
const Paginator: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Props
> = ({ children, currentPage, onPrevious, lastPage, onNext }) => (
  <div className="paginator">
    {children}
    <div className="paginator__controls">
      {currentPage > 1 && (
        <button className="paginator__control" onClick={onPrevious}>
          Previous
        </button>
      )}
      {currentPage < lastPage && (
        <button className="paginator__control" onClick={onNext}>
          Next
        </button>
      )}
    </div>
  </div>
);

export default Paginator;
