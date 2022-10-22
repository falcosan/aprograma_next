import React from "react";
import NavLink from "next/link";
import { useAppSelector } from "../../store";
import { StoryblokComponent as Component } from "@storyblok/react";

export const ProjectsList = () => {
  const projects = useAppSelector((state) => state.projectsSlice.value);
  return (
    <div className="m-6">
      {projects.map((project) => (
        <NavLink key={project.uuid} href={project.slug}>
          <Component blok={project.content} />
        </NavLink>
      ))}
    </div>
  );
};
