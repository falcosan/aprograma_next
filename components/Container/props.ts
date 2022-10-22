import { ColorPicker } from '@typing';
import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    internal?: {
        sliderMode?: boolean;
        carouselMode?: boolean;
        containerMode?: boolean;
    };
    blok: {
        name: string;
        title: string;
        height: string;
        body: SbBlokData[];
        auto_play: boolean;
        hide_dots: boolean;
        max_slides: string;
        slider_mode: string;
        slider_time: number;
        remove_space: boolean;
        align_content: string;
        row_container: boolean;
        resolution_show: string;
        column_container: string;
        title_color: ColorPicker;
        hide_controllers: boolean;
        background_color_component: ColorPicker;
        background_color_container: ColorPicker;
    };
}
