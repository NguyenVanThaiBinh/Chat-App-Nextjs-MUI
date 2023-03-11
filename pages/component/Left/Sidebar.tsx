import { Button, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from "@mui/icons-material/Chat";
import MorVericalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { useSession, signOut } from "next-auth/react";
import styled from "styled-components";
import { server } from "../../index";
import { useEffect, memo } from "react";
import UserObject from "../../../Object/UserObject";

const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;
const StyleSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 2px;
`;
const StyleSidebarButton = styled(Button)`
  width: 100%;
  font-weight: bolder;
  border-top: 1px solid whitesmoke;
`;

const StyleAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyleSearchInput = styled.input`
  outline: none;
  flex: 1;
  border: none;
  font-size: 15px;
`;

function Sidebar(props: any) {
  const { data: session, status } = useSession();
  const handleClickFromSidebar = () => props.handleOnClick(null);

  useEffect(() => {
    if (session?.user != null || session?.user != undefined) {
      try {
        fetch(server + "/api/users/insertUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(session?.user),
        });
        console.log("AAAAAAAAAAAAAAAAAA");
      } catch (error) {
        console.warn("Insert User fail!");
      }
    }
    // TODO: Run Socket sever here
    fetch(server + "/api/socketio").finally(() => {});
  }, [status]);

  return (
    <>
      <StyleHeader>
        <Tooltip
          title={session && session.user ? session?.user?.name : ("" as string)}
          placement="right"
        >
          <StyleAvatar
            src={session?.user?.image as string}
            imgProps={{ referrerPolicy: "no-referrer" }}
          />
        </Tooltip>
        <Typography>What are you thinking ?</Typography>

        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MorVericalIcon />
          </IconButton>
          <IconButton>
            <Tooltip title="Logout" placement="right">
              <LogoutIcon onClick={() => signOut()} />
            </Tooltip>
          </IconButton>
        </div>
      </StyleHeader>
      <StyleSearch>
        <SearchIcon />
        <StyleSearchInput placeholder="Search in conversations" />
      </StyleSearch>
      <StyleSidebarButton onClick={handleClickFromSidebar}>
        Start a new conversation
      </StyleSidebarButton>
    </>
  );
}
export default memo(Sidebar);
