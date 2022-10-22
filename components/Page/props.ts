import { ColorPicker } from '@typing';
import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        name: string;
        hide: boolean;
        title: string;
        height: string;
        body: SbBlokData[];
        auto_play: boolean;
        hide_dots: boolean;
        max_slides: string;
        slider_mode: string;
        slider_time: string;
        title_color: string;
        show_slider: boolean;
        align_content: string;
        remove_space: boolean;
        row_container: boolean;
        resolution_show: string;
        hide_controllers: boolean;
        column_container: string | number;
        background_color_component: ColorPicker;
        background_color_container: ColorPicker;
    };
}
