import { ColorPicker } from '@typing';
import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    internal?: {
        to?: string;
        title?: string;
        active?: string;
        iconTag?: string;
        setActive?: string;
        iconItem?: boolean;
        iconStyle?: string;
        sliderMode?: boolean;
        externalLink?: boolean;
        carouselMode?: boolean;
        containerWidth?: number;
        containerMode?: boolean;
    };
    blok: {
        path: string;
        name: string;
        hide: boolean;
        title: string;
        body: SbBlokData[];
        icon_item: boolean;
        align_content: string;
        external_link: boolean;
        row_container: boolean;
        text_color: ColorPicker;
        column_container: string;
    };
}
