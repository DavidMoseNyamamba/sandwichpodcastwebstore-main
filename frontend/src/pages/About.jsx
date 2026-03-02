import Title from '../components/Title';
import {assets} from '../assets/assets'; // Adjust the path as necessary
import NewsletterBox from '../components/NewletterBox'; // Adjust the path as necessary

const About = () => {
  return (
    <div>
     
        <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to the Sandwich Podcast Webstore, 
            your one-stop destination for official 
            Sandwich Podcast merchandise. Dive into 
            our collection of trendy apparel, accessories, 
            and exclusive items designed for fans and 
            listeners alike. Each product reflects the 
            humor, creativity, and culture that make the 
            Sandwich Podcast a fan favorite. 
            Whether you’re rocking our gear or gifting 
            it to a fellow fan, you’re joining a vibrant 
            community of podcast enthusiasts. 
            Shop now and wear your fandom with pride!</p>

          <p>Discover the essence of the Sandwich Podcast 
            through our exclusive webstore! Each product 
            is thoughtfully designed to reflect the bold, 
            authentic, and vibrant spirit of our podcast 
            community. By shopping with us, you’re not 
            just purchasing merchandise – you’re joining 
            a movement that celebrates great conversations, 
            laughter, and connection. Explore our collection 
            today and take a piece of the Sandwich Podcast 
            experience with you!</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className="text-gray-600">Quality assurance is at the heart of the Sandwich Podcast 
            webstore experience. Every product, feature, and 
            service undergoes meticulous checks to ensure it 
            meets the highest standards. From seamless navigation 
            to secure transactions, our commitment to excellence 
            guarantees customer satisfaction and trust.</p>
        </div>
        
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className="text-gray-600">The Sandwich Podcast webstore is designed with your 
            convenience in mind. With an intuitive interface, 
            secure payment options, and fast delivery, 
            we ensure a hassle-free shopping experience. 
            Explore, shop, and enjoy your favorite products 
            with just a few clicks!</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Best Customer Service:</b>
          <p className="text-gray-600">At the Sandwich Podcast webstore, we pride ourselves 
            on delivering the best customer service. 
            Our dedicated support team is always ready 
            to assist, ensuring your shopping experience 
            is seamless and enjoyable. Your satisfaction is 
            our top priority!</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About
