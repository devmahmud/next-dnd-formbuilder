import { SaveAll } from "lucide-react";
import { Button } from "./ui/button";

function SaveFormBtn() {
  return (
    <Button variant="outline" className="gap-2">
      <SaveAll className="h-6 w-6" />
      Save
    </Button>
  );
}

export default SaveFormBtn;
