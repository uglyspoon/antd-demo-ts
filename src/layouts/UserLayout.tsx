import React from 'react';
import styles from './UserLayout.module.less';
import logo from '../assets/logo.svg';

class UserLayout extends React.PureComponent {
  componentDidMount = () => {
    window.document.title = '体测管理后台'
  }
  getPageTitle() {
    let title = '华讯统一认证系统';
    return title;
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.lang}></div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>体测管理后台</span>
              </div>
              <div className={styles.desc}>上海大白网络系统有限公司统一登陆认证系统</div>
            </div>
            {children}
          </div>
        </div>
    );
  }
}

export default UserLayout;
