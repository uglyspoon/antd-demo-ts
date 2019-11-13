const routes = [
  // {
  //   path: "/welcome",
  //   name: "欢迎",
  //   icon: "smile",
  //   component: "/welcome"
  // },
  {
    path: "/pmscore",
    name: "体测成绩",
    icon: "line-chart",
    routes: [
      {
        path: "/pmscore",
        redirect: "/pmscore/profile"
      },
      {
        name: "成绩分析",
        path: "/pmscore/profile",
        // icon: "bar-chart",
        component: "/pmscore/profile/index"
      },
      // {
      //   name: "体测记录",
      //   path: "/pmscore/record",
      //   // icon: "pie-chart",
      //   component: "/pmscore/record/index"
      // }
    ]
  },
  {
    path: "/plan",
    name: "体测计划",
    icon: "container",
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
    icon: "user",
    component: "/studentinfo",
    routes: [
      {
        path: "/studentinfo/:id",
        name: "学生信息",
        component: "/studentinfo/detail",
        hideInMenu: true,
        routes: [
          {
            path: "/studentinfo/:id/testreport",
            name: "学生测试报告",
            component: "/studentinfo/testReport",
            hideInMenu: true,
          },
          {
            path: "/studentinfo/:id/gradeanalysis",
            name: "学生成绩分析",
            component: "/studentinfo/gradeAnalysis",
            hideInMenu: true,
          },
          {
            path: "/studentinfo/:id/physicalreport",
            name: "学生体质报告",
            component: "/studentinfo/physicalReport",
            hideInMenu: true,
          },
          {
            path: "/studentinfo/:id/profile",
            name: "学生成绩单",
            component: "/studentinfo/profile",
            hideInMenu: true,
          },
        ]
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

export { routes as default };
