import { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchQuotes } from '../../redux/quotesSlice'
import { RootState } from "../../redux/store";
import StyledQuote from '../../styles/StyledQuote'

const RandomQutote = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const quotesList = useSelector((state: RootState) => state.quotes);

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  const randomNumber = Math.floor(Math.random() * quotesList.length);
  const quote = quotesList[randomNumber];

    return (
      <StyledQuote>
       <div>
          <h2>{quote?.text} <span>{quote?.author}</span></h2>
       </div> 
       </StyledQuote>
    )
}

export default RandomQutote