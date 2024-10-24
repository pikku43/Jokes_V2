import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JokesForm from './jokesForm';
import '@testing-library/jest-dom';

describe('JokesForm', () => {
  const onSubmit = jest.fn();
  const setErrorMessage = jest.fn();
  const errorMessage = '';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with a label and input field', () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    expect(screen.getByLabelText('Number of jokes:')).toBeInTheDocument();
    expect(screen.getByText('Get Jokes')).toBeInTheDocument();
  });

  it('calls onSubmit with the correct count when the form is submitted', async () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = screen.getByLabelText('Number of jokes:');
    await userEvent.type(inputField, '5');
    await userEvent.click(screen.getByText('Get Jokes'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(5);
  });

  it('displays an error message when the input is invalid', async () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = screen.getByLabelText('Number of jokes:');
    await userEvent.type(inputField, '15');
    await userEvent.click(screen.getByText('Get Jokes'));

    expect(await screen.findByText('Please enter a value between 1 and 10')).toBeInTheDocument();
  });

  it('clears the error message when the input is valid', async () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage="Please enter a value between 1 and 10" setErrorMessage={setErrorMessage} />
    );

    const inputField = screen.getByLabelText('Number of jokes:');
    await userEvent.type(inputField, '5');
    await userEvent.click(screen.getByText('Get Jokes'));

    expect(screen.queryByText('Please enter a value between 1 and 10')).not.toBeInTheDocument();
  });

  it('handles invalid input types', async () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = screen.getByLabelText('Number of jokes:');
    await userEvent.type(inputField, 'abc');
    await userEvent.click(screen.getByText('Get Jokes'));

    expect(await screen.findByText('Please enter a valid number')).toBeInTheDocument();
  });

  it('handles empty input', async () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    await userEvent.click(screen.getByText('Get Jokes'));

    expect(await screen.findByText('Please enter a value')).toBeInTheDocument();
  });

  it('handles input value outside of range', async () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = screen.getByLabelText('Number of jokes:');
    await userEvent.type(inputField, '15');
    await userEvent.click(screen.getByText('Get Jokes'));

    expect(await screen.findByText('Please enter a value between 1 and 10')).toBeInTheDocument();
  });

  it('disables the button when the input field is empty', async () => {
    render(
      <JokesForm onSubmit={onSubmit} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    );

    const inputField = screen.getByLabelText('Number of jokes:');
    const button = screen.getByText('Get Jokes');

    expect(button).toBeDisabled();

    await userEvent.type(inputField, '5');
    expect(button).not.toBeDisabled();
  });

});