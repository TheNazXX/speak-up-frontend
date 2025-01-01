export const Sentences = ({ sentences }: { sentences: string[] }) => {
  return (
    <ul className="list-disc pl-6 pb-6">
      {sentences.map((text: string, idx: number) => {
        return <li key={text}>{text}</li>;
      })}
    </ul>
  );
};
