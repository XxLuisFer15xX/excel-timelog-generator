const getPageRange = (pages: number[], current = 0, range = 0) => {
  let numberOfPages = pages.length
  let pageEnd = pages[numberOfPages - 1]
  let from = current - range
  let to = current + range
  let filteredPages: number[] = []
  pages.forEach(page => {
    if (page === pages[0] || (page >= from && page <= to) || page === pageEnd) {
      filteredPages.push(page)
    }
  })
  return filteredPages
}

const getEllipsisPages = (pages: number[]) => {
  let numberOfPages = pages.length
  let pageEnd = pages[numberOfPages - 1]
  let ellipsisPages: number[] = []
  pages.forEach((page, i) => {
    if (page === pageEnd) {
      ellipsisPages.push(pageEnd)
    } else if (pages[i] === page && pages[i + 1] !== page + 1) {
      ellipsisPages.push(page)
      ellipsisPages.push(-1)
    } else {
      ellipsisPages.push(page)
    }
  })
  return ellipsisPages
}

export const getPagination = (
  pages: number[],
  pageSelect = 0,
  pageRange = 0,
) => {
  let pageRanges = getPageRange(pages, pageSelect, pageRange)
  let pagination = getEllipsisPages(pageRanges)
  return pagination
}
