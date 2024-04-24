import { createGlobalStyle } from 'styled-components'
import { StateContext } from '@/context/StateContext'
import { ThirdwebProvider, metamaskWallet, 
  coinbaseWallet, walletConnect, localWallet } from "@thirdweb-dev/react";
  import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from 'react-query';  

  const queryClient = new QueryClient();

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`

export const BLOCK_BALLOT_CONTRACT_ADDRESS = "0x321EF2B5C3C61c060431A35417521CdAd30c651d"

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />

      <StateContext>
        <ThirdwebProvider
            activeChain="ethereum" clientId="46279898771d4e37ac4001efde13bd0f"
            supportedWallets={[ metamaskWallet({ recommended: true }), coinbaseWallet(),walletConnect(),
              localWallet(),
            ]}
        >
          <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          </QueryClientProvider>
        </ThirdwebProvider>
      </StateContext>
    </>
  )
}

export const COLORS = {
  main: "#3e5c76",
  feature: "#748cab",
  dark: "#1d2d44",
  background: "#f0ebd8",
  black: "#0d1321",
};