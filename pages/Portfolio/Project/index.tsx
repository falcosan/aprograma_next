import React from 'react';
import { StoryData, StoryblokComponent as Component } from '@storyblok/react';

export const Project = (props: StoryData) => {
    return <Component key={props.uuid} blok={props.content} />;
};
