import styled from "styled-components"
import { Spin } from "antd"

function LoadingFallback() {
  return (
    <LoadingWrapper>
      <Spin tip="Loading..." size="large" />
    </LoadingWrapper>
  )
}

export default LoadingFallback;

const LoadingWrapper = styled.div`
  height: 100vh;
  position: relative;
  z-index: 9999;
`