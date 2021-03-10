import styled from "@emotion/styled";
import React from "react";

const Dismiss = styled.span`
  cursor: pointer;

  &::after {
    content: "\\00a0\\00a0";
  }
`;

const ChipComponent = ({
  active,
  dismissible,
  onClick,
  onDismiss,
  className,
  ...rest
}) => {
  let dismissChip = (e) => {
    e.stopPropagation();
    onDismiss(e);
    return false;
  };

  return (
    <div className={className} onClick={(e) => onClick(e)}>
      {dismissible && <Dismiss onClick={dismissChip}>{"\u00d7"}</Dismiss>}
      {rest.children}
    </div>
  );
};

export const Chip = styled(ChipComponent)`
  padding: 5px 10px 10px 10px;
  border-radius: 20px;
  height: 10px;
  font-size: 12px;
  background-color: ${(props) => (props.active ? "#3f6ff0" : "#e6edfe")};
  color: ${(props) => (props.active ? "white" : "#3F6FF0")};
  cursor: pointer;
`;
