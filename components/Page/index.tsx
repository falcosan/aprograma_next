import React, { useMemo } from "react";
import { IProps } from "./props";
import { useGetWindowSize } from "../../hooks";
import { rangeItems } from "../../utils/number";
import { StoryblokComponent as Component } from "@storyblok/react";

export const Page = (props: IProps) => {
  const { width } = useGetWindowSize();

  const spaceFix = 20;

  const elements = useMemo(() => {
    return props.blok.body.filter((component) => {
      const setterResolutionShow = +String(component.resolution_show).split(
        "; "
      )[1];
      return component.resolution_show != null && !isNaN(setterResolutionShow)
        ? width >= setterResolutionShow
        : component;
    });
  }, [width, props.blok.body]);

  const rowComponent = useMemo(
    () => elements.filter((item) => item.row_container),
    [elements]
  );

  const maxElements = useMemo(() => {
    if (Number(props.blok.column_container) != null) {
      if (width >= 1440)
        return rangeItems(Number(props.blok.column_container), 3);
      return width >= 768
        ? rangeItems(Number(props.blok.column_container), 2)
        : 1;
    } else {
      if (width >= 1440) return rangeItems(rowComponent.length, 3);
      return width >= 768 ? rangeItems(rowComponent.length, 2) : 1;
    }
  }, [props.blok.column_container, width, rowComponent.length]);

  const setAlignContent = useMemo(() => {
    switch (props.blok.align_content) {
      case "start":
        return "self-start";
      case "center":
        return "self-center";
      case "end":
        return "self-end";
    }
    return null;
  }, [props.blok.align_content]);

  return (
    <section className="page">
      {props.blok.title && <h1 className="page-title">{props.blok.title}</h1>}
      <div className="page-content">
        {props.blok.body.map((component) => (
          <div
            className={`page-content_component component-${component.component.toLowerCase()} ${
              component.component.toLowerCase() === "container" &&
              component.slider_mode === "slider"
                ? "component-container_slider"
                : null
            } ${
              component.component.toLowerCase() === "blank"
                ? null
                : `component-container_not-blank ${setAlignContent}`
            }`}
            style={{
              flex: component.row_container
                ? `1 ${
                    (100 - (maxElements > 1 ? spaceFix : 0)) /
                    rangeItems(maxElements, 3)
                  }%`
                : "100%",
            }}
            key={component._uid}
          >
            <Component blok={component} />
          </div>
        ))}
      </div>
    </section>
  );
};
