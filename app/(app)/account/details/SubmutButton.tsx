'use client';
import { Button } from '@/components/ui/button';
import LoadingDots from 'components/loading-dots';
// @ts-ignore
import { useFormStatus } from 'react-dom';

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full rounded-none bg-black text-white"
      variant={'default'}
    >
      {pending ? <LoadingDots className="left-0 bg-white" /> : 'Save'}
    </Button>
  );
};
