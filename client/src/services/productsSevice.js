export const sortNumbers = (numberArr, direction) => {
  numberArr.sort(function (a, b) {
    if (a.price > b.price) {
      return direction === "lowtohigh" ? 1 : -1;
    }

    if (a.price == b.price) {
      return 0;
    }

    if (a.price < b.price) {
      return direction === "lowtohigh" ? -1 : 1;
    }
  });
};

export const sortNames = (nameArr, direction) => {
  nameArr.sort(function (a, b) {
    let aName = a.title.toLowerCase();
    let bName = b.title.toLowerCase();

    if (aName > bName) {
      return direction === "AtoZ" ? 1 : -1;
    }

    if (aName == bName) {
      return 0;
    }

    if (aName < bName) {
      return direction === "AtoZ" ? -1 : 1;
    }
  });
};

export const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};
