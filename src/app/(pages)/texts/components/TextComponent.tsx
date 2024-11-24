"use client";

import { useEffect, useRef } from "react";
import { IText } from "../model/types/text.types";
import { format } from "date-fns";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export default function TextComponent({ data }: { data: IText }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const boldElements = contentRef.current.querySelectorAll("strong");

      boldElements.forEach((element) => {
        const linkElement = document.createElement("a");

        linkElement.classList.add(
          "text-blue-500",
          "border-b",
          "border-blue-500",
          "hover:border-blue-600",
          "hover:text-blue-600",
          "transition-all"
        );

        linkElement.href = `${DASHBOARD_PAGES.WORDS}/${element.innerText}`;
        linkElement.innerHTML = element.innerHTML;
        element.replaceWith(linkElement);
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-between items-center mb-10 text-[24px]/[27px] text-blue-500">
        <div className="flex items-center">
          <h2 className="">{data.name}</h2>
          <Link href={DASHBOARD_PAGES.TEXTS_EDIT} className="p-1">
            <Edit className="hover:text-blue-600 transition-colors" />
          </Link>
        </div>
        <div>{format(new Date(data.createAt), "dd/MM/yyyy")}</div>
      </div>
      <div
        className="pb-8 mb-8 border-b border-blue-400"
        ref={contentRef}
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      ></div>

      <ul className="">
        {data.words.map((item) => {
          return (
            <li className="flex items-center text-[18px]/[24px] mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
              <Link
                href={`${DASHBOARD_PAGES.WORDS}/${item.en}`}
                className="text-blue-500 hover:text-blue-600 transition-colors mr-2 border-b border-blue-500"
              >
                {item.en}
              </Link>
              <span className="mr-2">-</span>
              <span>{item.translate.join(", ")}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
