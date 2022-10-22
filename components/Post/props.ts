import { SbBlokData } from '@storyblok/react';
import { MediaAsset, ColorPicker } from '@typing';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        body: SbBlokData[];
        image: MediaAsset;
        intro: string;
        title: string;
        author: string;
        file: MediaAsset;
        end_date: string;
        long_text: string;
        align_text: string;
        start_date: string;
        url_project: string;
        remove_space: boolean;
        categories: string[];
        url_repository: string;
        text_color: ColorPicker;
        background_color: ColorPicker;
    };
}
