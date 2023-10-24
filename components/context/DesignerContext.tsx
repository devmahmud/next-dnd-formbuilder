"use client";

import { createContext, ReactNode, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (idx: number, element: FormElementInstance) => void;
  removeElement: (idx: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElement = (idx: number, element: FormElementInstance) =>
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(idx, 0, element);
      return newElements;
    });

  const removeElement = (idx: string) => {
    setElements((prev) => prev.filter((element) => element.id !== idx));
  };

  return (
    <DesignerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
