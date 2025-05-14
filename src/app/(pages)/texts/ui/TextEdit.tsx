"use client";

import { WithHeaderState } from "@/app/hoc/WithHeaderState";

function TextEdit() {
  return <>Edit</>;
}

export default WithHeaderState(TextEdit, "texts");
