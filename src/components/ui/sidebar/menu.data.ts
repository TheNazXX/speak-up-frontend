import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { IMenuItem } from "./menu.interface";
import { BookAudio, Boxes, SquareUser, Text } from "lucide-react";

export const MenuData: IMenuItem[] = [
  {
    label: "Profile",
    url: DASHBOARD_PAGES.PROFILE,
    icon: SquareUser,
  },
  {
    label: "Words",
    url: DASHBOARD_PAGES.WORDS,
    icon: BookAudio,
  },
  {
    label: "Texts",
    url: DASHBOARD_PAGES.TEXTS,
    icon: Text,
  },
  {
    label: "Units",
    url: DASHBOARD_PAGES.UNITS,
    icon: Boxes,
  },
];
