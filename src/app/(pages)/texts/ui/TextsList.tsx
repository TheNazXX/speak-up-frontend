import { Button } from "@/components/ui/button";
import { IText } from "../model/types/text.types";
import { CornerUpRight } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function TextList({ data }: { data: IText[] }) {
  return (
    <div className="flex flex-wrap gap-6">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="group border border-blue-500 rounded-lg p-3 w-60 h-40 bg-black relative overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between">
              <span className="border-b border-blue-500 px-2 pb-1">
                {item.name}
              </span>
              <Link href={`${DASHBOARD_PAGES.TEXTS}/${item.name}`}>
                <CornerUpRight className="text-blue-500" />
              </Link>
            </div>

            <div
              className="text-[12px]/[15px] line-clamp-4 mt-auto mb-2 px-2 text-blue-400 h-[60px]"
              dangerouslySetInnerHTML={{
                __html: item.content,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
