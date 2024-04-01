import { observer } from "mobx-react";
import React from "react";
import { Sprint } from "../../models/Sprint";
import { dictionaryStore } from "../../stores/DictionaryStore";
import { TaskSection } from "./TaskSection";

export const TaskBoard = observer(
  ({ selectedSprint }: { selectedSprint?: Sprint }) => {
    const renderStatusColumns = () => {
      const numberOfColumns = Object.entries(
        dictionaryStore.statusDictionary
      ).length;
      return (
        <>
          {Object.entries(dictionaryStore.statusDictionary).map(
            ([key, value]) => {
              return (
                <TaskSection
                  key={key}
                  status={{ id: key, name: value }}
                  numberOfColumns={numberOfColumns}
                  selectedSprint={selectedSprint!}
                />
              );
            }
          )}
        </>
      );
    };

    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {renderStatusColumns()}
      </div>
    );
  }
);
