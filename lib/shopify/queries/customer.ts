export const getCustomerQuery = /* GraphQL */ `
  query customer {
    customer {
      emailAddress {
        emailAddress
      }
      firstName
      lastName
      phoneNumber {
        phoneNumber
      }
    }
  }
`;
