import 'server-only'

// Data bookmark palsu
const dummyBookmarks = [
  { _id: 1, title: 'http://localhost:3000', slug: 'design', count: 10 },
  { _id: 2, title: 'http://localhost:30001', slug: 'frontend', count: 25 },
  { _id: 3, title: 'http://localhost:3003', slug: 'apps-and-tools', count: 15 }
]

const dummyBookmarkItems = {
  result: true,
  items: [
    { _id: 101, title: 'no', link: '#', domain: 'example.com', excerpt: 'A great tool for designers.' },
    { _id: 102, title: 'Frontend Weekly', link: '#', domain: 'example.com', excerpt: 'The best frontend newsletter.' }
  ],
  count: 2
}
export const getServers = async () => {
  console.info('Menggunakan data dummy untuk servers.')
  const dummyServers = [
    { _id: 'server-01', name: 'Primary Server', slug: 'primary-server' },
    { _id: 'server-02', name: 'Backup West', slug: 'backup-west' }
  ]
  return Promise.resolve(dummyServers)
}

export const getBookmarkItems = async (id = 0) => {
  console.info(`Menggunakan data dummy untuk bookmark items ID: ${id}`)
  return Promise.resolve(dummyBookmarkItems)
}

export const getBookmarks = async () => {
  console.info('Menggunakan data dummy untuk collections bookmarks.')
  return Promise.resolve(dummyBookmarks)
}

export const getBookmark = async (id) => {
  console.info(`Menggunakan data dummy untuk bookmark ID: ${id}`)
  const found = dummyBookmarks.find((b) => b._id.toString() === id.toString())
  return Promise.resolve({ item: found })
}
