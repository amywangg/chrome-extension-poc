import styled from "@emotion/styled";
import React, { useState } from "react";

const AvatarButton = styled.button`
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50px;
  opacity: ${(props) => (props.isSelected ? "1" : "0.5")};
`;

const UserSelectorContent = styled.div`
  opacity: ${(props) => (props.selectedTag ? "1" : "0.5")};
  display: block;
  position: absolute;
  background-color: white;
  z-index: 999;
  margin-top: 10px;
  height: 114px;
  width: 30px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.selectedTag ? "#F0F0F0" : "darkgrey")};
`;
const UserSelectorButton = styled.button`
  position: absolute;
  bottom: 5px;
  border-radius: 50px;
  background-color: blue;
  height: 20px;
  width: 20px;
`;

const UserSelector = ({ selectedTag = null, onUserSelected, members = [] }) => {
  const [selectedMembers, setSelectedMembers] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      <UserSelectorContent selectedTag={selectedTag}>
        {members.map((member) => {
          <AvatarButton
            isSelected={selectedMembers.includes(member)}
            onClick={onUserSelected(selectedTag, member)}
          />;
        })}
        <UserSelectorButton>+</UserSelectorButton>
      </UserSelectorContent>
    </div>
  );
};

export default UserSelector;
