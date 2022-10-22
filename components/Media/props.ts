import { SbBlokData } from '@storyblok/react';
import { MediaAsset, ColorPicker } from '@typing';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        loop: boolean;
        name: string;
        title: string;
        width: string;
        height: string;
        media: MediaAsset;
        modal_mode: boolean;
        remove_space: boolean;
        row_container: boolean;
        resolution_show: string;
        title_color: ColorPicker;
    };
}
