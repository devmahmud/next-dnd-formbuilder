import { ArrowUpToLine } from "lucide-react";
import { Button } from "./ui/button";

function PublishFormBtn() {
  return (
    <Button className="gap-2 bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
      <ArrowUpToLine className="h-6 w-6" />
      Publish
    </Button>
  );
}

export default PublishFormBtn;
