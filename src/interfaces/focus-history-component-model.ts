import React from 'react';

import { IFocusHistory } from '.';

export interface IFocusHistoryComponent{
    focusHistory: IFocusHistory[];
    setFocusHistory?:  React.Dispatch<React.SetStateAction<IFocusHistory[]>>;
    onClear: Function
}
