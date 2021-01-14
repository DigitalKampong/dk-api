function generatePagination(limit: number, currPage: number, count: number, sourceRoute: string) {
  const lastPage = Math.ceil(count / limit);
  const next = currPage >= lastPage ? null : generateRoute(limit, currPage + 1, sourceRoute);
  const prev = currPage <= 1 ? null : generateRoute(limit, currPage - 1, sourceRoute);
  const pagination = [];
  for (let i = 1; i <= lastPage; i++) {
    pagination.push(generateRoute(limit, i, sourceRoute));
  }
  return {
    next: next,
    prev: prev,
    pagination: pagination,
  };
}

function generateRoute(limit: number, page: number, sourceRoute: string) {
  return `${sourceRoute}?limit=${limit}&page=${page}`;
}

export { generatePagination };
