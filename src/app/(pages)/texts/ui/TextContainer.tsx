"use client";

import { textService } from "@/app/services/texts.service";
import { useQuery } from "@tanstack/react-query";

import { toast, Toaster } from "sonner";
import Error from "@/components/ui/error/Error";
import { errorCatch } from "@/app/api/error";
import Loader from "@/components/ui/loader/Loader";
import TextComponent from "./TextComponent";
import { WithHeaderState } from "@/app/hoc/WithHeaderState";

function TextSingle({ name }: { name: string }) {
  const { data, isFetching, error } = useQuery({
    queryKey: ["/texts/name"],
    queryFn: () => textService.getByName(name),
    retry: 1,
    staleTime: 0,
  });

  let content;

  if (data?.data && !(isFetching || error)) {
    toast.success("Words was successfully load");
    content = <TextComponent data={data.data} />;
  }

  if (error && !isFetching) {
    content = (
      <Error
        className="absolute top-1/2 left-1/2"
        message={data?.error || errorCatch(error)}
      />
    );
  }

  if (isFetching && !error) {
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

export default WithHeaderState(TextSingle, "texts");
