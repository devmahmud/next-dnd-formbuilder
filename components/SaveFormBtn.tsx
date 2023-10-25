import { Loader2, SaveAll } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { UpdateFormContent } from "@/actions/form";
import { useTransition } from "react";
import useDesigner from "./hooks/useDesigner";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "Success",
        description: "Your form has been saved!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <SaveAll className="h-6 w-6" />
      Save
      {loading && <Loader2 className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;
