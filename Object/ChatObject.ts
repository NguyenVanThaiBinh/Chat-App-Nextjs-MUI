export default class ChatObject {
  id_chat_group: string;
  from: string;
  nickname: string;
  to: Array<Object>;
  send_at: Date;
  type: string;
  content: string;
  nextAuthToken: string;
  constructor(
    id_chat_group: string,
    from: string,
    nickname: string,
    to: Array<Object>,
    send_at: Date,
    type: string,
    content: string,
    nextAuthToken: string
  ) {
    this.id_chat_group = id_chat_group;
    this.from = from;
    this.nickname = nickname;
    this.to = to;
    this.send_at = send_at;
    this.type = type;
    this.content = content;
    this.nextAuthToken = nextAuthToken;
  }
}
