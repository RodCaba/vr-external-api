import { NextResponse } from 'next/server';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';

function getTuyaApi() {
  return new TuyaContext({
    baseUrl: process.env.TUYA_URL,
    accessKey: process.env.TUYA_CLIENT_ID,
    secretKey: process.env.TUYA_CLIENT_SECRET,
  })
}

export async function POST(request) {
  try {
    const tuyaApi = getTuyaApi();
    const body = await request.json();
    const { value } = body;
    const result = await tuyaApi.request({
      method: 'POST',
      path: '/v1.0/devices/' + process.env.TUYA_DEVICE_ID + '/commands',
      body: {
        commands: [
          {
            code: 'switch_spray',
            value: value
          }
        ]
      }
    })
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}