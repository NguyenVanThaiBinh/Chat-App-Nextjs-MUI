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

const SidebarContainer = styled(Grid)`
  height: 100vh;
  // min-width: 350px;
  // max-width: 430px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
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
  let GroupId = useRef("");
  const handleOnClickFromChild = (
    id: any,
    memberData: any,
    photoGroupChatUrl: any
  ) => {
    GroupId.current = id;
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
        return (
          <CreateConversation handleDoubleClick={handleOnClickFromChild} />
        );
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} xl={3}>
            <SidebarContainer sx={{ paddingLeft: 5 }}>
              <Sidebar handleOnClick={handleOnClickFromChild} />
              <AlignItemsList
                handleOnClick={handleOnClickFromChild}
                re_render={GroupId.current}
              />
            </SidebarContainer>
          </Grid>
          <Grid xs={12} sm={6} xl={5.5}>
            {renderControl()}
          </Grid>
          <Grid item xs={12} sm={4} xl={3.5} sx={{ textAlign: "center" }}>
            What should I do Here???
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
