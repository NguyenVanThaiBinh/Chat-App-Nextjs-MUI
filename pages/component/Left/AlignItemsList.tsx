import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useEffect, useState, memo } from "react";
import { useSession } from "next-auth/react";
import { server } from "../../index";
import DefaultAvatar from "../../../asset/group_avatar.png";

function AlignItemsList(props: any) {
  const [groupData, setGroupData] = useState([]);
  const { data: session, status } = useSession<any | null>();
  const userEmail = session && session.user ? session.user.email : null;
  const handleClick = (id: any, memberData: any, photoGroupChatUrl: any) => {
    const filteredMemberData = memberData.filter(
      (member: { email: string }) => member.email != userEmail
    );
    props.handleOnClick(id, filteredMemberData, photoGroupChatUrl);
  };
  useEffect(() => {
    const setChatNameandPhotoChat = (data: any) => {
      for (let i = 0; i < data.length; i++) {
        // 2 people
        if (data[i].member.length == 2) {
          if (data[i].member[0].email == userEmail) {
            data[i].chat_name = data[i].member[1].nickname;
            data[i].photoGroupChatUrl = data[i].member[1].photoUserUrl;
          } else {
            data[i].chat_name = data[i].member[0].nickname;
            data[i].photoGroupChatUrl = data[i].member[0].photoUserUrl;
          }
        } else {
          // more 2 people
          // default case
          if (data[i].chat_name.length == 0) {
            data[i].chat_name =
              data[i].member[0].nickname + ", " + data[i].member[1].nickname;
          }
        }
      }

      setGroupData(data);
    };
    if (userEmail != null) {
      fetch(server + `/api/group/${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.length > 0) {
            setChatNameandPhotoChat(data);
          }
        });
    }
  }, [status, session, userEmail]);

  return (
    <>
      {" "}
      <Divider />
      {groupData.map((object: any) => (
        <List
          key={object._id}
          sx={{
            width: "100%",
            maxWidth: 450,
            bgcolor: "background.paper",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <ListItemButton
            sx={{
              ":hover": {
                bgcolor: "rgba(25, 118, 210, 0.08)",
              },
              ":focus": {
                bgcolor: "rgba(25, 118, 210, 0.08)",
              },
              color: "#1976d2",
            }}
          >
            <ListItem
              alignItems="flex-start"
              onClick={() =>
                handleClick(
                  object.group_id,
                  object.member,
                  object.photoGroupChatUrl
                )
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt="GroupChatAvatar"
                  imgProps={{ referrerPolicy: "no-referrer" }}
                  src={object.photoGroupChatUrl || DefaultAvatar.src}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  color: "black",
                }}
                primary={object.chat_name}
                secondary={
                  <React.Fragment>{object.last_chat_content}</React.Fragment>
                }
              />
            </ListItem>
          </ListItemButton>

          <Divider />
        </List>
      ))}
    </>
  );
}
export default memo(AlignItemsList);
