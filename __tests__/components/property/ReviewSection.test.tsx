import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ReviewSection from '@/components/property/ReviewSection';

// Mock axios
export const mockReviews = [
  { id: '1', comment: 'Great place!' },
  { id: '2', comment: 'Amazing experience!' },
];

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ReviewSection', () => {
  it('displays loading state initially', () => {
    render(<ReviewSection propertyId="123" />);
    expect(screen.getByText('Loading reviews...')).toBeInTheDocument();
  });

  it('fetches and displays reviews', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockReviews });
    
    render(<ReviewSection propertyId="123" />);
    
    await waitFor(() => {
      expect(screen.getByText('Great place!')).toBeInTheDocument();
      expect(screen.getByText('Amazing experience!')).toBeInTheDocument();
    });
  });

  it('handles API errors', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<ReviewSection propertyId="123" />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching reviews:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });
});
