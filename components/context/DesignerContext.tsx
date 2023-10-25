"use client";

import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  addElement: (idx: number, element: FormElementInstance) => void;
  removeElement: (idx: string) => void;
  updateElement: (idx: string, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElement = (idx: number, element: FormElementInstance) =>
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(idx, 0, element);
      return newElements;
    });

  const removeElement = (idx: string) => {
    setElements((prev) => prev.filter((element) => element.id !== idx));
  };

  const updateElement = (idx: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const idxToUpdate = newElements.findIndex((el) => el.id === idx);
      newElements.splice(idxToUpdate, 1, element);
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        selectedElement,
        setElements,
        setSelectedElement,
        addElement,
        removeElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
