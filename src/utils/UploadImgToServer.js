import BaseUrl from "../service/BaseUrl";
import axios from "axios";

export const UploadImageToServer = async (imgFile) => {
    const formData = new FormData();
    formData.append('file', imgFile);

    try {
      const response = await axios.post(`${BaseUrl}/api/img/upload`, formData);
      console.log('圖傳到伺服器成功:', response.data);
      
      console.log('server url response.data:', BaseUrl + response.data );

      return BaseUrl + response.data;
    } catch (error) {
      console.error('圖片上傳失败:', error);
    }
};