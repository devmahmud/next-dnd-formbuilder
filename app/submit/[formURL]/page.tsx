import { GetFormContentByURL } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";

interface Props {
  params: {
    formURL: string;
  };
}

async function SubmitPage({ params }: Props) {
  const form = await GetFormContentByURL(params.formURL);
  if (!form) throw new Error("Form not found");

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent formURL={params.formURL} formContent={formContent} />
  );
}

export default SubmitPage;
