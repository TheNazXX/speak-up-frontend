"use client";

import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="animate-spin text-blue-300 w-max">
      <LoaderCircle className="w-10 h-10" />
    </div>
  );
}
