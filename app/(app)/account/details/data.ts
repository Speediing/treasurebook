import { getCustomer } from 'lib/shopify';

export const getAccountDetails = async () => {
  let shopifyDetails;
  try {
    shopifyDetails = await getCustomer({});
  } catch (error) {
    console.log(error);
  }
  return shopifyDetails;
};
