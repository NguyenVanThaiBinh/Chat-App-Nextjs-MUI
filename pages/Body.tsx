import Sidebar from "./component/Left/Sidebar";
import ChatMsg from "./component/Middle/ChatMsg";
import CreateConversation from "./component/Middle/CreateConversation";
import Home from "./component/Middle/Home";
import AlignItemsList from "./component/Left/AlignItemsList";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState } from "react";

const SidebarContainer = styled(Grid)`
  height: 100vh;
  min-width: 350px;
  max-width: 430px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;

export default function Body() {
  // 0 for default
  // 1 for ChatMsg
  // 2 for Create new Conversation
  const [mountComponentIndex, setMountComponent] = useState(0);
  const [groupData, setGroupData] = useState({});
  const handleOnClickFromChild = (
    id: any,
    memberData: any,
    photoGroupChatUrl: any
  ) => {
    // using for middle component ChatMsg
    if (id != null) {
      const data = {
        groupId: id,
        memberData: memberData,
        photoGroupChatUrl: photoGroupChatUrl,
      };
      setMountComponent(1);
      setGroupData(data);
    }
    // using for middle component Create New Conversation
    if (id == null) {
      setMountComponent(2);
    }
    return null;
  };

  const renderControl = () => {
    switch (mountComponentIndex) {
      case 1:
        return <ChatMsg props={groupData} />;
      case 2:
        return <CreateConversation />;
      default:
        return <Home />;
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid sx={{ paddingLeft: 3, paddingRight: 3 }} container spacing={2}>
        <Grid item xs={6} md={3}>
          <SidebarContainer>
            <Sidebar handleOnClick={handleOnClickFromChild} />
            <AlignItemsList handleOnClick={handleOnClickFromChild} />
          </SidebarContainer>
        </Grid>
        <Grid item xs={6} md={6.5}>
          {renderControl()}
        </Grid>
        <Grid item xs={6} md={2.5} sx={{ textAlign: "center" }}>
          What should I do Here???
        </Grid>
      </Grid>
    </Box>
  );
}
