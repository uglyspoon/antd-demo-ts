import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from 'containers/user/login';
import Loading from 'components/Loading';
import UserLayout from 'layouts/UserLayout';
import BasicLayout from 'layouts/BasicLayout';
import { routeItemType } from 'layouts/BasicLayout';
import routes from 'routes';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const AppRoute = ({ Component, Layout, ...rest }: { Component: any, Layout: any, [k: string]: any }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    </Layout>
  )} />
)

const AsyncComponentRoute = ({ Component, ...rest }: { Component: any, [k: string]: any }) => (
  <Route {...rest} render={props => (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    )}
  />
)

const renderRoutes = (routes: routeItemType[]):any => {
  return routes.map((item: routeItemType) => {
    if (item.routes && item.routes.length) {
      return renderRoutes(item.routes)
    } else {
      // return <AppRoute key={item.path} exact path={item.path} Layout={BasicLayout} Component={lazy(() => import('./containers'+item.path))} />
      return <AsyncComponentRoute key={item.path} exact path={item.path} Component={lazy(() => import('./containers'+item.path))} />

    }
  })
}
const RouterApp = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <AppRoute exact path="/user/login" Layout={UserLayout} Component={Login} />
          <BasicLayout>
            {renderRoutes(routes)}
          </BasicLayout>
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default RouterApp;
