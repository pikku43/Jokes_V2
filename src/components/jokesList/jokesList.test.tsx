import { render, screen } from '@testing-library/react';
import JokesList from './jokesList';

describe('JokesList', () => {
  it('renders a list of jokes', () => {
    const jokes = [
      { id: 1, question: 'What is the best programming language?', answer: 'JavaScript' },
      { id: 2, question: 'Why did the scarecrow win an award?', answer: 'Because he was outstanding in his field' },
    ];

    render(<JokesList jokes={jokes} errorMessage="" />);

    expect(screen.getByText('What is the best programming language?')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Why did the scarecrow win an award?')).toBeInTheDocument();
    expect(screen.getByText('Because he was outstanding in his field')).toBeInTheDocument();
  });

  it('renders a message when there are no jokes', () => {
    render(<JokesList jokes={[]} errorMessage="" />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders a message when there is an error', () => {
    render(<JokesList jokes={[]} errorMessage="Error message" />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders a list of jokes with unique keys', () => {
    const jokes = [
      { id: 1, question: 'What is the best programming language?', answer: 'JavaScript' },
      { id: 2, question: 'Why did the scarecrow win an award?', answer: 'Because he was outstanding in his field' },
    ];

    render(<JokesList jokes={jokes} errorMessage="" />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveAttribute('key', '1');
    expect(listItems[1]).toHaveAttribute('key', '2');
  });
});