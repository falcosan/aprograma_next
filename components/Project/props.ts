import { SbBlokData } from '@storyblok/react';
import { MediaAsset, ColorPicker } from '@typing';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        body: SbBlokData[];
        image: MediaAsset;
        intro: string;
        title: string;
        end_date: string;
        align_text: string;
        start_date: string;
        text_color: ColorPicker;
        url_project: string;
        remove_space: boolean;
        url_repository: string;
        background_color: ColorPicker;
    };
}
