import { Input } from '@/components/ui/input';
import { updateCustomer } from 'lib/shopify';
import { revalidatePath } from 'next/cache';
import { SubmitButton } from './SubmutButton';
import { getAccountDetails } from './data';
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
export const runtime = 'edge';
const updateCustomerDetails = async (data: FormData) => {
  'use server';
  const firstName = data.get('firstName')?.toString();
  const lastName = data.get('lastName')?.toString();
  await updateCustomer({ firstName, lastName });
  revalidatePath('/account/details');
};
export default async function DetailPage() {
  const account = await getAccountDetails();

  return (
    <div className="">
      <h1 className="mb-5 font-bold">ACCOUNT DETAILS</h1>
      <form className="max-w-[384px] space-y-6" action={updateCustomerDetails}>
        <div className="flex flex-col">
          <label className="" htmlFor="email">
            {account?.emailAddress}
          </label>
        </div>
        <div className="flex flex-col">
          <Input
            name="firstName"
            id="firstName"
            className="px-2"
            placeholder="First Name"
            defaultValue={account?.firstName}
          />
        </div>
        <div className="flex flex-col">
          <Input
            name="lastName"
            id="lastName"
            className="px-2"
            placeholder="Last Name"
            defaultValue={account?.lastName}
          />
        </div>

        {/* <div className="flex flex-col">
          <Input id="phone" placeholder="Phone Number" defaultValue={phoneNumber} />
        </div> */}
        <SubmitButton />
      </form>
    </div>
  );
}
