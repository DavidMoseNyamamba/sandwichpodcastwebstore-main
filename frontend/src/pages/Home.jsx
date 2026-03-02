// import ComingSoon from '../components/ComingSoon'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Offers from '../components/Offers'
import OurPolicy from '../components/OurPolicy'
import NewletterBox from '../components/NewletterBox'
import Trending from '../components/Trending'
import Trends from '../components/Trends'

const Home = () => {
  return (
    // homepage elements
    <div>
      {/* <ComingSoon/> */}
      <Hero/>
      <LatestCollection/>
      <Offers/>
      <BestSeller/>
      <Trends/>
      <Trending/>
      <OurPolicy/>
      <NewletterBox/>
    </div>
  )
}

export default Home
