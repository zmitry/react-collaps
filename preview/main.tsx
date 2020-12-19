import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "react-storyui/src/index.css"
import { StoryUI, parseModule } from 'react-storyui'

const AppWrapper = (children) => {
  return <Suspense fallback={"Loading ..."}>{children}</Suspense>;
};

let stories = new Map();
parseModule(require("./App"), stories, "./App", AppWrapper);
ReactDOM.render(
  <StoryUI stories={stories} />,
  document.getElementById("root")
);
