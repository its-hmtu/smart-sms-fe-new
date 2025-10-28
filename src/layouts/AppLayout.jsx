const { Layout } = require("antd")

const AppLayout = () => {
  return (
    <Layout>
      <Layout.Header></Layout.Header>
      <Layout>
        <Layout.Sider></Layout.Sider>
        <Layout.Content></Layout.Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout;