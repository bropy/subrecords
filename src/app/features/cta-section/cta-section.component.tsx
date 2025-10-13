'use client'

import { type FC } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@heroui/button'

// component
const CtaSectionComponent: FC = () => {
  const t = useTranslations('home.cta')

  // return
  return (
    <section className='bg-gradient-to-br from-red-950/30 via-black to-black py-20 px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='relative group'>
          <div className='absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur-xl opacity-25 group-hover:opacity-50 transition duration-1000' />
          
          <div className='relative bg-gradient-to-br from-red-950/50 to-black border border-red-600/30 rounded-3xl p-12 md:p-16 text-center backdrop-blur-sm'>
            <h2 className='text-4xl md:text-6xl font-bold text-white mb-6'>
              {t('title')} <span className='text-red-600'>{t('title_highlight')}</span>
            </h2>
            <p className='text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed'>
              {t('subtitle')}
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button
                size='lg'
                className='bg-red-600 hover:bg-red-700 text-white font-bold px-12 h-16 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50'
                radius='lg'
              >
                {t('primary_button')}
              </Button>
              <Button
                size='lg'
                variant='ghost'
                className='text-white border-2 border-white/30 hover:bg-white/10 font-semibold px-12 h-16 text-lg transition-all duration-300 hover:scale-105'
                radius='lg'
              >
                {t('secondary_button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSectionComponent

