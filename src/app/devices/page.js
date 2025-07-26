import Link from 'next/link'
import { Suspense } from 'react'

import { FloatingHeader } from '@/components/floating-header'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { ScrollArea } from '@/components/scroll-area'
import { getPageSeo } from '@/lib/contentful'
import { getBookmarks } from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'

async function fetchData() {
  const bookmarks = await getBookmarks()
  const sortedBookmarks = sortByProperty(bookmarks, 'title')
  return { bookmarks: sortedBookmarks }
}

export default async function Writing() {
  const { bookmarks } = await fetchData()

  return (
    <ScrollArea className="lg:hidden">
      <div className="text-xl text-black">hahahahah</div>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const seoData = await getPageSeo('bookmarks')
  if (!seoData) return null

  const {
    seo: { title, description }
  } = seoData
  const siteUrl = '/bookmarks'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
