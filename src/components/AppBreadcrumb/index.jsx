import { Breadcrumb } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import useMediaQuery, { mediaQueryPoints } from '@/hooks/useMediaQuery';
import { getPathUrl } from '@/utils/helper';
import PATH from '@/configs/PATH';
import styled from 'styled-components';

const nonClickableSegmentNames = ['create', 'update', 'edit', 'detail'];
const toBeUppercaseWhiteList = ['sms'];

const formatSegment = (segment) =>
  segment
    .split('-')
    .map((word) => {
      if (toBeUppercaseWhiteList.includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

const AppBreadcrumb = React.memo(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathUrl = useMemo(() => getPathUrl(pathname), [pathname]);
  // const isMobileXsm = useMediaQuery(`(max-width: ${mediaQueryPoints.xsm}px)`);

  const onNavigate = useCallback((e, href, isClickable) => {
    e.preventDefault();
    if (!isClickable) return;

   
    navigate(href);
  }, [navigate]);

  const buildItem = useCallback((key, name, href, isLast, isDynamic) => {
    const label = isDynamic ? 'Detail' : formatSegment(name);
    const isClickable =
      !isLast && !isDynamic && !nonClickableSegmentNames.includes(name.toLowerCase());

    return {
      key,
      title: (
        // <span className={`flex items-center gap-1 ${isMobileXsm ? 'text-xs' : 'text-sm'}`}>
        <span>
          {label}
        </span>
      ),
      href,
      className: classNames(
        isClickable ? 'cursor-pointer hover:text-primary' : 'pointer-events-none',
        isLast && '!text-black'
      ),
      onClick: (e) => onNavigate(e, href, isClickable),
    };
  }, [onNavigate]);

  const breadcrumbItems = useMemo(() => [
    buildItem('dashboard', 'Dashboard', PATH.HOME, false, false),
    ...pathUrl.map((item, index) =>
      buildItem(index, item.name, item.url, index === pathUrl.length - 1, item.isDynamicSegment)
    ),
  ], [pathUrl, buildItem]);

  return <StyledBreadcrumb className="app-breadcrumb" items={breadcrumbItems} />;
});

export default AppBreadcrumb;

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-bottom: 16px;
`;
