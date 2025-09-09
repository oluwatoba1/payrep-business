type STATUSES = 'successful' | 'pending' | 'failed';

interface IEarningsData {
  id: string;
  title: string;
  cardType: 'commission' | 'bonus';
  action: () => void;
}

interface INotification {
  title: string;
  description: string;
  time: string;
  read: boolean;
}
