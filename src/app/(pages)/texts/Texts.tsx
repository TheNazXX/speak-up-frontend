"use client";

import { textService } from "@/app/services/texts.service";
import Loader from "@/components/ui/loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import TextsList from "./components/TextsList";
import Error from "@/components/ui/error/Error";
import { errorCatch } from "@/app/api/error";
import { WithHeaderState } from "@/app/hoc/WithHeaderState";

function Texts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/texts"],
    queryFn: () => textService.getAll(),
    retry: 1,
    staleTime: 0,
  });

  let content;

  if (data?.data && !(isLoading || error)) {
    toast.success("Words was successfully load");
    content = <TextsList data={data.data} />;
  }

  if (error && !isLoading) {
    content = (
      <Error
        className="absolute top-1/2 left-1/2"
        message={data?.error || errorCatch(error)}
      />
    );
  }

  if (isLoading && !error) {
    content = (
      <div className="absolute top-1/2 left-1/2">
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fe]">
      <div>{content}</div>
      <Toaster richColors />
    </div>
  );
}

export default WithHeaderState(Texts, "texts");
