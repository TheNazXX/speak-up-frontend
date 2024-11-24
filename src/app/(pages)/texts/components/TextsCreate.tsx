"use client";

import { textService } from "@/app/services/texts.service";
import TextEditor from "@/components/ui/text-editor/TextEditor";
import { extractBoldWords } from "@/lib/editor";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animations } from "@/lib/motion";
import Button from "@/components/ui/button/Button";
import WordForm from "@/app/(pages)/words/create/WordForm";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { toast, Toaster } from "sonner";
import { IWord, IWordPostDto } from "../../words/model/types/word.types";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Input from "@/components/ui/input/Input";
import { z } from "zod";

const LOCAL_TEXT_CONTENT_KEY = "text_content";

const createTextSchema = z.object({
  name: z.string().min(3, "Minimum 3 symbols"),
  content: z.string().optional(),
});

export type IPostText = z.infer<typeof createTextSchema>;

export default function TextsCreate() {
  const [isAddWordsDialog, setIsAddWordsDialog] = useState(false);
  const [unknowWords, setUnknownWords] = useState<string[]>([]);
  const [addedWords, setAddedWords] = useState<IWord[]>([]);
  const [content, setContent] = useState<string>("");
  const [isAlertDialog, setIsAlertDialog] = useState(false);
  const { mutate, status } = useMutation({
    mutationKey: ["/text/create"],
    mutationFn: (data: IPostText) => textService.create(data, addedWords),
    onSuccess: (data) => {
      onReset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IPostText>({
    resolver: zodResolver(createTextSchema),
  });

  useEffect(() => {
    setValue("content", content);
    setUnknownWords(
      [...new Set(extractBoldWords(content))].filter(
        (item: string) => !addedWords.some((current) => current.en === item)
      )
    );
  }, [content]);

  const onSubmit = (data: IPostText) => {
    console.log(123);
    setIsAlertDialog(false);
    mutate(data);
  };

  const onChangeContent = (content: string) => {
    setContent(content);
    localStorage.setItem(LOCAL_TEXT_CONTENT_KEY, content);
    setUnknownWords(
      [...new Set(extractBoldWords(content))].filter(
        (item: string) =>
          !addedWords.some((current) => current.en.includes(item))
      )
    );
  };

  useEffect(() => {
    setContent(localStorage.getItem(LOCAL_TEXT_CONTENT_KEY) || "");
  }, []);

  const onHandleContent = () => {
    if (!!unknowWords.length) {
      setIsAlertDialog(true);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const onReset = () => {
    setUnknownWords([]);
    setAddedWords([]);
    setContent("");
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      Object.values(errors).forEach((error) => {
        toast.error(error.message);
      });
    }
  }, [errors]);

  const onSuccessAddWord = (data: IWord) => {
    setUnknownWords((prev) =>
      prev.filter((item: string) => !data.en.includes(item))
    ); // TO DO INCLUDES
    setAddedWords((prev) => [...prev, data]);
  };

  const onErrorCallback = (data: IWordPostDto, error?: string) => {
    setUnknownWords((prev) => prev.filter((item) => !data.en.includes(item)));
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-2">
        <Input
          {...register("name")}
          variant={"dark"}
          placeholder="Write the name in english"
          isError={errors.hasOwnProperty("name")}
          className="mb-8 max-w-48"
        />

        <TextEditor onChange={onChangeContent} initialValue={content} />
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onHandleContent}>Create text</Button>
          <Button
            disabled={unknowWords.length === 0}
            onClick={() => setIsAddWordsDialog(true)}
          >
            Add all words
          </Button>
        </div>
      </div>
      <div className="border-l border-blue-500 px-layout">
        <span>Unknown words:</span>
        <div className="mt-4 flex items-start gap-2 flex-wrap mb-32">
          {unknowWords.map((item: string, idx: number) => {
            return (
              <motion.div
                {...animations.appearance(0.1)}
                className="inline text-white p-2 bg-blue-600 rounded-md leading-6 hover:opacity-80 transition-opacity text-sm"
                key={item}
              >
                {item}
              </motion.div>
            );
          })}
        </div>
        <span>Added words:</span>
        <div className="mt-4 flex gap-2 flex-wrap">
          {addedWords.map((item: IWord, idx: number) => {
            return (
              <motion.div
                {...animations.appearance(0.1)}
                className="inline text-white p-2 bg-blue-600 rounded-md leading-6 hover:opacity-80 transition-opacity text-sm"
                key={item.en}
              >
                <Link href={`${DASHBOARD_PAGES.WORDS}/${item.en}`}>
                  {item.en}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Dialog
        key={unknowWords.length}
        open={isAddWordsDialog && !!unknowWords.length}
      >
        <DialogContent
          onClose={() => setIsAddWordsDialog(false)}
          className="bg-black"
          title="form word"
        >
          <DialogTitle className="text-blue-500 text-center flex gap-4 justify-center">
            <div>Create word</div>-<div>{unknowWords.length}</div>
          </DialogTitle>
          <DialogHeader>
            <WordForm
              en={unknowWords[0]}
              mode="create"
              isToaster={false}
              onSuccessCallback={onSuccessAddWord}
              onErrorCallback={onErrorCallback}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertDialog}>
        <AlertDialogContent
          className="bg-black"
          onClose={() => setIsAlertDialog(false)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to add unknow words?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You can add unknow words to bound it with this text
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="hover:bg-red-500 transition-all hover:border-red-500"
              onClick={() => {
                setIsAlertDialog(false);
                handleSubmit(onSubmit)();
              }}
            >
              Nope
            </AlertDialogCancel>
            <AlertDialogAction
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                setIsAlertDialog(false);
                setIsAddWordsDialog(true);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster expand richColors />
    </div>
  );
}
