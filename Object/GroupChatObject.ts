export default class GroupChatObject {
  group_id: string;
  chat_name: string;
  member: Array<Object>;
  last_chat_content: string;
  photoGroupChatUrl: string;

  constructor(
    group_id: string,
    chat_name: string,
    member: Array<Object>,
    last_chat_content: string,
    photoGroupChatUrl: string
  ) {
    this.group_id = group_id;
    this.chat_name = chat_name;
    this.member = member;
    this.last_chat_content = last_chat_content;
    this.photoGroupChatUrl = photoGroupChatUrl;
  }
}
