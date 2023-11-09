import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchQuotes } from '../../redux/quotesSlice'
import { RootState } from "../../redux/store";

import tw from "twin.macro"
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { lightTheme, darkTheme } from '../../Theme';
import Button from '../Button/Button';


export const StyledQuote = styled.main.attrs({
  className: "flex flex-col justify-center items-center",
})`
  & {
    div {
      ${tw`text-center rounded-md py-10 px-6 shadow max-w-lg text-zinc-800`}
      background: ${(props) => props.theme.background};
    }&:before {
      content: '"',
      font-family: sans-serif;
      left: 0;
    }
    h2, span {
      ${tw`text-2xl font-serif italic`}
      color: ${(props) => props.theme.color};
    }
    span {
      ${tw`text-xs block pt-4 font-mono not-italic`}
    }
  }
`

const RandomQutote = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const quotesList = useSelector((state: RootState) => state.quotes);

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  const randomNumber = Math.floor(Math.random() * quotesList.length);
  const quote = quotesList[randomNumber];

    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <StyledQuote>
          <Button classes="mb-4" buttonStyle="primary" text="Switch theme" onClick={toggleTheme}/>
          <div>
              <h2>{quote?.text} <span>{quote?.author}</span></h2>
          </div> 
        </StyledQuote>
       </ThemeProvider>
    )
}

export default RandomQutote