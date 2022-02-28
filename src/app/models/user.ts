export interface Preferences {
  view?: string;
  archive?: boolean;
}

export class IntercomInfo {
  id: string;
}

export class PersonId {
  id: string;
  title: string;
  finished: boolean;
  annuity_allowed: boolean;
}

export interface User {
  id: string;
  email: string;
  name_casual: string;
  preferences: Preferences;
  avatar: string;
  created_at: string;
  mailings: { [key: string]: boolean };
  notification_email: boolean;
  notification_push: boolean;
  notifications: any;
  person: PersonId;
  open_task_count: number;
  open_critical_task_count: number;
  unread_inbox_count: number;
  intercom: IntercomInfo;
  invitations: any;
  total_deposit: string;
  fee_percentage?: number;
}
