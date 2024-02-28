import { SVGAttributes } from 'react'

type AppLogoProps = SVGAttributes<SVGElement> & {
  icon?: boolean
}

function AppLogo({ icon, ...props }: AppLogoProps) {
  // const color = 'text-indigo-700'
  return (
    <>
      {icon ? (
        <svg
          // className="fill-indigo-700"
          width="34"
          height="34"
          viewBox="0 0 96 96"
          // fill={color}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          {...props}
        >
          <g clipPath="url(#clip0_203_2)">
            <path
              d="M23.328 54.24V71.136C23.328 71.712 23.616 72.064 24.192 72.192C25.536 72.448 27.168 72.576 29.088 72.576C33.632 72.576 36.96 71.744 39.072 70.08C41.184 68.352 42.24 65.728 42.24 62.208C42.24 56.32 37.44 53.376 27.84 53.376H24.096C23.584 53.376 23.328 53.664 23.328 54.24ZM23.328 26.784V40.896C23.328 41.408 23.584 41.664 24.096 41.664H26.496C35.84 41.664 40.512 38.88 40.512 33.312C40.512 28 36.608 25.344 28.8 25.344C26.944 25.344 25.376 25.472 24.096 25.728C23.584 25.856 23.328 26.208 23.328 26.784ZM12.672 84.192C11.136 84.064 9.856 83.392 8.832 82.176C7.808 80.96 7.296 79.584 7.296 78.048V19.872C7.296 18.272 7.808 16.896 8.832 15.744C9.92 14.528 11.232 13.856 12.768 13.728C17.76 13.216 22.656 12.96 27.456 12.96C46.016 12.96 55.296 18.944 55.296 30.912C55.296 34.944 53.984 38.368 51.36 41.184C48.8 44 45.344 45.792 40.992 46.56C40.928 46.56 40.896 46.624 40.896 46.752C40.896 46.816 40.96 46.848 41.088 46.848C46.144 47.552 50.144 49.472 53.088 52.608C56.096 55.744 57.6 59.488 57.6 63.84C57.6 70.944 55.232 76.256 50.496 79.776C45.824 83.232 38.464 84.96 28.416 84.96C23.36 84.96 18.112 84.704 12.672 84.192ZM74.2905 84C72.8185 84 71.5385 83.456 70.4505 82.368C69.3625 81.28 68.8185 80 68.8185 78.528V71.232C68.8185 69.76 69.3625 68.48 70.4505 67.392C71.5385 66.304 72.8185 65.76 74.2905 65.76H81.5865C83.0585 65.76 84.3385 66.304 85.4265 67.392C86.5145 68.48 87.0585 69.76 87.0585 71.232V78.528C87.0585 80 86.5145 81.28 85.4265 82.368C84.3385 83.456 83.0585 84 81.5865 84H74.2905Z"
              fill="inherit"
            />
          </g>
          <defs>
            <clipPath id="clip0_203_2">
              <rect width="96" height="96" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          // className="fill-current text-indigo-700"
          width="110"
          height="46"
          viewBox="0 0 361 95"
          // fill={color}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          {...props}
        >
          <path d="M16.328 42.24V59.136C16.328 59.712 16.616 60.064 17.192 60.192C18.536 60.448 20.168 60.576 22.088 60.576C26.632 60.576 29.96 59.744 32.072 58.08C34.184 56.352 35.24 53.728 35.24 50.208C35.24 44.32 30.44 41.376 20.84 41.376H17.096C16.584 41.376 16.328 41.664 16.328 42.24ZM16.328 14.784V28.896C16.328 29.408 16.584 29.664 17.096 29.664H19.496C28.84 29.664 33.512 26.88 33.512 21.312C33.512 16 29.608 13.344 21.8 13.344C19.944 13.344 18.376 13.472 17.096 13.728C16.584 13.856 16.328 14.208 16.328 14.784ZM5.672 72.192C4.136 72.064 2.856 71.392 1.832 70.176C0.808001 68.96 0.296 67.584 0.296 66.048V7.872C0.296 6.272 0.808001 4.896 1.832 3.744C2.92 2.528 4.232 1.856 5.768 1.72799C10.76 1.216 15.656 0.959999 20.456 0.959999C39.016 0.959999 48.296 6.944 48.296 18.912C48.296 22.944 46.984 26.368 44.36 29.184C41.8 32 38.344 33.792 33.992 34.56C33.928 34.56 33.896 34.624 33.896 34.752C33.896 34.816 33.96 34.848 34.088 34.848C39.144 35.552 43.144 37.472 46.088 40.608C49.096 43.744 50.6 47.488 50.6 51.84C50.6 58.944 48.232 64.256 43.496 67.776C38.824 71.232 31.464 72.96 21.416 72.96C16.36 72.96 11.112 72.704 5.672 72.192ZM75.4505 72.96C69.8185 72.96 65.7225 71.392 63.1625 68.256C60.6665 65.12 59.4185 59.744 59.4185 52.128V27.552C59.4185 26.08 59.9625 24.8 61.0505 23.712C62.1385 22.624 63.4185 22.08 64.8905 22.08H69.1145C70.5865 22.08 71.8665 22.624 72.9545 23.712C74.0425 24.8 74.5865 26.08 74.5865 27.552V51.072C74.5865 54.784 75.0665 57.344 76.0265 58.752C77.0505 60.096 78.7785 60.768 81.2105 60.768C83.4505 60.768 85.4985 59.872 87.3545 58.08C89.2105 56.224 90.1385 54.24 90.1385 52.128V27.552C90.1385 26.08 90.6825 24.8 91.7705 23.712C92.8585 22.624 94.1385 22.08 95.6105 22.08H100.219C101.691 22.08 102.971 22.624 104.059 23.712C105.147 24.8 105.691 26.08 105.691 27.552V66.528C105.691 68 105.147 69.28 104.059 70.368C102.971 71.456 101.691 72 100.219 72H96.2825C94.7465 72 93.4345 71.488 92.3465 70.464C91.3225 69.376 90.7785 68.064 90.7145 66.528V65.76C90.7145 65.696 90.6825 65.664 90.6185 65.664L90.4265 65.856C86.2665 70.592 81.2745 72.96 75.4505 72.96ZM140.286 32.64C133.887 32.64 130.687 37.44 130.687 47.04C130.687 51.904 131.551 55.52 133.279 57.888C135.007 60.256 137.343 61.44 140.286 61.44C142.847 61.44 145.087 60.576 147.007 58.848C148.927 57.12 149.887 55.168 149.887 52.992V41.088C149.887 38.912 148.927 36.96 147.007 35.232C145.087 33.504 142.847 32.64 140.286 32.64ZM135.007 72.96C129.311 72.96 124.639 70.688 120.991 66.144C117.343 61.536 115.519 55.168 115.519 47.04C115.519 38.72 117.279 32.32 120.799 27.84C124.319 23.36 129.055 21.12 135.007 21.12C140.255 21.12 145.023 23.072 149.311 26.976C149.375 27.04 149.439 27.072 149.503 27.072C149.567 27.072 149.599 27.04 149.599 26.976V5.472C149.599 4 150.111 2.72 151.135 1.632C152.223 0.543995 153.503 -5.72205e-06 154.975 -5.72205e-06H159.679C161.151 -5.72205e-06 162.399 0.543995 163.423 1.632C164.511 2.72 165.055 4 165.055 5.472V66.528C165.055 68 164.511 69.28 163.423 70.368C162.399 71.456 161.151 72 159.679 72H156.031C154.495 72 153.183 71.488 152.095 70.464C151.071 69.376 150.527 68.064 150.463 66.528V65.76C150.463 65.696 150.431 65.664 150.367 65.664L150.175 65.856C146.143 70.592 141.087 72.96 135.007 72.96ZM199.619 32.64C193.539 32.64 190.499 37.12 190.499 46.08C190.499 50.56 191.299 53.92 192.899 56.16C194.563 58.4 196.803 59.52 199.619 59.52C202.115 59.52 204.259 58.688 206.051 57.024C207.843 55.296 208.739 53.312 208.739 51.072V41.76C208.739 39.2 207.843 37.056 206.051 35.328C204.259 33.536 202.115 32.64 199.619 32.64ZM194.531 71.04C188.963 71.04 184.355 68.832 180.707 64.416C177.123 59.936 175.331 53.824 175.331 46.08C175.331 38.144 177.059 32 180.515 27.648C183.971 23.296 188.643 21.12 194.531 21.12C200.163 21.12 204.995 23.488 209.027 28.224L209.219 28.416C209.283 28.416 209.315 28.384 209.315 28.32V27.552C209.379 26.016 209.955 24.736 211.043 23.712C212.131 22.624 213.443 22.08 214.979 22.08H218.531C220.003 22.08 221.283 22.624 222.371 23.712C223.459 24.8 224.003 26.08 224.003 27.552V67.68C224.003 76.32 221.603 82.88 216.803 87.36C212.067 91.84 205.187 94.08 196.163 94.08C192.323 94.08 188.867 93.824 185.795 93.312C184.259 93.056 182.979 92.288 181.955 91.008C180.931 89.728 180.419 88.288 180.419 86.688V84.768C180.419 83.488 180.963 82.464 182.051 81.696C183.139 80.928 184.323 80.704 185.603 81.024C189.059 81.856 192.355 82.272 195.491 82.272C200.099 82.272 203.459 81.152 205.571 78.912C207.683 76.736 208.739 73.056 208.739 67.872V65.184C208.739 65.12 208.707 65.088 208.643 65.088C208.579 65.088 208.515 65.12 208.451 65.184C204.803 69.088 200.163 71.04 194.531 71.04ZM258.119 31.584C255.239 31.584 253.063 32.352 251.591 33.888C250.119 35.36 249.191 37.92 248.807 41.568C248.807 42.08 249.031 42.336 249.479 42.336H265.703C266.279 42.336 266.567 42.048 266.567 41.472C266.311 34.88 263.495 31.584 258.119 31.584ZM260.519 72.96C251.815 72.96 245.095 70.752 240.359 66.336C235.687 61.92 233.351 55.488 233.351 47.04C233.351 38.656 235.431 32.256 239.591 27.84C243.815 23.36 249.895 21.12 257.831 21.12C273.063 21.12 280.807 29.44 281.063 46.08C281.063 47.616 280.455 48.928 279.239 50.016C278.087 51.04 276.743 51.552 275.207 51.552H249.575C248.935 51.552 248.679 51.84 248.807 52.416C249.319 55.936 250.663 58.464 252.839 60C255.079 61.472 258.407 62.208 262.823 62.208C265.703 62.208 268.807 61.792 272.135 60.96C273.479 60.64 274.663 60.896 275.687 61.728C276.775 62.56 277.319 63.648 277.319 64.992V65.184C277.319 66.784 276.807 68.256 275.783 69.6C274.823 70.88 273.575 71.648 272.039 71.904C268.327 72.608 264.487 72.96 260.519 72.96ZM293.033 34.848C291.561 34.848 290.281 34.336 289.193 33.312C288.105 32.224 287.561 30.944 287.561 29.472C287.561 28 288.105 26.72 289.193 25.632C290.281 24.544 291.561 24 293.033 24H296.873C297.385 24 297.641 23.712 297.641 23.136V11.232C297.641 9.76 298.185 8.48 299.273 7.392C300.361 6.304 301.641 5.75999 303.113 5.75999H307.721C309.193 5.75999 310.473 6.304 311.561 7.392C312.649 8.48 313.193 9.76 313.193 11.232V23.136C313.193 23.712 313.481 24 314.057 24H323.465C324.937 24 326.185 24.544 327.209 25.632C328.297 26.72 328.841 28 328.841 29.472C328.841 30.944 328.297 32.224 327.209 33.312C326.185 34.336 324.937 34.848 323.465 34.848H314.057C313.481 34.848 313.193 35.136 313.193 35.712V52.128C313.193 56.16 313.545 58.72 314.249 59.808C315.017 60.896 316.681 61.44 319.241 61.44C320.585 61.44 321.641 61.376 322.409 61.248C323.817 61.056 325.065 61.376 326.153 62.208C327.241 63.04 327.785 64.128 327.785 65.472V66.24C327.785 67.84 327.273 69.248 326.249 70.464C325.225 71.68 323.913 72.384 322.313 72.576C320.329 72.832 318.025 72.96 315.401 72.96C308.873 72.96 304.265 71.584 301.577 68.832C298.953 66.016 297.641 60.992 297.641 53.76V35.712C297.641 35.136 297.385 34.848 296.873 34.848H293.033ZM347.978 72C346.506 72 345.226 71.456 344.138 70.368C343.05 69.28 342.506 68 342.506 66.528V59.232C342.506 57.76 343.05 56.48 344.138 55.392C345.226 54.304 346.506 53.76 347.978 53.76H355.274C356.746 53.76 358.026 54.304 359.114 55.392C360.202 56.48 360.746 57.76 360.746 59.232V66.528C360.746 68 360.202 69.28 359.114 70.368C358.026 71.456 356.746 72 355.274 72H347.978Z" />
        </svg>
      )}
    </>
  )
}

export default AppLogo
