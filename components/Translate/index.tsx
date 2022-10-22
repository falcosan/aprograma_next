import React from 'react';
import { IProps } from './props';

export const Translate = (props: IProps) => {
    const setLocale = () => document.documentElement.setAttribute('lang', props.blok.language);
    return (
        <div onClick={setLocale} className="p-6">
            {props.blok.language}
        </div>
    );
};
