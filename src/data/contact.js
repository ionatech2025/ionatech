/** @type {import('./schema').ContactInfo} */
export const contact = {
  email: 'ionatec002@gmail.com',
  phone: '',
  address: 'Kampala, Uganda',
  whatsappNumber: '256700966715',
  // NOTE: This access key is read by the frontend during Phase 1 because the contact form
  // posts directly to web3forms from the browser. After Phase 2 the form should post through
  // an /api/contact handler so this value never ships to the client.
  web3formsAccessKey: '059244e1-534a-434e-a22d-7add58b68447',
};
