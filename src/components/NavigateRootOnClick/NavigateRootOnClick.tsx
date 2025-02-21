import { ReactNode, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type NavigateRootOnClickProps = { children: ReactNode };

const NavigateRootOnClick = ({ children }: NavigateRootOnClickProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        navigate('/');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, navigate]);
  return <div ref={ref}>{children}</div>;
};

export default NavigateRootOnClick;
