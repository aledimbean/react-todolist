import {useState, useEffect} from 'react'
import StyledQuote from "../../styles/StyledQuote"

interface Quote {
  text: string,
  author: string
}

const RandomQutote = () => {
  const [data, setData] = useState<Quote | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function getRandomQuote() {
      const data = await fetch('https://type.fit/api/quotes');
      const quotes = await data.json();
      const randomNumber = Math.floor(Math.random() * quotes.length);
      setData(quotes[randomNumber]);
      setIsLoading(false);
    }
    getRandomQuote();
  }, []);

    return (
      <StyledQuote>
       <div>
           {!loading ? <h2>{data?.text} <span>{data?.author}</span></h2> : 'Fetching random quote...'}
       </div> 
       </StyledQuote>
    )
}

export default RandomQutote