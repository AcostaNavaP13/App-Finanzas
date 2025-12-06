import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FinanceManager from '../FinanceManager';
import { vi } from 'vitest';

// Mock crypto.randomUUID
vi.stubGlobal('crypto', {
  randomUUID: () => Math.random().toString(36).substring(2, 15)
});

// Mock window.confirm
vi.stubGlobal('confirm', () => true);

describe('FinanceManager', () => {
  it('renders the component', () => {
    render(<FinanceManager />);
    expect(screen.getByText('Control de')).toBeInTheDocument();
  });

  it('deletes a transaction when the delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<FinanceManager />);

    // Add a transaction
    await user.type(screen.getByPlaceholderText('Concepto'), 'Test Expense');
    await user.type(screen.getByPlaceholderText('$0'), '100');
    await user.click(screen.getByText('Egreso'));
    await user.click(screen.getByLabelText('Add transaction'));

    // Check that the transaction is added
    const transaction = screen.getByText('Test Expense');
    expect(transaction).toBeInTheDocument();

    // Delete the transaction
    const deleteButton = screen.getByLabelText('Delete transaction: Test Expense');
    await user.click(deleteButton);

    // Check that the transaction is removed
    expect(screen.queryByText('Test Expense')).not.toBeInTheDocument();
  });
});
