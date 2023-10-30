"use client";

import { Form } from "@prisma/client";
import Link from "next/link";
import Confetti from "react-confetti";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { useEffect, useState } from "react";
import useDesigner from "./hooks/useDesigner";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

interface Props {
  form: Form;
}

function FormBuilder({ form }: Props) {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const shareURL = `${window.location.origin}/submit/${form.shareURL}`;

  useEffect(() => {
    if (isReady) return;

    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    setIsReady(true);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          recycle={false}
        />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="max-w-md">
            <h1 className="mb-10 border-b pb-2 text-center text-4xl font-bold text-primary">
              🎊🎊 Form Published
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="border-b pb-10 text-xl text-muted-foreground">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
              <Input className="w-full" readOnly value={shareURL} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareURL);
                  toast({
                    title: "Copied!",
                    description: "The link has been copied to your clipboard.",
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href={"/"} className="gap-2">
                  <ArrowLeft /> Go back home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
