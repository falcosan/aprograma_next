import React from 'react';
import { IProps } from './props';
import { Markdown } from '../Markdown';

export const Post = (props: IProps) => {
    return (
        <div>
            <span>{props.blok.title}</span>
            <Markdown>{props.blok.long_text}</Markdown>
        </div>
    );
};
