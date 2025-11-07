import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(150)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(50);
    expect(() => account1.transfer(150, account2)).toThrow(
      `Insufficient funds: cannot withdraw more than ${initialBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(30);
    expect(account.getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);

    account1.transfer(30, account2);

    expect(account1.getBalance()).toBe(70);
    expect(account2.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);

    const lodash = jest.requireActual('lodash');
    lodash.random = jest.fn(() => 1);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');

    jest.unmock('lodash');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    const newBalance = 75;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);

    jest.restoreAllMocks();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
    expect(account.getBalance()).toBe(100);

    jest.restoreAllMocks();
  });
});
