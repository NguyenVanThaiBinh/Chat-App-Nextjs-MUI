export default class UserObject {
  email: string;
  fullname: string;
  nickname: string;
  last_active: Date;
  isOnline: boolean;
  photoUserUrl: string;

  constructor(
    email: string,
    fullname: string,
    nickname: string,
    last_active: Date,
    isOnline: boolean,
    photoUserUrl: string
  ) {
    this.email = email;
    this.fullname = fullname;
    this.nickname = nickname;
    this.last_active = last_active;
    this.isOnline = isOnline;
    this.photoUserUrl = photoUserUrl;
  }
}
