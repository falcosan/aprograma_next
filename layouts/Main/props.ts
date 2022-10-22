import React from 'react';
import { SbBlokData } from '@storyblok/react';
import { ColorPicker, MediaAsset } from '@typing';

export declare interface IProps {
    content: React.ReactNode;
}

export declare interface IState extends SbBlokData {
    transparency: boolean;
    body_color: ColorPicker;
    color_animation: boolean;
    background_front: boolean;
    background_position: string;
    background_media: MediaAsset;
    background_color: ColorPicker;
    show_background_mask: boolean;
    background_color_mask: ColorPicker;
}
