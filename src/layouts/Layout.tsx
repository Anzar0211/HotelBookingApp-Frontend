import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import { useLocation } from "react-router-dom"

type Props = {
  children:React.ReactNode
}
const Layout = ({children}: Props) => {
  const location=useLocation()
  const showSearchBar = location.pathname === '/' || location.pathname === '/search';
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Hero/> 
      <div className="container mx-auto">
        {showSearchBar && <SearchBar />}
      </div>
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer/>
    </div>
  )
}
export default Layout