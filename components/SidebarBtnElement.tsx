import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  return (
    <Button
      variant="outline"
      className="flex h-[120px] w-[120px] cursor-grab flex-col gap-2"
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      {label}
    </Button>
  );
}

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex h-[120px] w-[120px] cursor-grab flex-col gap-2",
        draggable.isDragging && "ring-2 ring-primary",
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      {label}
    </Button>
  );
}

export default SidebarBtnElement;
