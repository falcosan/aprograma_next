import React from "react";
import { IProps } from "./props";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { filterObjProperties } from "../../utils/object";

export const Markdown = (props: IProps) => {
  return (
    <ReactMarkdown
      {...filterObjProperties(props, "className", false)}
      className={`markdown ${props.className}`}
      rehypePlugins={[rehypeRaw]}
    />
  );
};
