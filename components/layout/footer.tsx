import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="mt-9 border-t border-gray-300 bg-white px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-400">Artisan hair care and styling brand.</p>
          <p className="mt-2 text-sm text-gray-400">Made in Canada.</p>
          <p className="mt-2 text-sm text-gray-400">Botanically Based.</p>
          {/* <div className="flex mt-4 space-x-4">
            <PinIcon className="w-6 h-6 text-gray-600" />
            <InstagramIcon className="w-6 h-6 text-gray-600" />
            <YoutubeIcon className="w-6 h-6 text-gray-600" />
          </div> */}
          <p className="mt-4 hidden text-xs text-gray-500 md:flex">
            © 2023, STEPHEN J Powered by Shopify
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-900">Pinterest</p>
          <p className="mt-2 text-sm text-gray-900">Instagram</p>
          <p className="mt-2 text-sm text-gray-900">Youtube</p>
          {/* <div className="flex mt-4 space-x-4">
            <PinIcon className="w-6 h-6 text-gray-600" />
            <InstagramIcon className="w-6 h-6 text-gray-600" />
            <YoutubeIcon className="w-6 h-6 text-gray-600" />
          </div> */}
          {/* <p className="mt-4 text-xs text-gray-500">© 2023, STEPHEN J Powered by Shopify</p> */}
        </div>
        <div className="flex flex-col justify-start">
          <h2 className="text-lg font-semibold">Newsletter</h2>
          <form className="flex ">
            <input
              aria-label="Email address"
              className="flex-grow border-b border-gray-900 py-2 pr-4 text-sm placeholder-gray-400 focus:outline-none"
              placeholder="Email address"
              type="email"
            />
            <Button className="ml-4 rounded-none border border-gray-900">Subscribe</Button>
          </form>
          <p className="mt-8 flex text-xs text-gray-500 md:hidden">
            © 2023, STEPHEN J Powered by Shopify
          </p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="17" y2="22" />
      <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
    </svg>
  );
}

function YoutubeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
