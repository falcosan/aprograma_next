import React from "react";
import { Icon } from "../Icon";
import { IProps } from "./props";
import NavLink from "next/link";
import { IProps as IconProps } from "../Icon/props";

export const Link = (props: IProps) => {
  const LinkType = props.blok.external_link
    ? (linkProps: any) => (
        <a
          {...linkProps}
          href={props.blok.path}
          target="_blank"
          rel="noopener noreferrer"
          title={
            props.blok.title && props.blok.icon_item
              ? props.blok.title
              : undefined
          }
        />
      )
    : (linkProps: any) => (
        <NavLink
          {...linkProps}
          title={
            props.blok.title && props.blok.icon_item
              ? props.blok.title
              : undefined
          }
        />
      );
  return props.blok &&
    (props.blok.title || (props.blok.icon_item && props.blok.body.length)) ? (
    <LinkType
      className={`link ${
        props.internal?.sliderMode ||
        props.internal?.carouselMode ||
        props.internal?.containerMode
          ? "link-child"
          : "link-parent"
      }`}
      activeClassName={
        !props.internal?.iconItem && !props.blok.icon_item
          ? "link-active_text"
          : "link-active_icon"
      }
      href={props.blok.path}
    >
      {props.blok.title &&
      !props.internal?.iconItem &&
      !props.blok.icon_item ? (
        <span
          className="item-text break-words"
          style={{ color: props.blok.text_color.color }}
        >
          {props.blok.title}
        </span>
      ) : (
        (props.internal?.iconItem || props.blok.icon_item) && (
          <Icon
            className={`item-icon ${props.internal?.iconStyle}`}
            blok={props.blok.body[0] as unknown as IconProps["blok"]}
            internal={{
              tag: String(props.blok.body[0].tag),
              sliderMode: props.internal?.sliderMode,
              carouselMode: props.internal?.carouselMode,
              containerMode: props.internal?.containerMode,
            }}
          />
        )
      )}
    </LinkType>
  ) : (
    <LinkType
      className={`link ${
        props.internal?.sliderMode ||
        props.internal?.carouselMode ||
        props.internal?.containerMode
          ? "link-child"
          : "link-parent"
      }`}
      activeClassName={
        props.internal?.active
          ? !props.internal?.iconItem
            ? props.internal?.setActive
              ? props.internal?.setActive
              : "link-active_text"
            : props.internal?.setActive
            ? props.internal?.setActive
            : "link-active_icon"
          : null
      }
      href={props.blok.path}
    >
      {props.blok.name}
    </LinkType>
  );
};
