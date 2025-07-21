export const navigateByRole = (navigate: (path: string) => void, role: string): void => {
  switch (role) {
    case 'ADMIN':
      navigate('/admin/events');
      break;
    case 'PUBLICUSER':
      navigate('/user/events');
      break;
    default:
      navigate('/unauthorized'); 
      break;
  }
};
