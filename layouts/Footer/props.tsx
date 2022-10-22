import { SbBlokData } from '@storyblok/react';
import { ColorPicker } from '@typing';

export declare interface IState extends SbBlokData {
    body: SbBlokData[];
    text_static: string;
    transparency: boolean;
    icon_color: ColorPicker;
    text_typewriter: string[];
    background_color: ColorPicker;
    background_color_menu: ColorPicker;
}
