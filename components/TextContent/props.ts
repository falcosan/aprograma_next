import { ColorPicker } from '@typing';
import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        name: string;
        text: string;
        align_text: string;
        remove_space: boolean;
        row_container: boolean;
        text_color: ColorPicker;
        background_color: ColorPicker;
    };
}
