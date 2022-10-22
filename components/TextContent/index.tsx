import React from 'react';
import { IProps } from './props';
import { Markdown } from '../Markdown';

export const TextContent = (props: IProps) => {
    return <Markdown className="p-6">{props.blok.text}</Markdown>;
};
