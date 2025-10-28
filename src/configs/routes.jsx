import AppLayout from '@/layouts/AppLayout';
import PATH from './PATH';

const useAppRoutes = () => {
  const routes = [
    {
      path: PATH.HOME,
      element: <AppLayout />,
      errorElement: <ErrorWrapper />,
      children: [
        {
          index: true,
        }
      ]
    }
  ]

  return routes;
}