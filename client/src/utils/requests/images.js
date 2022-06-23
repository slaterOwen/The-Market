import axios from "axios";
import config from "../../config.json";

const IMGUR = config.api_base.imgur;

export const uploadImage = async (img) => {
  const data = new FormData();
  data.set("image", img.split(",")[1]);
  data.set("type", "base64");
  try {
    const resp = await axios.post(IMGUR, data, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_ID}`,
      },
    });
    console.log(resp);
    return {
      success: resp.status === 200,
      url: resp.data.data.link,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e.response,
    };
  }
};
