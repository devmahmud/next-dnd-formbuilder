import { Eye } from "lucide-react";
import { Button } from "./ui/button";

function PreviewDialogBtn() {
  return (
    <Button variant="outline" className="gap-2">
      <Eye className="h-6 w-6" />
      Preview
    </Button>
  );
}

export default PreviewDialogBtn;
