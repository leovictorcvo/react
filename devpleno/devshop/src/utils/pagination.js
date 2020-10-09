const getPaginationParams = (query, total) => {
  const CURRENT_PAGE = 1;
  const RECORDS_PER_PAGE = 5;
  const currentPage = query.currentPage
    ? parseInt(query.currentPage)
    : CURRENT_PAGE;
  const pageSize = query.pageSize ? parseInt(query.pageSize) : RECORDS_PER_PAGE;
  const totalRecords = total || 0;
  const totalPages = Math.ceil(totalRecords / pageSize);

  return {
    currentPage,
    pageSize,
    totalRecords,
    totalPages
  };
};

module.exports = {
  getPaginationParams
};
