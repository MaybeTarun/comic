import { useEffect } from 'react';

interface RedirectProps {
  href: string;
}

export default function Redirect({ href }: RedirectProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);
  return null;
}