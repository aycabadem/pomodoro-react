import React from "react";
interface PauseButtonProps {
  onClick: () => void;
}
const PauseButton: React.FC<PauseButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} data-testid="pause-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
};

export default PauseButton;
