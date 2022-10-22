import { SbBlokData } from '@storyblok/react';
import { ColorPicker } from '@typing';

export declare interface IState extends SbBlokData {
    body: SbBlokData[];
    icon_color: ColorPicker;
    logo_colors: ColorPicker;
    background_color: ColorPicker;
    background_color_menu: ColorPicker;
}
