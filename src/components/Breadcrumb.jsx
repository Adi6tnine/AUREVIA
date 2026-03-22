import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ crumbs }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-sans-ui text-[#6B6B6B]">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={10} className="opacity-40" />}
          {crumb.path ? (
            <button
              onClick={() => navigate(crumb.path)}
              className="hover:text-[#2C2826] transition-colors"
            >
              {crumb.label}
            </button>
          ) : (
            <span className="text-[#2C2826]">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
