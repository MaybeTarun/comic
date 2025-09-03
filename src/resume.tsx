import { useEffect } from 'react';

export default function Resume() {
  useEffect(() => {
    window.location.replace('https://drive.google.com/file/d/15owSoVRzK790PvYEza7jn6GHOUDquUAf/view?usp=sharing');
  }, []);
  return null;
}