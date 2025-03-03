import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

type NavigateRootOnClickOursideProps = { children: ReactNode };

const NavigateRootOnClickOurside = ({
  children,
}: NavigateRootOnClickOursideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        router.push('/');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, router]);

  return <div ref={ref}>{children}</div>;
};

export default NavigateRootOnClickOurside;
