export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div
        className={`p-2 mb-6 bg-white/[.05] border border-white/[.2] rounded-lg backdrop-filter-[32px] flex-1 flex flex-col ${className}`}
      >
        {children}
      </div>
    </>
  );
}
