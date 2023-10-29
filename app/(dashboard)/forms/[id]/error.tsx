"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-4xl text-destructive">
        {error?.message || "Something went wrong."}
      </h2>
      <Button asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
}
