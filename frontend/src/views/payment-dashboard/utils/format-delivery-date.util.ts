export const formatDeliveryDate = (deliveryDate: Date, text: string): string => {
  if (!deliveryDate) {
    return 'Unfinished Request';
  }
  const date = new Date(deliveryDate);
  const formatDate = new Intl.DateTimeFormat('de-CH', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(
    date,
  );
  return `${text} ${formatDate}`;
};
