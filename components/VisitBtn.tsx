"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VisitBtn({ shareURL }: { shareURL: string }) {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareURL}`;

  return (
    <Button
      className="w-[200px]"
      onClick={() => window.open(shareLink, "_blank")}
    >
      Visit
    </Button>
  );
}

export default VisitBtn;
