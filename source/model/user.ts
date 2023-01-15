// External dependencies
import { ObjectId, Timestamp } from "mongodb";

// Class Implementation

export default class User {
  static email: string | null | undefined;
  constructor(
    public id: ObjectId,
    public email: string,
    public last_acive: Timestamp,
    public isActive: boolean,
    public fullname: string,
    public photoUrl: string
  ) {}
}
