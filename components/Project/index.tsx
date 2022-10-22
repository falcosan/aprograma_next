import React from 'react';
import { IProps } from './props';

export const Project = (props: IProps) => {
    return <div className="m-6">{props.blok.title}</div>;
};
