import { api_url } from "../config/config";
import {http} from "../config/http";

// get specific tracking object
export async function getTrackingData(num) {
  return await http.get(`${api_url}/shipments/track/${num}`);
}
