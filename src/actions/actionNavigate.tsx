import React from "react";
import { Avatar } from "../components/Avatar";
import { register } from "./register";
import { getClientColors, getClientInitials } from "../clients";
import { Collaborator } from "../types";
import { centerScrollOn } from "../scene/scroll";

export const actionGoToCollaborator = register({
  name: "goToCollaborator",
  perform: (_elements, appState, value) => {
    const point = value as Collaborator["pointer"];
    if (!point) {
      return { appState, commitToHistory: false };
    }

    return {
      appState: {
        ...appState,
        ...centerScrollOn({
          scenePoint: point,
          viewportDimensions: {
            width: appState.width,
            height: appState.height,
          },
          zoom: appState.zoom,
        }),
        // Close mobile menu
        openMenu: appState.openMenu === "canvas" ? null : appState.openMenu,
      },
      commitToHistory: false,
    };
  },
  PanelComponent: ({ appState, updateData, id }) => {
    const clientId = id;

    if (!clientId) {
      return null;
    }

    const collaborator = appState.collaborators.get(clientId);

    if (!collaborator) {
      return null;
    }

    const { background } = getClientColors(clientId);
    const shortName = getClientInitials(collaborator.username);

    return (
      <Avatar
        color={background}
        onClick={() => updateData(collaborator.pointer)}
      >
        {shortName}
      </Avatar>
    );
  },
});
