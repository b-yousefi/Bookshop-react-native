export const FILTER_ACTIONS = {
  SET: "FILTER_SET",
  CLEAR: "FILTER_CLEAR",
  SET_AUTHORS: "FILTER_AUTHORS",
  SET_CATEGORIES: "FILTER_CATEGORIES",
  SET_PUBLICATIONS: "FILTER_PUBLICATIONS",
};

export function setFilter(filter) {
  filter.refresh = true;
  return {
    type: FILTER_ACTIONS.SET,
    data: filter,
  };
}

export function clearFilter() {
  return {
    type: FILTER_ACTIONS.CLEAR,
    data: {
      publicationIds: [],
      categoryIds: [],
      authorIds: [],
    },
  };
}
