import React from 'react';
import { IState } from './props';
import { LayoutContext } from '../';
import { StoryblokComponent as Component } from '@storyblok/react';

export const Footer = () => {
    const blok = React.useContext(LayoutContext).find(({ component: c }) => c.toLowerCase() === 'footer') as IState;
    return (
        <footer>
            {blok.body.map((component) => (
                <Component key={component._uid} blok={component} />
            ))}
        </footer>
    );
};
