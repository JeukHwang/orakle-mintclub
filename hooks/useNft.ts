import { mintclub, toNumber } from 'mint.club-v2-sdk';
import { useEffect, useState } from 'react';

export type NftDetail = {
  name: string;
  image: string;
  price: number;
  sold: number;
  maxSupply: number;
  address: `0x${string}`;
};

export default function useNft(address?: `0x${string}` | null) {
  const [data, setData] = useState<NftDetail | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      if (!address) {
        setData(null);
        return;
      }

      setLoading(true);
      // TODO: Mission 6: fetch NFT detail using sdk
      // https://sdk.mint.club/docs/sdk/network/token-nft/getDetail
      const detail = await mintclub.network('base').token(address).getDetail();
      setData({
        name: detail.info.name,
        maxSupply: Number(detail.info.maxSupply),
        image: "",
        price: toNumber(detail.info.priceForNextMint, 18),
        sold: Number(detail.info.currentSupply),
        address,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { data, refresh: fetchData, loading };
}
