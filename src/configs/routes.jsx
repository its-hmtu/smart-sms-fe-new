import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppLayout from '@/layouts/AppLayout';
import PATH from './PATH';
import ErrorWrapper from '@/components/common/ErrorWrapper';
import LoadingFallback from '@/components/common/LoadingFallback';

// Lazy load page components
const Overview = lazy(() => import('@/pages/Overview'));
const Login = lazy(() => import('@/pages/Login'));
const Campaigns = lazy(() => import('@/pages/Campaigns'));
const Broadcast = lazy(() => import('@/pages/Broadcast'));
const Blacklist = lazy(() => import('@/pages/Blacklist'));
const AccountManagement = lazy(() => import('@/pages/AccountManagement'));
const CampaignReport = lazy(() => import('@/pages/Report/CampaignReport'));
const OverallReport = lazy(() => import('@/pages/Report/OverallReport'));
const MessageHistory = lazy(() => import('@/pages/Report/MessageHistory'));
const AddCampaign = lazy(() => import('@/pages/Campaigns/AddCampaign'));

// Wrapper component with Suspense
const LazyWrapper = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

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
          element: <LazyWrapper><Overview /></LazyWrapper>
        },
        {
          path: PATH.CAMPAIGN.ROOT,
          element: <LazyWrapper><Campaigns /></LazyWrapper>
        },
        {
          path: PATH.CAMPAIGN.CREATE_CAMPAIGN,
          element: <LazyWrapper><AddCampaign /></LazyWrapper>
        },
        {
          path: PATH.BROADCAST,
          element: <LazyWrapper><Broadcast /></LazyWrapper>
        },
        {
          path: PATH.BLACK_LIST,
          element: <LazyWrapper><Blacklist /></LazyWrapper>
        },
        {
          path: PATH.REPORT.CAMPAIGN_REPORT,
          element: <LazyWrapper><CampaignReport /></LazyWrapper>,
        },
        {
          path: PATH.REPORT.OVERALL_REPORT,
          element: <LazyWrapper><OverallReport /></LazyWrapper>
        },
        {
          path: PATH.REPORT.MESSAGE_HISTORY,
          element: <LazyWrapper><MessageHistory /></LazyWrapper>
        },
        {
          path: PATH.ACCOUNT_MANAGEMENT,
          element: <LazyWrapper><AccountManagement /></LazyWrapper>
        },
      ]
    },
    {
      path: PATH.LOGIN,
      element: <LazyWrapper><Login /></LazyWrapper>
    },
    {
      path: '*',
      element: <ErrorWrapper status='403' />
    }
  ]

  return createBrowserRouter(routes);
}

export default useAppRoutes;