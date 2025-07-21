'use client'

import { useEffect, useState } from 'react'

const dummyViewData = [
  { slug: 'bir-yazilimci-olarak-turkiyeden-gitmek', view_count: 15230 },
  { slug: 'understanding-react-memo', view_count: 8750 },
  { slug: 'useFetch-react-hook', view_count: 4200 }
]

export const useViewData = (slug) => {
  const [viewData, setViewData] = useState(null)

  useEffect(() => {
    console.info('Menggunakan data dummy untuk view counts.')
    if (slug) {
      const specificView = dummyViewData.find((item) => item.slug === slug)
      setViewData(specificView ? [specificView] : [])
    } else {
      setViewData(dummyViewData)
    }
  }, [slug])
  return viewData
}
