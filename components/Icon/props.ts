import { IconBaseProps } from 'react-icons';
import { SbBlokData } from '@storyblok/react';
import { ColorPicker, MediaAsset } from '@typing';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    internal?: IconBaseProps & {
        tag?: string;
        tooltip?: string;
        sliderMode?: boolean;
        carouselMode?: boolean;
        containerMode?: boolean;
    };
    blok?: {
        tag: string;
        name: string;
        size: string;
        title: string;
        shadow: boolean;
        show_title: boolean;
        remove_space: boolean;
        row_container: boolean;
        icon_image: MediaAsset;
        text_color: ColorPicker;
        icon_color: ColorPicker;
    };
}
