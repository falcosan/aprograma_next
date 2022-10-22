import { SbBlokData } from '@storyblok/react';

export declare interface IProps extends Partial<SbBlokData>, Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
    blok: {
        name: string;
        height: string;
        add_line: boolean;
        row_container: boolean;
    };
}
