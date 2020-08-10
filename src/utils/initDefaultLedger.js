import { getLedgers, createLedger, createDefaultLedger } from 'api/ledger';
import { createAccount } from 'api/account';
import { createCategory } from 'api/category';
export default async () => {
  const createRes = await createDefaultLedger();
  console.log(createRes);

  return createRes;
};
