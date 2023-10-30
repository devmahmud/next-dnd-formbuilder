import { SeparatorVertical } from "lucide-react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";

import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: SeparatorVertical,
    label: "Separator field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <Separator />;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <p>No properties for this element</p>;
}
