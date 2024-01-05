import customerFragment from '../fragments/customer';

export const updateCustomerMutation = /* GraphQL */ `
  mutation customerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        ...customer
      }
      userErrors {
        field
        message
        code
      }
    }
  }
  ${customerFragment}
`;
