import axios from "axios";

const URL = "https://pixabay.com/api/";
const API_KEY = "13538087-c00bd606dd2f77a92fe76c2ff";

export async function imgParams(value, page = 1) {
    axios.defaults.params = {
        key: API_KEY,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
    };
        const response = await axios.get(URL);
        return response.data;

}
