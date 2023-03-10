import Sidebar from "./component/Left/Sidebar";
import ChatMsg from "./component/Middle/ChatMsg";
import CreateConversation from "./component/Middle/CreateConversation";
import Home from "./component/Middle/Home";
import AlignItemsList from "./component/Left/AlignItemsList";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState, useRef } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Information from "./component/Right/Information";

const SidebarContainer = styled(Grid)`
  height: 100vh;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
`;
const InformationGrid = styled(Grid)`
  @media only screen and (max-width: 429px) {
    display: none;
  }
`;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
export default function Body() {
  // 0 for default
  // 1 for ChatMsg
  // 2 for Create new Conversation
  const [mountComponentIndex, setMountComponent] = useState(0);
  const [groupData, setGroupData] = useState({});
  let newGroupId = useRef();
  let isEnableBlueAlignItem = useRef(true);

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
      isEnableBlueAlignItem.current = true;
      setMountComponent(1);
      setGroupData(data);
    }
    // using for middle component Create New Conversation
    if (id == null) {
      isEnableBlueAlignItem.current = false;
      newGroupId.current = undefined;
      setMountComponent(2);
    }
    return null;
  };

  const handleNewConversation = (
    id: any,
    memberData: any,
    photoGroupChatUrl: any
  ) => {
    newGroupId.current = id;
    if (id != null) {
      const data = {
        groupId: id,
        memberData: memberData,
        photoGroupChatUrl: photoGroupChatUrl,
      };
      isEnableBlueAlignItem.current = true;
      setMountComponent(1);
      setGroupData(data);
    }
  };

  const renderControl = () => {
    switch (mountComponentIndex) {
      case 1:
        return <ChatMsg groupData={groupData} />;
      case 2:
        return <CreateConversation handleDoubleClick={handleNewConversation} />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={13} sm={6} xl={3}>
            <SidebarContainer sx={{ paddingLeft: "17px" }}>
              <Sidebar
                handleOnClick={handleOnClickFromChild}
                isEnableBlue={isEnableBlueAlignItem.current}
              />
              <AlignItemsList
                handleOnClick={handleOnClickFromChild}
                new_group_id={newGroupId.current}
                isEnableBlue={isEnableBlueAlignItem.current}
              />
            </SidebarContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            xl={5.5}
            sx={{ backgroundColor: "#f0f0f0" }}
          >
            {renderControl()}
          </Grid>
          <InformationGrid
            item
            xs={12}
            sm={12}
            xl={3.5}
            sx={{ textAlign: "center" }}
          >
            <Information></Information>
          </InformationGrid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
