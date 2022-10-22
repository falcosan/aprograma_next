import React from 'react';
import { IProps } from './props';
import { IconType } from 'react-icons/lib';
import * as Material from 'react-icons/md';
import * as FontAwesome from 'react-icons/fa';

export const Icon = (props: IProps) => {
    const iconName = props.blok?.name ?? props.internal?.title;
    const familyChecker = (family: object) => (iconName ? Object.keys(family).includes(iconName) : null);
    const setterFamily = (() => {
        if (familyChecker(Material)) return Material;
        else if (familyChecker(FontAwesome)) return FontAwesome;
        else return undefined;
    })();
    const ReactIcon = setterFamily
        ? (setterFamily[iconName as keyof typeof setterFamily] as IconType)
        : () => (props.blok ? <img src={props.blok.icon_image.filename} /> : <span>Icon not found</span>);
    return (
        <ReactIcon
            onClick={(e: React.MouseEvent<HTMLElement & SVGElement, MouseEvent>) => props.onClick && props.onClick(e)}
            className={props.className}
            {...(props.internal,
            {
                size: props.blok?.size ?? props.internal?.size,
                color: props.blok?.icon_color?.color ?? props.internal?.color,
            })}
        />
    );
};
