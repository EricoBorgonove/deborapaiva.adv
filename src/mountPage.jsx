import { createElement, StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

export function mountPage(Component) {
  const container = document.getElementById('root')
  const language = document.documentElement.lang.split('-')[0]
  const page = <StrictMode>{createElement(Component, { language })}</StrictMode>
  if (container.hasChildNodes()) hydrateRoot(container, page)
  else createRoot(container).render(page)
}
