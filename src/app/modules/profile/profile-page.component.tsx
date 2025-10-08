'use client'

import { type Locale } from 'next-intl'
import { useLocale, useTranslations } from 'next-intl'
import { type FC } from 'react'
import { User, Calendar, Mail, Heart, Music, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { UserProfileCard } from '@/app/features/auth/user-profile-card.component'
import { LikedAlbumsSection } from '@/app/features/auth/liked-albums-section.component'
import { useAuthStore } from '@/app/shared/store/auth.store'

// interface
interface IProps {
  params: Promise<{ locale: Locale }>
}

// component
const ProfilePage: FC<Readonly<IProps>> = (props) => {
  const locale = useLocale()
  const t = useTranslations('profile')

  // return
  return (
    <div className="min-h-screen bg-dark-blue">
      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-beige-100 mb-4">
              {t('title')}
            </h1>
            <p className="text-beige-400 text-lg">
              {t('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <UserProfileCard />
              
              <div className="bg-dark-blue-light p-6 rounded-lg shadow-lg border border-dark-blue-gray">
                <h3 className="text-lg font-semibold text-beige-100 mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5 text-red-500" />
                  {t('quick_stats.title')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-beige-400">{t('quick_stats.liked_albums')}</span>
                    <span className="text-beige-100 font-semibold">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-beige-400">{t('quick_stats.member_since')}</span>
                    <span className="text-beige-100 font-semibold">{t('quick_stats.today')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-beige-400">{t('quick_stats.account_status')}</span>
                    <span className="text-green-400 font-semibold">{t('quick_stats.active')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-dark-blue-light p-6 rounded-lg shadow-lg border border-dark-blue-gray">
                <h3 className="text-lg font-semibold text-beige-100 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-red-500" />
                  {t('account_actions.title')}
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-dark-blue-gray hover:bg-dark-blue-gray/80 rounded-lg transition-colors text-beige-100">
                    <div className="flex items-center gap-3">
                      <Settings className="w-4 h-4" />
                      <span>{t('account_actions.settings')}</span>
                    </div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-dark-blue-gray hover:bg-dark-blue-gray/80 rounded-lg transition-colors text-beige-100">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4" />
                      <span>{t('account_actions.privacy')}</span>
                    </div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30 rounded-lg transition-colors text-red-400">
                    <div className="flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      <span>{t('account_actions.sign_out')}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <LikedAlbumsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
