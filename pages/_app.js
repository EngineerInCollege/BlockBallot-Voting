import { createGlobalStyle } from 'styled-components'
import { StateContext } from '@/context/StateContext'
import { ThirdwebProvider } from "@thirdweb-dev/react";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`

export const BLOCK_BALLOT_CONTRACT_ADDRESS = "0x54F7fe007DAC317aFE8D1e1dccfEf23836Ca4Af1"

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />

      <StateContext>
        <ThirdwebProvider clientId="46279898771d4e37ac4001efde13bd0f">
          <Component {...pageProps} />
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