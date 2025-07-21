import 'server-only'

// Data bookmark palsu
const dummyBookmarks = [
  { _id: 1, title: 'Design', slug: 'design', count: 10 },
  { _id: 2, title: 'Frontend', slug: 'frontend', count: 25 },
  { _id: 3, title: 'Apps & Tools', slug: 'apps-and-tools', count: 15 }
]

const dummyBookmarkItems = {
  result: true,
  items: [
    { _id: 101, title: 'Cool Design Tool', link: '#', domain: 'example.com', excerpt: 'A great tool for designers.' },
    { _id: 102, title: 'Frontend Weekly', link: '#', domain: 'example.com', excerpt: 'The best frontend newsletter.' }
  ],
  count: 2
}

export const getBookmarkItems = async (id, pageIndex = 0) => {
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
