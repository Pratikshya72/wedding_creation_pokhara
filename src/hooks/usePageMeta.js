import { useEffect } from 'react'
import { site } from '../data/site'

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.fullName}` : `${site.fullName} · Wedding Photography & Films in Nepal`
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.content = description
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
