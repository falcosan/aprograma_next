import React from 'react';
import { IProps } from './props';

export const Media = (props: IProps) => {
    return (
        <div className="m-6">
            <img src={props.blok.media.filename} />
        </div>
    );
};
