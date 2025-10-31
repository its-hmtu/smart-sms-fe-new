import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import PATH from './PATH';
import ErrorWrapper from '@/components/common/ErrorWrapper';
import Overview from '@/pages/Overview';
import Login from '@/pages/Login';
import Campaigns from '@/pages/Campaigns';
import Broadcast from '@/pages/Broadcast';
import Blacklist from '@/pages/Blacklist';
import AccountManagement from '@/pages/AccountManagement';
import CampaignReport from '@/pages/Report/CampaignReport';
import OverallReport from '@/pages/Report/OverallReport';
import MessageHistory from '@/pages/Report/MessageHistory';

const useAppRoutes = () => {
  const routes = [
    {
      path: PATH.HOME,
      element: <AppLayout />,
      errorElement: <ErrorWrapper />,
      children: [
        {
          index: true,
          element: <Navigate to={PATH.OVERVIEW} replace />
        },
        {
          path: PATH.OVERVIEW,
          element: <Overview />
        },
        {
          path: PATH.CAMPAIGN,
          element: <Campaigns />
        },
        {
          path: PATH.BROADCAST,
          element: <Broadcast />
        },
        {
          path: PATH.BLACK_LIST,
          element: <Blacklist />
        },
        {
          path: PATH.REPORT.CAMPAIGN_REPORT,
          element: <CampaignReport />,
        },
        {
          path: PATH.REPORT.OVERALL_REPORT,
          element: <OverallReport />
        },
        {
          path: PATH.REPORT.MESSAGE_HISTORY,
          element: <MessageHistory />
        },
        {
          path: PATH.ACCOUNT_MANAGEMENT,
          element: <AccountManagement />
        },
      ]
    },
    {
      path: PATH.LOGIN,
      element: <Login />
    }
  ]

  return createBrowserRouter(routes);
}

export default useAppRoutes;