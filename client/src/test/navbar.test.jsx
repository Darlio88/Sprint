import { render, screen, userEvent } from '../utils/test-utils'
import { BrowserRouter } from 'react-router-dom';
//component
import NavBar from "../components/NavBar"
import App from "../App"

describe("testing navbar",()=>{
    it("should have title Sprint",()=>{
        render(<BrowserRouter><NavBar /></BrowserRouter>);
        expect(screen.getByText(/Spr/i)).toBeInTheDocument();
    })
    it('uses flexbox in app header', async () => {
        render(<BrowserRouter><NavBar /></BrowserRouter>)
        const element = screen.getByRole('navigation')
        expect(element.className).toEqual('container')
        const innerElement= screen.getByRole("list")
        expect(innerElement.className).toEqual("inner")
        expect(getComputedStyle(innerElement).display).toEqual('flex')
      })
})