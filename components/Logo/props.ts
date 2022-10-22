import { ColorPicker } from '@typing';
import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    internal?: {
        size?: string;
        link?: boolean;
        colorA?: string;
        colorP?: string;
        transition?: boolean;
    };
    blok: {
        name: string;
        size: string;
        transition: boolean;
        color_a: ColorPicker;
        color_p: ColorPicker;
    };
}
