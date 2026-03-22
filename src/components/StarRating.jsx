const StarRating = ({ rating, reviewCount, size = 'sm' }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    return { filled, partial };
  });

  const starSize = size === 'sm' ? 'text-[10px]' : 'text-sm';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {stars.map((s, i) => (
          <span
            key={i}
            className={`${starSize} ${
              s.filled
                ? 'text-[#C9A96E]'
                : s.partial
                ? 'text-[#C9A96E]/50'
                : 'text-[#D4C5B0]'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-[10px] text-[#6B6B6B] font-sans-ui tracking-wide">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default StarRating;
