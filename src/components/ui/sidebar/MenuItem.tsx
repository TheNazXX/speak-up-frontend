import Link from "next/link";
import { IMenuItem } from "./menu.interface";
import { clsx } from "clsx";

export default function MenuItem({
  item,
  className = "",
}: {
  item: IMenuItem;
  className?: string;
}) {
  return (
    <Link
      href={item.url}
      className={clsx(
        className,
        "flex items-center gap-2.5 animate-opacity cursor-pointer py-2.5 px-layout transition-colors hover:bg-primaryLight text-sm"
      )}
    >
      <item.icon />
      <span>{item.label}</span>
    </Link>
  );
}
