import { CHUNWON_TOKEN_ADDRESS } from '@/constants';
import { useGlobalStore } from '@/stores/global';
import { mintclub } from 'mint.club-v2-sdk';
import { useEffect } from 'react';

export default function useNftList() {
  const list = useGlobalStore((state) => state.list);
  async function fetchList() {
    try {
      useGlobalStore.setState({ list: [] });

      // TODO: Mission 7: fetch list of NFTs using sdk
      // https://sdk.mint.club/docs/sdk/network/bond/getTokensByReserveToken
      // 천원 토큰으로 발행된 NFT 리스트 불러오기 (constants 파일에 정의된 CHUNWON_TOKEN_ADDRESS 사용)
      const tokens = await mintclub
        .network('base')
        .bond.getTokensByReserveToken({ reserveToken: CHUNWON_TOKEN_ADDRESS });
      useGlobalStore.setState({ list: tokens });
    } catch (e) {
      console.error(e);
      fetchList();
    }
  }

  useEffect(() => {
    fetchList();

    // eslint-disable-next-line
  }, []);

  return { list, refresh: fetchList };
}
