/** @type {import('./schema').ContactInfo} */
export const contact = {
  email: 'ionatec002@gmail.com',
  phone: '+256767896608',
  phoneAlt: '+256752350470',
  address: 'Kampala, Uganda',
  whatsappNumber: '256767896608',
  // Web3forms access keys are public by design (the form submits directly from the
  // browser). Source from VITE_WEB3FORMS_ACCESS_KEY so the value can be rotated
  // via env without a code change. The hardcoded fallback is the existing key —
  // remove it once the env var is set in all environments.
  web3formsAccessKey:
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '059244e1-534a-434e-a22d-7add58b68447',
};
