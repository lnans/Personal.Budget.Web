import { AppLogo } from '.'

type AppLoaderProps = {
  text: string
}

function AppLoader({ text }: AppLoaderProps) {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-3">
      <AppLogo className="h-14 w-60" />
      <span className="w-60 h-1 inline-block relative bg-indigo-700 bg-opacity-10 overflow-hidden rounded-full after:content-[''] after:w-12 after:h-1 after:bg-indigo-700 after:absolute after:top-0 after:left-0 after:rounded-full after:animate-hitZak" />
      <p className="text-base leading-7 text-gray-600">{text}</p>
    </div>
  )
}

export default AppLoader
