import styled from "styled-components"
import tw from "twin.macro"

const StyledQuote = styled.main.attrs({
  className: "flex flex-col justify-center items-center",
})`
  & {
    div {
      ${tw`bg-white text-center rounded-md py-10 px-6 shadow max-w-lg text-zinc-800`}
    }&:before {
      content: '"',
      font-family: sans-serif;
      left: 0;
      color: pink;
    }
    h2 {
      ${tw`text-2xl font-serif italic`}
    }
    span {
      ${tw`text-xs block pt-4 font-mono not-italic text-mainColor`}
    }
  }
`
export default StyledQuote