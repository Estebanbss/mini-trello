export interface User {
  id:       number;
  username: string;
  photo:    string;
  email:    string;
  atype:    string;
  regDate:  string;
  boards:   any[];
}

export interface Login{
  email: string;
  password: string;
}

// Generated by https://quicktype.io

export interface Token {
  token: string;
}

