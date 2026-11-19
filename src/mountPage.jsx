import { createElement, StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

export function mountPage(Component) {
  const container = document.getElementById('root')
  const page = <StrictMode>{createElement(Component)}</StrictMode>
  if (container.hasChildNodes()) hydrateRoot(container, page)
  else createRoot(container).render(page)
}
