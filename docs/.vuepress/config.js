const { path } = require('@vuepress/utils')
module.exports = {
	lang:'zh-CN',
	title:"WGB的小破站",
	description : "分享技术，开源万岁",

  theme:  path.resolve(__dirname, './theme'),

	themeConfig: {

    		logo: 'https://vuejs.org/images/logo.png',
        contributorsText:"贡献者是",
        lastUpdatedText:"最后修改于",
        notFound:[
          "对不起,页面不见了",
          "无敌的我，迷路了...",
        ],
        backToHome:"点我回主页吧",
        navbar: [
        // NavbarItem
        {
          text: '首页',
          link: '/',
        },
        // NavbarGroup
        {
          text: '前端技术',
          activeMatch: '^/front/',
          children: [
            { text:'HTML',          link:'/front/html'        },
            { text:'CSS',           link:'/front/css'         },
            { text:'JavaScript',    link:'/front/javascript'  },
            { text:'Vue',           link:'/front/vue'         },
          ],
         
        },
      // 字符串 - 页面文件路径
      
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
  plugins: [
      [
        '@vuepress/register-components',
        {
          componentsDir: path.resolve(__dirname, './components'),
        },
      ],
    ],
}
