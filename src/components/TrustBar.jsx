import { TRUST_ITEMS } from '../utils/constants';

// Doubled for seamless loop
const items = [...TRUST_ITEMS, ...TRUST_ITEMS];

const TrustBar = () => (
  <div className="bg-[#F5EDD8] border-y border-[#C9A96E]/20 py-3 overflow-hidden" style={{ contain: 'layout' }}>
    <div className="flex animate-marquee whitespace-nowrap" style={{ willChange: 'transform' }}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block px-8 text-[10px] tracking-[0.25em] uppercase text-[#2C2826]/70 font-sans-ui"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default TrustBar;
