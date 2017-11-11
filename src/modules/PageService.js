function toActive(page, state) {
  const activePageName = state.app.activePage || '';
  const active = page.name === activePageName;
  return { ...page, active };
}

function findByName(pages, pageName) {
  if (!pageName) return undefined;

  if (pages) {
    return Object.values(pages).find(v => v.name === pageName);
  }

  return undefined;
}

function findById(pages, pageId) {
  if (!pageId) return undefined;
  return pages[pageId];
}

function getPageParents(pageName, pages) {
  const sourcePage = findByName(pages, pageName);
  if (!sourcePage) return [];
  console.log(`starting point: ${sourcePage.id}/${sourcePage.name}`);
  const parents = [];
  let currentPage = sourcePage;
  let level = 0;
  do {
    const parent = findById(pages, currentPage.parentId);
    if (parent) {
      console.log(`Found parent ${parent.name} for page: ${currentPage.name}`);
      parents.push(parent);
      currentPage = parent;
    } else {
      console.log(`Page ${currentPage.name} is a root page`);
      currentPage = undefined;
    }
    level++;
  } while (currentPage && level < 10);
  return parents.reverse();
}

function sortPage(p1, p2) {
  return p1.sortindex === p2.sortindex
    ? p1.title.localeCompare(p2.title)
    : p1.sortindex - p2.sortindex;
}

function attachChildren(page, subPages) {
  return {
    ...page,
    subPages
  };
}

function getChildren(parentPage, state) {
  const children = state.app.pages
    ? Object.values(state.app.pages).filter(page => page.parentId === parentPage.id)
      .map(page => toActive(page, state))
      .sort((p1, p2) => sortPage(p1, p2))
    : [];
  return children.map(childPage => attachChildren(childPage, getChildren(childPage, state)));
}

function getSiblings(page, state) {
  const parentId = page ? page.parentId : null;
  return (state.app.pages && parentId)
    ? Object.values(state.app.pages).filter(p => p.parentId === parentId)
      .map(p => toActive(p, state))
      .sort((p1, p2) => sortPage(p1, p2))
    : [];
}

export default {
  getChildren,
  getSiblings,
  getPageParents,
  attachChildren,
  sortPage,
  toActive,
  findByName,
  findById
};
