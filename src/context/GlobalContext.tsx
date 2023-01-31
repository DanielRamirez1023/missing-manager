import React, { useState } from "react";
import { MyFormValues } from "../schema/schemas";

interface ContextProps {
  missings: MyFormValues[];
  addMissing: (value: MyFormValues) => void;
  deleteMissing: (id: number) => void;
  updateStateMissing: (id: number, state: boolean) => void;
}

interface Children {
  children: JSX.Element | JSX.Element[];
}

const GlobalContext = React.createContext<ContextProps>({
  missings: [],
  addMissing: () => {},
  deleteMissing: () => {},
  updateStateMissing: () => {},
});

const GlobalContextProvider = ({ children }: Children) => {
  // let missings: Array<MyFormValues> = [];
  const [missings, setMissings] = useState<MyFormValues[]>([]);

  const addMissing = (missing: MyFormValues) => {
    setMissings([...missings, missing]);
  };

  const deleteMissing = (id: number) => {
    let newMissings = missings.filter((item, i) => i !== id);

    setMissings(newMissings);
  };

  const updateStateMissing = (id: number, state: boolean) => {
    let newTodos = [...missings];

    newTodos[id] = { ...newTodos[id], complete: !state };

    setMissings(newTodos);
  };

  return (
    <GlobalContext.Provider
      value={{
        missings,
        addMissing,
        deleteMissing,
        updateStateMissing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useAppContext = () => React.useContext(GlobalContext);

export { GlobalContextProvider, useAppContext };
