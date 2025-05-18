import {useMediaQuery} from 'react-responsive'

const breakpoints = {
  xs: 375,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

const useResponsive = () => {
  // Exact matches
  const isXs = useMediaQuery({maxWidth: breakpoints.sm - 1})
  const isSm = useMediaQuery({minWidth: breakpoints.sm, maxWidth: breakpoints.md - 1})
  const isMd = useMediaQuery({minWidth: breakpoints.md, maxWidth: breakpoints.lg - 1})
  const isLg = useMediaQuery({minWidth: breakpoints.lg, maxWidth: breakpoints.xl - 1})
  const isXl = useMediaQuery({minWidth: breakpoints.xl, maxWidth: breakpoints.xxl - 1})
  const isXxl = useMediaQuery({minWidth: breakpoints.xxl})

  // Ranges
  const isSmOrSmaller = useMediaQuery({maxWidth: breakpoints.md - 1})
  const isMdOrSmaller = useMediaQuery({maxWidth: breakpoints.lg - 1})
  const isLgOrSmaller = useMediaQuery({maxWidth: breakpoints.xl - 1})
  const isXlOrSmaller = useMediaQuery({maxWidth: breakpoints.xxl - 1})

  const isSmOrLarger = useMediaQuery({minWidth: breakpoints.sm})
  const isMdOrLarger = useMediaQuery({minWidth: breakpoints.md})
  const isLgOrLarger = useMediaQuery({minWidth: breakpoints.lg})
  const isXlOrLarger = useMediaQuery({minWidth: breakpoints.xl})

  // Aliases
  const isMobile = useMediaQuery({maxWidth: breakpoints.md - 1})
  const isTablet = isMd
  const isDesktop = useMediaQuery({minWidth: breakpoints.lg})

  return {
    // Exact
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,

    // Ranges
    isSmOrSmaller,
    isMdOrSmaller,
    isLgOrSmaller,
    isXlOrSmaller,

    isSmOrLarger,
    isMdOrLarger,
    isLgOrLarger,
    isXlOrLarger,

    // Aliases
    isMobile,
    isTablet,
    isDesktop,
  }
}

export default useResponsive
