import { Button } from '@/components/ui/button';
import { getNavFooterSanity } from '../../sanity/lib/queries/layout';

export default async function Footer() {
  const { footer } = await getNavFooterSanity();

  return (
    <footer className="mt-9 border-t border-gray-300 bg-white px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          {footer.text.map((x) => {
            return (
              <p key={x} className="text-sm text-gray-400">
                {x}
              </p>
            );
          })}
          <p className="mt-2 hidden text-xs text-gray-500 md:flex">{footer.copyright}</p>
        </div>
        <div className="flex flex-col gap-2">
          {footer.links.map((x) => {
            return (
              <a
                key={x._key}
                href={x.url}
                target={x.newWindow ? '_blank' : ''}
                className="text-sm text-gray-900"
              >
                {x.title}
              </a>
            );
          })}
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
          <p className="mt-8 flex text-xs text-gray-500 md:hidden">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
