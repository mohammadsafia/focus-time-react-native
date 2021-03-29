export enum STATUSES {
    COMPLETE = 1,
    CANCELED = 2
}

export interface IFocusHistory {
    subject: string;
    status: STATUSES;
}

export type StringOrNull = string | null;
