"use client";

import { wordsService } from "@/app/(pages)/words/model/services/words.service";
import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/ui/loader/Loader";

import { toast, Toaster } from "sonner";

import Error from "@/components/ui/error/Error";
import { errorCatch } from "@/app/api/error";
import WordsList from "./WordsList";
import { WithHeaderState } from "@/app/hoc/WithHeaderState";

function Words() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/words"],
    queryFn: () => wordsService.getAll(),
    retry: 1,
    staleTime: 0,
  });

  let content;

  if (data?.data && !(isLoading || error)) {
    toast.success("Words was successfully load");
    content = <WordsList data={data.data} />;
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

export default WithHeaderState(Words, "words");
