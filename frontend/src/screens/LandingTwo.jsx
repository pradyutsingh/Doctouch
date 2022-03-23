import React from 'react'
import image6 from '../static/images/image-6.jpg'
import image5 from '../static/images/image-5.jpg'

const LandingTwo = () => {
  return (
    <section className='destinations'>
      <h3>Check Now!</h3>
      <div className='grid'>
        <div className='grid2'>
          <img src={image5} alt='sugar-image' />
          <h3>Find Your Sugar Level</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, ab nesciunt? Molestias rem qui sequi!
          </p>
        </div>

        <div className='grid2'>
          <img src={image6} alt='diabetes-image' />
          <h3>Check Out your Kidney</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, ab nesciunt? Molestias rem qui sequi!
          </p>
        </div>

      </div>
    </section>
  )
}

export default LandingTwo
