import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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

const renderRoutes = (routes: routeItemType[]): any => {
  return routes.map((item: routeItemType) => {
    const routes: any[] = []
    if (item.path && item.component) {
      routes.push(<AsyncComponentRoute key={item.path} exact path={item.path} Component={lazy(() => import('./containers' + item.component))} />)
    } else if (item.redirect) {
      routes.push(
        <Route
          exact
          key={item.path}
          path={item.path}
          render={() => <Redirect to={item.redirect as any} />}
        ></Route>
      );
    }
    if (item.routes && item.routes.length) {
      routes.push(renderRoutes(item.routes))
    } else {
      // return <AsyncComponentRoute key={item.path} exact path={item.path} Component={lazy(() => import('./containers'+item.component))} />
    }
    return routes
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
