let menuList = [
  {
    "record_id":"d295cac6-e251-4a7b-960d-d4dc67cd1fa7", // 菜单id
    "name":"首页",
    "sequence":1900000,                                 // 权重
    "icon":"dashboard",
    "router":"/dashboard",
    "hidden":0,
    "parent_id":"",
    "parent_path":"",
    "resources":null,
    "actions":null
  },
  {
    "record_id":"ae2a6385-d736-4193-8547-e57f3212b1d5",
    "name":"系统管理",
    "sequence":1100000,
    "icon":"setting",
    "router":"",
    "hidden":0,
    "parent_id":"",
    "parent_path":"",
    "resources":null,
    "actions":null,
    "children":[
      {
        "record_id":"7b37d01f-337c-4261-b822-7aa15dde1897",
        "name":"菜单管理",
        "sequence":1190000,
        "icon":"solution",
        "router":"/system/menu",
        "hidden":0,
        "parent_id":"ae2a6385-d736-4193-8547-e57f3212b1d5",
        "parent_path":"ae2a6385-d736-4193-8547-e57f3212b1d5",
        "resources":null,
        "actions":[
          {
            "code":"add",
            "name":"新增"
          },
          {
            "code":"edit",
            "name":"编辑"
          },
          {
            "code":"del",
            "name":"删除"
          },
          {
            "code":"query",
            "name":"查询"
          }
        ]
      },
      {
        "record_id":"ae0e4dbf-a455-4d48-b366-421c3adb3120",
        "name":"角色管理",
        "sequence":1180000,
        "icon":"audit",
        "router":"/system/role",
        "hidden":0,
        "parent_id":"ae2a6385-d736-4193-8547-e57f3212b1d5",
        "parent_path":"ae2a6385-d736-4193-8547-e57f3212b1d5",
        "resources":null,
        "actions":[
          {
            "code":"add",
            "name":"新增"
          },
          {
            "code":"edit",
            "name":"编辑"
          },
          {
            "code":"del",
            "name":"删除"
          },
          {
            "code":"query",
            "name":"查询"
          }
        ]
      },
      {
        "record_id":"0494da1e-a223-4f91-a594-cfafdef34f13",
        "name":"用户管理",
        "sequence":1170000,
        "icon":"user",
        "router":"/system/user",
        "hidden":0,
        "parent_id":"ae2a6385-d736-4193-8547-e57f3212b1d5",
        "parent_path":"ae2a6385-d736-4193-8547-e57f3212b1d5",
        "resources":null,
        "actions":[
          {
            "code":"add",
            "name":"新增"
          },
          {
            "code":"edit",
            "name":"编辑"
          },
          {
            "code":"del",
            "name":"删除"
          },
          {
            "code":"query",
            "name":"查询"
          }
        ]
      }
    ]
  }
]
