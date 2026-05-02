import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'HopliteRoyale',
  titleTemplate: ':title · HopliteRoyale 文档',
  description: '斯巴达风格 Minecraft 大逃杀插件 · 玩家与服主上手指南',
  base: '/hopliteroyale-docs/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['meta', { name: 'theme-color', content: '#c14a2a' }],
    ['meta', { property: 'og:title', content: 'HopliteRoyale · 斯巴达大逃杀' }],
    ['meta', { property: 'og:description', content: '从开服到上分,玩家与服主都能 3 分钟上手的大逃杀插件文档。' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'HopliteRoyale',
    nav: [
      { text: '首页', link: '/' },
      { text: '玩家手册', link: '/guide/player-quickstart' },
      { text: '服主指南', link: '/guide/owner-quickstart' },
      { text: '参考资料', link: '/guide/commands' },
      { text: '常见问题', link: '/guide/faq' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '🛡️  开始',
          collapsed: false,
          items: [
            { text: '项目简介', link: '/guide/overview' },
            { text: '玩家 · 3 分钟上手', link: '/guide/player-quickstart' },
            { text: '服主 · 5 分钟开服', link: '/guide/owner-quickstart' }
          ]
        },
        {
          text: '⚔️  玩法',
          collapsed: false,
          items: [
            { text: '比赛七阶段', link: '/guide/phases' },
            { text: '组队模式（单/双/四排）', link: '/guide/team-modes' },
            { text: '职业系统', link: '/guide/kits' },
            { text: '传奇武器', link: '/guide/legendaries' },
            { text: '奖励钩子与外部接入', link: '/guide/battlepass' }
          ]
        },
        {
          text: '🧰  服主与运维',
          collapsed: false,
          items: [
            { text: '安装部署', link: '/guide/install' },
            { text: '地图与赛场', link: '/guide/arenas' },
            { text: '配置参考', link: '/guide/configuration' },
            { text: '日常运维', link: '/guide/operations' }
          ]
        },
        {
          text: '📖  参考',
          collapsed: false,
          items: [
            { text: '命令速查', link: '/guide/commands' },
            { text: '常见问题', link: '/guide/faq' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kzheart/hopliteroyale-docs' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除查询',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    footer: {
      message: '公开文档仓库 · 仅发布使用与运维说明,不发布插件源码',
      copyright: '© 2026 kzheart · Built with VitePress'
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '← 上一篇',
      next: '下一篇 →'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    langMenuLabel: '语言'
  }
})