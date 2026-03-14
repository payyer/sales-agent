import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi'
    i18n.changeLanguage(newLang)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="w-12 h-8 text-xs font-bold uppercase"
    >
      {i18n.language === 'vi' ? 'EN' : 'VI'}
    </Button>
  )
}
