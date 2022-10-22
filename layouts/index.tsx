import React from 'react';
import { Main } from './Main';
import { IProps } from './props';
import { Header } from './Header';
import { Footer } from './Footer';
import { SbBlokData } from '@storyblok/react';

export const LayoutContext = React.createContext<SbBlokData[]>([]);

export const Layout = (props: IProps) => {
    return props.story ? (
        <LayoutContext.Provider value={props.story.content.body}>
            <Header />
            <Main content={props.children} />
            <Footer />
        </LayoutContext.Provider>
    ) : null;
};
