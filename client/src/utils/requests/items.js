import axios from "axios";
import config from "../../config.json";

const BASE_URL = config.api_base.development;
const ITEMS = "items";

export const getItems = async () => {
  const url = `${BASE_URL}${ITEMS}`;
  try {
    const resp = await axios.get(url);
    console.log(resp.data.listings);
    return {
      success: resp.status === 200,
      listings: resp.data.listings,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      err: e,
    };
  }
};

export const getUserItems = async (ownId) => {
  const url = `${BASE_URL}${ITEMS}?owner=${ownId}`;
  try {
    const resp = await axios.get(url);
    console.log(resp.data.listings);
    const listings = resp.data.listings.map((l) => ({
      ...l,
      tags: l.tags || [],
    }));
    return {
      success: resp.status === 200,
      listings: listings,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      err: e,
    };
  }
};

// export const deleteUserItems = async (ownId) => {
//   const url = `${BASE_URL}${ITEMS}?owner=${ownId}`;
//   try {
//     const resp = await axios.delete(url);
//     console.log(resp.data.listings);
//     const listings = resp.data.listings.map((l) => ({
//       ...l,
//       tags: l.tags || [],
//     }));
//     return {
//       success: resp.status === 200,
//       listings: listings,
//     };
//   } catch (e) {
//     console.log(e);
//     return {
//       success: false,
//       err: e,
//     };
//   }
// };

export const getItem = async (id) => {
  const url = `${BASE_URL}${ITEMS}/${id}`;
  try {
    const resp = await axios.get(url);
    return {
      success: resp.status === 200,
      item: resp.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      err: e,
    };
  }
};

export const postItem = async (details, auth) => {
  const url = `${BASE_URL}${ITEMS}`;
  console.log("In post item");
  try {
    const resp = await axios.post(url, JSON.stringify(details), {
      headers: {
        "Content-Type": "application/json",
        ...auth,
      },
    });
    return {
      success: resp.status === 201,
      id: resp.data._id,
    };
  } catch (e) {
    return {
      success: false,
      data: e.data,
    };
  }
};

export const deleteUserItems = async (ownId) => {
  const url = `${BASE_URL}${ITEMS}?owner=${ownId}`;
  try {
    const resp = await axios.delete(url);
    console.log(resp.data.listings);
    const listings = resp.data.listings.map((l) => ({
      ...l,
      tags: l.tags || [],
    }));
    return {
      success: resp.status === 200,
      listings: listings,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      err: e,
    };
  }
};

export const deleteItem = async (itemId, auth) => {
  const url = `${BASE_URL}${ITEMS}/${itemId}`;
  console.log(auth);
  try {
    const resp = await axios.delete(url, {
      headers: {
        ...auth,
      },
    });
    console.log(resp);
    return {
      success: resp.status === 204,
    };
  } catch (e) {
    return {
      success: false,
      data: e.data,
    };
  }
};

export const postTransaction = async (transObj, listingId, buyerId, auth) => {
  const url = `${BASE_URL}transactions`;
  const data = {
    listingId: listingId,
    buyer: buyerId,
    date: Date.now(),
    card: transObj.card,
    street: transObj.street,
    city: transObj.city,
    state: transObj.state,
  };
  try {
    const resp = await axios.post(url, data, {
      headers: {
        ...auth,
      },
    });
    return {
      success: resp.status === 201,
    };
  } catch (e) {
    return {
      success: false,
      message: "Card declined.",
    };
  }
};
