import { storyblokInit, apiPlugin } from "@storyblok/react";
import { Page } from "../components/Page";
import { Icon } from "../components/Icon";
import { Logo } from "../components/Logo";
import { Link } from "../components/Link";
import { Post } from "../components/Post";
import { Blank } from "../components/Blank";
import { Media } from "../components/Media";
import { Project } from "../components/Project";
import { PostsList } from "../components/PostsList";
import { Container } from "../components/Container";
import { Translate } from "../components/Translate";
import { TextContent } from "../components/TextContent";
import { ProjectsList } from "../components/ProjectsList";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  apiOptions: {},
  use: [apiPlugin],
  components: {
    Icon,
    Logo,
    Page,
    Link,
    Post,
    Blank,
    Media,
    Project,
    Translate,
    Container,
    PostsList,
    TextContent,
    ProjectsList,
  },
});
