import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";

interface Props {
  params: {
    id: string;
  };
}

async function BuilderPage({ params }: Props) {
  const { id } = params;
  const form = await GetFormById(+id);
  if (!form) throw new Error("Form not found");

  return <FormBuilder form={form} />;
}

export default BuilderPage;
