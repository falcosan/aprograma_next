import React from "react";
import { StoryData, StoryblokComponent as Component } from "@storyblok/react";

export default function Portfolio(props: StoryData) {
  return <Component key={props.uuid} blok={props.content} />;
}
