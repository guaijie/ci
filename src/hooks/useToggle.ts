import { useRef, useState } from 'react';

function useToggle(
  defaultValue?: boolean
): [boolean, { toggle: (v?: boolean) => void }] {
  const [state, setState] = useState(
    defaultValue === undefined ? false : defaultValue
  );
  const ref = useRef({
    toggle(v?: boolean) {
      setState((state) => {
        return v === undefined ? !state : v;
      });
    },
  });
  return [state, ref.current];
}

export default useToggle;
