import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat labore porro explicabo repellat odit, voluptatum magnam enim sit aperiam expedita corporis illum ducimus praesentium esse harum dignissimos? At, dolorum cumque.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel nam deleniti suscipit quibusdam tempora veritatis est. Optio eaque asperiores maxime, ex hic delectus neque tenetur omnis, incidunt deserunt quam cum.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolore beatae, perferendis, ut modi repudiandae minima vel provident quos eligendi quasi aut obcaecati reiciendis libero, hic iste voluptas amet omnis!</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum similique labore ullam tempore ea voluptas deserunt ad suscipit vitae, accusantium molestias repudiandae temporibus odio praesentium mollitia ipsum, quo perspiciatis alias!</p>
        </div>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum similique labore ullam tempore ea voluptas deserunt ad suscipit vitae, accusantium molestias repudiandae temporibus odio praesentium mollitia ipsum, quo perspiciatis alias!</p>
        </div>
        <div className='border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Servie:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum similique labore ullam tempore ea voluptas deserunt ad suscipit vitae, accusantium molestias repudiandae temporibus odio praesentium mollitia ipsum, quo perspiciatis alias!</p>
        </div>
      </div>

      <NewsLetterBox/>

    </div>
  )
}

export default About