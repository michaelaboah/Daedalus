import type { Gear } from "radix-icons-svelte";
import { writable } from "svelte/store";
import { createProject, type Project } from "../Classes";

export const accessToken = writable("");

export const gearList = writable<Gear[]>([]);

export const count = writable(0);

export const projectList = writable();
// Create project type and make derived lists

export const project = writable<Project>(createProject());
