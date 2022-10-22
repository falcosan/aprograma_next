import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        name: string;
        posts: object[];
        show_slider: boolean;
        body: SbBlokData[];
        row_container: boolean;
    };
}
