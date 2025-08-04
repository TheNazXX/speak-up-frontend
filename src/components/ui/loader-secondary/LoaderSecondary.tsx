export const LoaderSecondary = ({ className }: { className?: string }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      <div className="w-2 h-2 bg-gray rounded-full animate-scale-pulse" />
      <div
        className="w-2 h-2 bg-gray rounded-full animate-scale-pulse"
        style={{ animationDelay: '200ms' }}
      />
      <div
        className="w-2 h-2 bg-gray rounded-full animate-scale-pulse delay-200"
        style={{ animationDelay: '400ms' }}
      />
    </div>
  );
};
