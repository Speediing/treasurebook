import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="py-y my-9 border-t border-gray-300 bg-white p-4 sm:p-6">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-600">Artisan hair care and styling brand.</p>
          <p className="mt-2 text-sm text-gray-600">Made in Canada.</p>
          <p className="mt-2 text-sm text-gray-600">Botanically Based.</p>
          <div className="mt-4 flex space-x-4">
            <PinIcon className="h-6 w-6 text-gray-600" />
            <InstagramIcon className="h-6 w-6 text-gray-600" />
            <YoutubeIcon className="h-6 w-6 text-gray-600" />
          </div>
          <p className="mt-4 text-xs text-gray-500">© 2023, STEPHEN J Powered by Shopify</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Newsletter</h2>
          <form className="mt-4 flex">
            <input
              aria-label="Email address"
              className="flex-grow border-b-2 border-gray-300 px-4 py-2 text-sm placeholder-gray-400 focus:outline-none"
              placeholder="Email address"
              type="email"
            />
            <Button className="ml-4">Subscribe</Button>
          </form>
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
