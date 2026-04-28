import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'HopliteRoyale',
  description: 'Hoplite 风格 Minecraft Battle Royale 插件公开文档',
  base: '/hopliteroyale-docs/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['meta', { name: 'theme-color', content: '#17120d' }],
    ['meta', { property: 'og:title', content: 'HopliteRoyale 文档' }],
    ['meta', { property: 'og:description', content: 'Hoplite 风格 Battle Royale 插件的公开使用与运维文档' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/overview' },
      { text: '命令', link: '/guide/commands' },
      { text: '配置', link: '/guide/configuration' },
      { text: '运维', link: '/guide/admin-ops' }
    ],
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '项目概览', link: '/guide/overview' },
          { text: '安装部署', link: '/guide/install' },
          { text: '玩法流程', link: '/guide/gameplay' },
          { text: '命令参考', link: '/guide/commands' }
        ]
      },
      {
        text: '系统说明',
        items: [
          { text: '配置参考', link: '/guide/configuration' },
          { text: '地图与比赛', link: '/guide/arenas' },
          { text: 'Kit 职业', link: '/guide/kits' },
          { text: '传奇武器', link: '/guide/legendaries' },
          { text: 'Battle Pass 与外观', link: '/guide/battlepass-cosmetics' }
        ]
      },
      {
        text: '维护',
        items: [
          { text: '服主管理', link: '/guide/admin-ops' },
          { text: '常见问题', link: '/guide/faq' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kzheart/hopliteroyale-docs' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: '公开文档仓库只发布使用说明，不发布插件源码。',
      copyright: 'Copyright © 2026 kzheart'
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  }
})
