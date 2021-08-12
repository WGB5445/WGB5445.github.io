const resolve = require('path').resolve
module.exports = {
	lang:'zh-CN',
	title:"WGB的小破站",
	description : "分享技术，开源万岁",
  theme:  resolve(__dirname, './theme'),
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
        text: '前端技术',
        children: [
          { text:'HTML',          link:'/front/html'        },
          { text:'CSS',           link:'/front/css'         },
          { text:'JavaScript',    link:'/front/javascript'  },
           '/group/bar.md'],
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
