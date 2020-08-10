import { getLedgers, createLedger } from 'api/ledger';
import { createAccount } from 'api/account';
import { createCategory } from 'api/category';
export default async () => {
  const createRes = await createLedger({ name: 'Default' });
  console.log(createRes);
  const ledgerId = createRes.data.id;

  await createAccount({
    ledgerId,
    name: 'Cash',
    currency: { name: 'NZD', symbol: '$', rate: 1 },
    amount: 0,
  });
  await createAccount({
    ledgerId,
    name: 'Bank',
    currency: { name: 'NZD', symbol: '$', rate: 1 },
    amount: 0,
  });
  await createCategory({
    ledgerId,
    name: 'Food',
    discription: 'Cost for Food',
  });
  await createCategory({
    ledgerId,
    name: 'Supermarket',
    discription: 'Cost for Supermarket',
  });
  return getLedgers;
};
