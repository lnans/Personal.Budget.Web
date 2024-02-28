import { AppLogo } from '@/components/Elements'

type AppLoaderProps = {
  text: string
}

function AppLoader({ text }: AppLoaderProps) {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-3 bg-white dark:bg-neutral-950">
      <AppLogo className="h-14 w-60 fill-current bg-ind text-primary dark:text-primary-dark" />
      <span className="w-60 h-1 inline-block relative bg-primary dark:bg-primary-dark bg-opacity-10 dark:bg-opacity-10 overflow-hidden rounded-full after:content-[''] after:w-12 after:h-1 after:bg-primary after:dark:bg-primary-dark after:absolute after:top-0 after:left-0 after:rounded-full after:animate-progressIndeterminate" />
      <p className="text-base leading-7 text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  )
}

export default AppLoader
