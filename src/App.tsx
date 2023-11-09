import Navbar from './components/Navbar/NavBar';
import RandomQuote from './components/RandomQuote/RandomQuote';
import TodoList from './components/TodoList/TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Theme } from './Theme';
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import img from "./assets/dotted-background.jpg"

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 10rem 1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  &:before {
    position: absolute;
    z-index: -1;
    content: '';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: repeat url(${img});
    background-size: 1rem;
    opacity: 0.4;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
          <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/random-quote" element={<RandomQuote />} />
          </Routes>
        </Container>
      </ThemeProvider>
	  </BrowserRouter>
  );
}

export default App;
