import { IWord } from "@/app/(pages)/words/model/types/word.types";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";

export default function Word({ item }: { item: IWord }) {
  return (
    <Link
      className="text-white p-2 bg-blue-600 rounded-md leading-6 hover:opacity-80 transition-opacity text-sm"
      href={`${DASHBOARD_PAGES.WORDS}/${item.en}`}
    >
      {item.en}
    </Link>
  );
}
