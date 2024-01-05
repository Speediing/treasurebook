import { logoutShopify } from 'auth/shopify';
import { ReactNode } from 'react';
import { AccountOption } from './AccountOption';

export default async function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-row justify-center text-[11px]">
      <div className="flex h-screen w-full flex-col gap-5 px-5 py-12 md:w-fit md:flex-row">
        <div className="w-full md:w-[312px] ">
          <ul className="space-y-2">
            <li>
              <AccountOption label="ORDERS" href="/account/orders" />
            </li>

            <li>
              <AccountOption label="ACCOUNT DETAILS" href="/account/details" />
            </li>

            <li>
              <form action={logoutShopify}>
                <button className="block text-gray-700 hover:underline" type="submit">
                  LOGOUT
                </button>
              </form>
            </li>
          </ul>
        </div>
        <main className="col-span-2 w-full md:w-[780px] ">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
