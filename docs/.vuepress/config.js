module.exports = {
	lang:'zh-CN',
	title:"WGB的小破站",
	description : "分享技术，开源万岁",
	themeConfig: {
    		logo: 'https://vuejs.org/images/logo.png',
		navbar: [
      // NavbarItem
      {
        text: 'Foo',
        link: '/foo/',
      },
      // NavbarGroup
      {
        text: 'Group',
        children: [{text:'foo.md',link:'/group/foo.md'}, '/group/bar.md'],
      },
      // 字符串 - 页面文件路径
      '/bar/README.md',
    ],
    sidebar: {
      '/front': [
        {
          text: '前端目录',
          children: [
            { text:'CSS', link:'/front/css/'}, 
            { text:'HTML', link:'/front/html/'}, 
            { text:'JavaScript', link:'/front/javascript/'}, 
            { text:'Vue', link:'/front/vue/'}, 
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          children: ['/reference/cli.md', '/reference/config.md'],
        },
      ],
    },
  	},
}
