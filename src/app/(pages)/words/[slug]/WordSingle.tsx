"use client";

import { wordsService } from "@/app/(pages)/words/model/services/words.service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader/Loader";
import Button from "@/components/ui/button/Button";
import { Edit, Trash2 } from "lucide-react";
import Error from "@/components/ui/error/Error";
import { errorCatch } from "@/app/api/error";
import { toast, Toaster } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WordForm from "../create/WordForm";
import { IWord } from "../model/types/word.types";
import { useRouter } from "next/navigation";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { WithHeaderState } from "@/app/hoc/WithHeaderState";

function WordSingle({ slug }: { slug: string }) {
  const [isDialogUpdateOpen, setIsDialogUpdateOpen] = useState(false);
  const [localWordData, setLocalWordData] = useState<null | IWord>(null);
  const { replace, push } = useRouter();

  const { data, isFetching, error } = useQuery({
    queryKey: ["/words/:en"],
    queryFn: () => wordsService.get(slug),
    retry: 1,
    staleTime: 0,
  });

  const { mutate, status } = useMutation({
    mutationFn: (en: string) => wordsService.deleteByEn(en),
    onSuccess: () => {
      toast.success("Word deleted successfully");
      push(DASHBOARD_PAGES.WORDS);
    },
    onError: (error: unknown) => {
      toast.error(errorCatch(error));
    },
  });

  const onSuccessUpdate = (data: IWord) => {
    setIsDialogUpdateOpen(false);
    setLocalWordData(data);
    replace(`${DASHBOARD_PAGES.WORDS}/${data.en}`);
  };

  const onHandleDelete = (en: string) => {
    mutate(en);
  };

  useEffect(() => {
    if (!(error || isFetching) && data?.data) {
      setLocalWordData(data.data);
      toast.success("Word was found");
    }
  }, [data, isFetching]);

  return (
    <>
      {error && (
        <div className="absolute top-1/2 left-1/2">
          <Error message={errorCatch(error)} />
        </div>
      )}

      {!error && (
        <>
          <div className="pb-2 border-b border-blue-600 flex justify-between">
            {isFetching || status === "pending" ? (
              <div className="mb-1">
                <Loader />
              </div>
            ) : (
              <span className="text-blue-500 text-2xl">
                {localWordData?.en}
              </span>
            )}
            <div className="flex gap-2">
              <Dialog open={isDialogUpdateOpen}>
                <DialogTrigger
                  onClick={() => setIsDialogUpdateOpen(true)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 px-4 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10"
                  disabled={isFetching}
                >
                  <Edit />
                </DialogTrigger>
                <DialogContent
                  onClose={() => setIsDialogUpdateOpen(false)}
                  className="bg-black"
                  title="form form update word"
                >
                  <DialogTitle className="text-blue-600 text-center">
                    Update word
                  </DialogTitle>
                  <DialogHeader>
                    <WordForm
                      word={localWordData!}
                      mode="update"
                      isToaster={false}
                      onSuccessCallback={onSuccessUpdate}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Button
                onClick={() => {
                  onHandleDelete(localWordData!.en);
                }}
                variant={"danger"}
                disabled={isFetching}
              >
                <Trash2 />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <span className="mb-2 block">Translate:</span>
            {isFetching || status === "pending" ? (
              <Loader />
            ) : (
              <ul className="pl-5 list-disc">
                {localWordData?.translate.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <Toaster richColors expand={true} />
        </>
      )}
    </>
  );
}

export default WithHeaderState(WordSingle, "words");
