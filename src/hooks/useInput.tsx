import { useState } from 'react';
import Input from '@/components/atoms/Input';

interface UserInputType extends React.InputHTMLAttributes<HTMLInputElement> {
  initValue?: string;
}

const useInput = ({ initValue, ...props }: UserInputType) => {
  const [value, setValue] = useState(initValue ?? '');
  const input = <Input value={value} onChange={e => setValue(e.target.value)} {...props} />;
  return [value, input, setValue] as const;
};

export const useInputText = (options: Parameters<typeof useInput>[0]) => useInput({ type: 'text', ...options });

export default useInput;
