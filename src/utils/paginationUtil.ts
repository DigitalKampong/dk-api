/**
 * Generates links for pagination.
 * @param limit Max number of items per page.
 * @param currPage Current page number.
 * @param count Total number of items.
 * @param sourceRoute Source route of where pagination is applied.
 */
function generatePagination(limit: number, currPage: number, count: number, sourceRoute: string) {
  const lastPage = Math.ceil(count / limit);
  let next = null;
  let prev = null;
  let err;
  if (currPage >= 1 && currPage <= lastPage) {
    next = currPage >= lastPage ? null : generateRoute(limit, currPage + 1, sourceRoute);
    prev = currPage <= 1 ? null : generateRoute(limit, currPage - 1, sourceRoute);
  } else {
    err = 'Page not found.';
  }

  const pagination = [];
  for (let i = 1; i <= lastPage; i++) {
    pagination.push(generateRoute(limit, i, sourceRoute));
  }
  return {
    next: next,
    prev: prev,
    err: err,
    pagination: pagination,
  };
}

/**
 * Generates links for pagination with additional queries.
 * @param limit Max number of items per page.
 * @param currPage Current page number.
 * @param count Total number of items.
 * @param sourceRoute Source route of where pagination is applied.
 * @param queries Query string to be appended at the end of each pagination link.
 */
function generatePaginationWithQueries(
  limit: number,
  currPage: number,
  count: number,
  sourceRoute: string,
  queries: string
) {
  const lastPage = Math.ceil(count / limit);
  let next = null;
  let prev = null;
  let err;
  if (currPage >= 1 && currPage <= lastPage) {
    next =
      currPage >= lastPage
        ? null
        : generateRouteWithQueries(limit, currPage + 1, sourceRoute, queries);
    prev =
      currPage <= 1 ? null : generateRouteWithQueries(limit, currPage - 1, sourceRoute, queries);
  } else {
    err = 'Page not found.';
  }

  const pagination = [];
  for (let i = 1; i <= lastPage; i++) {
    pagination.push(generateRouteWithQueries(limit, i, sourceRoute, queries));
  }
  return {
    next: next,
    prev: prev,
    err: err,
    pagination: pagination,
  };
}

function generateRoute(limit: number, page: number, sourceRoute: string) {
  return `${sourceRoute}?limit=${limit}&page=${page}`;
}

function generateRouteWithQueries(
  limit: number,
  page: number,
  sourceRoute: string,
  queries: string
) {
  return `${sourceRoute}?limit=${limit}&page=${page}${queries}`;
}

export { generatePagination, generatePaginationWithQueries };
