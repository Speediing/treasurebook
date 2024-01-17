import { parseBody } from 'next-sanity/webhook';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = (await parseBody<{ _type }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )) as any;

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), { status: 401 });
    }

    if (!body?._type) {
      const message: any = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }
    console.log(body);
    // If the `_type` is `testimonial`, then all `client.fetch` calls with
    // `{next: {tags: ['testimonial']}}` will be revalidated
    if (body._type === 'page') {
      console.log(`${body._type}-${body.slug.current}`);
      revalidateTag(`${body._type}-${body.slug.current}`);
    } else if (body._type === 'product') {
      console.log(`${body._type}-${body.store.slug.current}`);
      revalidateTag(`${body._type}-${body.store.slug.current}`);
    } else {
      console.log(`${body._type}`);
      await revalidateTag(body._type);
    }
    return NextResponse.json({ body });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify(err.message), { status: 500 });
  }
}
