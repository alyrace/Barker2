import { merge, namespaced } from "overmind/config";
import { createOvermind } from "overmind";
import { createHook } from "overmind-react";

import * as user from "./user";
import * as boards from "./boards";
import * as projects from "./projects";

const config = merge(
  namespaced({
    user,
    boards,
    projects,
  })
);

export const overmind = createOvermind(config);

export const useOvermind = createHook();