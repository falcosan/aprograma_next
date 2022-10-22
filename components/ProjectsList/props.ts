import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        name: string;
        projects: object[];
        show_slider: boolean;
        body: SbBlokData[];
        row_container: boolean;
    };
}
