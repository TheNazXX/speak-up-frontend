import { IWord } from "@/app/(pages)/words/model/types/word.types";
import { motion } from "framer-motion";
import Word from "./Word";
import { animations } from "@/lib/motion";

export default function WordsList({ data }: { data: IWord[] }) {
  return (
    <div className="flex gap-2.5 flex-wrap gap-y-8">
      {data.map((item, idx) => (
        <motion.div key={item.en} {...animations.appearance(idx * 0.1)}>
          <Word item={item} />
        </motion.div>
      ))}
    </div>
  );
}
