/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ReactComponent as CheckList } from './list-check.svg';
import { ReactComponent as People } from './people.svg';

export function CheckListIcon(props: any) {
    return (
        <CheckList {...props} />
    )
}

export function PeopleIcon(props: any) {
    return (
        <People {...props} />
    )
}
