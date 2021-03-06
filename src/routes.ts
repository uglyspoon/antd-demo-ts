const routes = [
  {
    path: "/welcome",
    name: "欢迎",
    icon: "smile",
    component: "/welcome"
  },
  {
    path: "/pmscore",
    name: "体测管理",
    icon: "pie-chart",
    routes: [
      {
        path: "/pmscore",
        redirect: "/pmscore/profile"
      },
      {
        name: "成绩概览",
        path: "/pmscore/profile",
        icon: "bar-chart",
        component: "/pmscore/profile/index"
      },
      {
        name: "体测记录",
        path: "/pmscore/record",
        icon: "line-chart",
        component: "/pmscore/record/index"
      }
    ]
  },
  {
    path: "/plan",
    name: "体测计划",
    icon: "info-circle",
    component: "/plan",
    routes: [
      {
        path: "/plan/add",
        name: "添加体测计划",
        icon: "info-circle",
        component: "/plan/add",
        hideInMenu: true
      },
      {
        path: "/plan/detail/:sn",
        name: "体测计划详情",
        icon: "info-circle",
        component: "/plan/detail",
        hideInMenu: true
      }
    ]
  },
  {
    path: "/video",
    name: "体测视频",
    icon: "video-camera",
    component: "/video"
  },
  {
    path: "/studentinfo",
    name: "学生信息",
    icon: "info-circle",
    component: "/studentinfo",
    routes: [
      {
        path: "/studentinfo/:id",
        name: "学生信息",
        component: "/studentinfo/detail",
        hideInMenu: true
      }
    ]
  },
  {
    path: "/setting",
    name: "账号设置",
    icon: "setting",
    routes: [
      {
        path: "/setting",
        redirect: "/setting/management"
      },
      {
        name: "子账号管理",
        path: "/setting/management",
        icon: "bar-chart",
        component: "/setting/management"
      }
    ]
  }
];

export {routes as default};
