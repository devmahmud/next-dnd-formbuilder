"use client";

import { Loader2, MousePointerClick } from "lucide-react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "./ui/use-toast";
import { SubmitForm } from "@/actions/form";

interface Props {
  formContent: FormElementInstance[];
  formURL: string;
}

function FormSubmitComponent({ formContent, formURL }: Props) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm = useCallback(() => {
    for (const field of formContent) {
      const isValid = FormElements[field.type].validate(
        field,
        formValues.current[field.id] || "",
      );
      if (!isValid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [formContent]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const JSONContent = JSON.stringify(formValues.current);
      await SubmitForm(formURL, JSONContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border bg-background p-8 shadow-xl shadow-blue-700">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting this form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div
        key={renderKey}
        className="flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border bg-background p-8 shadow-xl shadow-blue-700"
      >
        {formContent.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}

        <Button onClick={() => startTransition(submitForm)} disabled={pending}>
          {pending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <MousePointerClick className="mr-2" /> Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
