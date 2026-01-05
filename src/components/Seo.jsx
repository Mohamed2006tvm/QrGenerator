import React, { useEffect } from "react"

const SITE_URL = "https://easy-qr.online"
const DEFAULT_TITLE = "QRGen — Professional QR Code Generator"
const DEFAULT_DESCRIPTION =
  "Generate clean, high-quality QR codes instantly. Create and download QR codes for URLs, text, and more."

function upsertMetaByName(name, content) {
  if (!name) return
  let el = document.head.querySelector(`meta[name=\"${name}\"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertMetaByProperty(property, content) {
  if (!property) return
  let el = document.head.querySelector(`meta[property=\"${property}\"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("property", property)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertLink(rel, href) {
  if (!rel) return
  let el = document.head.querySelector(`link[rel=\"${rel}\"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
  noIndex = false,
}) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`

    document.title = title
    upsertMetaByName("description", description)
    upsertMetaByName("robots", noIndex ? "noindex,nofollow" : "index,follow")
    upsertMetaByName("theme-color", "#0B0D10")
    upsertLink("canonical", canonical)

    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:title", title)
    upsertMetaByProperty("og:description", description)
    upsertMetaByProperty("og:url", canonical)
    if (image) upsertMetaByProperty("og:image", image)

    upsertMetaByName("twitter:card", image ? "summary_large_image" : "summary")
    upsertMetaByName("twitter:title", title)
    upsertMetaByName("twitter:description", description)
    if (image) upsertMetaByName("twitter:image", image)
  }, [title, description, path, image, noIndex])

  return null
}
