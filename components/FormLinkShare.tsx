"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Share } from "lucide-react";
import { toast } from "./ui/use-toast";

function FormLinkShare({ shareURL }: { shareURL: string }) {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  return (
    <div className="flex flex-grow items-center gap-4">
      <Input value={shareLink} readOnly />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied!",
            description: "The link has been copied to your clipboard.",
          });
        }}
      >
        <Share className="mr-2 h-4 w-4" /> Share link
      </Button>
    </div>
  );
}

export default FormLinkShare;
