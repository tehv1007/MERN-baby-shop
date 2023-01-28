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

export const listRelated = async (productId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/products/related/${productId}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getRandom = (arr, n) => {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
