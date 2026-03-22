const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#FCE9F1] to-[#E6DDF8] mb-6" />
    <div className="px-1 space-y-2">
      <div className="h-5 w-3/4 rounded-full bg-[#E6DDF8]/60" />
      <div className="h-3 w-1/3 rounded-full bg-[#FCE9F1]/80" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;
