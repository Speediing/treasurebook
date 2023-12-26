import type { Metadata } from 'next';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({}: { params: { page: string } }): Promise<Metadata> {
  return {
    title: '',
    description: ''
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900">STEPHEN J</h1>
        </div>
        <div className="mx-auto mt-8 max-w-4xl">
          <img
            alt="Abstract bubbles"
            className="h-auto w-full bg-gray-300"
            height="400"
            src="/placeholder.svg"
            style={{
              aspectRatio: '800/400',
              objectFit: 'cover'
            }}
            width="800"
          />
        </div>
      </div>
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">STEPHEN J</h2>
          <p className="mt-4 text-gray-600">
            Stephen J is a Canadian luxury, artisan hair care and lifestyle brand founded in Calgary
            in 2019 by Stephen James, with the hope of changing the perspective and habits of the
            beauty and fashion industry.
          </p>
          <p className="mt-4 text-gray-600">
            Stephen J is challenging the industry and adopters to view hair as a persona, a
            reflection of ones ambitions and a true narrative of oneself through self acceptance,
            coining the phrase LET HAIR BE HAIR.
          </p>
          <p className="mt-4 text-gray-600">
            Our goal is to design formulations using the most beneficial and healthy ingredients.
            The belief is to change the perspective of plant-based products and show the power that
            authentic emotions and thoughtful design can bring to a noise filled industry.
          </p>
          <p className="mt-4 text-gray-600">
            Our team believes that adding products to an industry should be done with care and not
            filling shelves with new ideas unless they are transformative and healthy in their
            approach.
          </p>
          <p className="mt-4 italic text-gray-600">
            Our products are a perfect coming-together of customer, hair stylist, passion, and
            dedication.
          </p>
          <p className="mt-4 text-gray-600">
            We believe that through our constant efforts in creating products engineered by plants
            and our passion for helping the industry, we can make a meaningful change and a timeless
            affect in peoples lives.
          </p>
        </div>
      </div>
    </div>
  );
}
