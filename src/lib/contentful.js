import 'server-only'

import { cache } from 'react'

// --- MULAI DATA DUMMY ---

const dummyPost = {
  title: 'Judul Postingan Dummy',
  slug: 'postingan-dummy',
  date: new Date().toISOString(),
  sys: {
    firstPublishedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  seo: {
    title: 'SEO Judul Postingan Dummy',
    description: 'Ini adalah deskripsi SEO untuk postingan dummy.'
  },
  content: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Ini adalah konten paragraf dari data dummy. Aplikasi sekarang tidak lagi memanggil Contentful.',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    },
    links: {
      assets: { block: [] },
      entries: { inline: [] }
    }
  }
}

const dummyPage = {
  title: 'Judul Halaman Dummy',
  slug: 'halaman-dummy',
  hasCustomPage: false,
  sys: {
    id: 'dummy-page-id',
    firstPublishedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  content: dummyPost.content, // Kita bisa pakai ulang konten post
  seo: {
    title: 'SEO Judul Halaman Dummy',
    description: 'Deskripsi untuk halaman dummy.'
  }
}

const dummyLogbook = [
  {
    title: 'Memulai Proyek Keren',
    date: new Date().toISOString(),
    description: 'Hari ini memulai proyek baru menggunakan Next.js dan Tailwind CSS. Sangat menyenangkan!',
    image: null
  },
  {
    title: 'Memperbaiki Bug',
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    description:
      'Menghabiskan beberapa jam untuk memperbaiki bug terkait environment variables. Akhirnya berhasil dengan data dummy.',
    image: null
  }
]

// --- AKHIR DATA DUMMY ---

const logDummyMessage = (functionName) => {
  console.info(`Menggunakan data dummy dari src/lib/contentful.js untuk fungsi: ${functionName}`)
}

export const preloadGetAllPosts = () => {
  // Fungsi ini tidak perlu melakukan apa-apa dengan data dummy
}

export const getAllPosts = cache(async (preview = false) => {
  logDummyMessage('getAllPosts')
  return Promise.resolve([dummyPost])
})

export const getPost = cache(async (slug, preview = false) => {
  logDummyMessage('getPost')
  return Promise.resolve(dummyPost)
})

export const getWritingSeo = cache(async (slug, preview = false) => {
  logDummyMessage('getWritingSeo')
  return Promise.resolve(dummyPost)
})

export const getPageSeo = cache(async (slug, preview = false) => {
  logDummyMessage('getPageSeo')
  return Promise.resolve(dummyPage)
})

export const getAllPageSlugs = cache(async (preview = false) => {
  logDummyMessage('getAllPageSlugs')
  return Promise.resolve([
    { slug: 'stack', hasCustomPage: false, sys: dummyPage.sys },
    { slug: 'workspace', hasCustomPage: true, sys: dummyPage.sys },
    { slug: 'journey', hasCustomPage: true, sys: dummyPage.sys }
  ])
})

export const getAllPostSlugs = cache(async (preview = false) => {
  logDummyMessage('getAllPostSlugs')
  return Promise.resolve([{ slug: 'postingan-dummy' }])
})

export const getPage = cache(async (slug, preview = false) => {
  logDummyMessage('getPage')
  return Promise.resolve(dummyPage)
})

export const getAllLogbook = cache(async (preview = false) => {
  logDummyMessage('getAllLogbook')
  return Promise.resolve(dummyLogbook)
})
