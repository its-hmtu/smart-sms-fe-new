import axiosClient from "@/api/axiosClient"
import API_PATH from "@/configs/API_PATH"

class CampaignService {
  static async getCampaign(params) {
    const { data } = await axiosClient.get(API_PATH.GET_CAMPAIGN, {
      params
    });

    return data;
  }

  static async createCampaign(body) {
    const { data } = await axiosClient.post(API_PATH.CREATE_CAMPAIGN, body);
    return data;
  }

  static async updateCampaign(body) {
    console.log('body', body)
    const {id, ...rest} = body;
    const { data } = await axiosClient.post(API_PATH.UPDATE_CAMPAIGN.replace(':id', id), rest);
    return data;
  }

  static async getSubscriberGroup() {
    const { data } = await axiosClient.get(API_PATH.GET_SUBSCRIBER_LIST);
    return data;
  }

  static async uploadSubscriber(formData) {
    const { data } = await axiosClient.post(API_PATH.UPLOAD_SUBSCRIBER, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return data;
  }

  static async duplicatieCampaign(body) { 
    const { id, ...rest } = body;
    const { data } = await axiosClient.post(API_PATH.DUPLICATE_CAMPAIGN.replace(':id', id), rest);

    return data;
  }
}

export default CampaignService;