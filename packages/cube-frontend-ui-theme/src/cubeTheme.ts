import { FlattenedObjectKeys } from '@cube-frontend/utils'
import defaultTheme from 'tailwindcss/defaultTheme'
import { CustomThemeConfig } from 'tailwindcss/types/config'
import { cosAnimationKeyframes } from './utils/animationKeyframes'
import { cosAnimations } from './utils/animations'

export const cubeTheme = {
  screens: {
    'height-sm': {
      raw: '(min-height: 768px)',
    },
    'height-md': {
      raw: '(min-height: 864px)',
    },
    'height-lg': {
      raw: '(min-height: 960px)',
    },
    'height-xl': {
      raw: '(min-height: 1080px)',
    },
  },
  colors: {
    primary: {
      DEFAULT: '#4C68F9',
      0: '#F9FAFF',
      50: '#E8EBFE',
      100: '#D6DDFE',
      150: '#C5CEFD',
      200: '#B4C0FD',
      300: '#91A2FB',
      400: '#6F85FA',
      500: '#4C68F9',
      600: '#3E59E4',
      700: '#3049CE',
      800: '#213AB9',
      850: '#1A32AE',
    },
    secondary: {
      DEFAULT: '#57E2E2',
      0: '#EFFCFC',
      50: '#E0F9F9',
      100: '#D1F7F7',
      150: '#C1F4F4',
      200: '#B2F2F2',
      300: '#94ECEC',
      400: '#75E7E7',
      500: '#57E2E2',
      600: '#4ACCCC',
      700: '#3CB6B6',
      800: '#2F9F9F',
      850: '#289494',
    },
    dark: {
      0: '#FBFBFC',
      50: '#E8E9EB',
      100: '#D5D6DA',
      150: '#C3C4C9',
      200: '#B0B2B8',
      300: '#8A8D97',
      400: '#656975',
      500: '#3F4453',
      600: '#323642',
      700: '#262932',
      800: '#191B21',
      850: '#131419',
    },
    grey: {
      0: '#FFFFFF',
      50: '#FBFBFD',
      100: '#F7F7FA',
      150: '#F3F4F8',
      200: '#EFF0F5',
      300: '#E7E8F1',
      400: '#DFE1EC',
      500: '#D7D9E7',
      600: '#C2C5DA',
      700: '#ADB1CE',
      800: '#989DC1',
      850: '#8E93BB',
    },
    blue: {
      0: '#F3FCFF',
      50: '#E0F6FF',
      100: '#CCF1FF',
      150: '#B9EBFF',
      200: '#A5E6FF',
      300: '#7FDAFF',
      400: '#58CFFF',
      500: '#31C4FF',
      600: '#27ADE2',
      700: '#1D95C5',
      800: '#147EA8',
      850: '#0F729A',
    },
    green: {
      0: '#EFFFFB',
      50: '#D7FBF2',
      100: '#BFF7E9',
      150: '#A7F2E0',
      200: '#8FEED7',
      300: '#60E6C6',
      400: '#30DDB4',
      500: '#00D5A2',
      600: '#00AA82',
      700: '#008061',
      800: '#005541',
      850: '#004031',
    },
    yellow: {
      0: '#FFFBEF',
      50: '#FEF5D7',
      100: '#FEF0BF',
      150: '#FDEAA7',
      200: '#FDE58F',
      300: '#FBD960',
      400: '#FACE30',
      500: '#F9C300',
      600: '#C89D00',
      700: '#977600',
      800: '#665000',
      850: '#4E3D00',
    },
    red: {
      0: '#FFF6F6',
      50: '#FFE7E7',
      100: '#FFD7D7',
      150: '#FFC8C8',
      200: '#FFB9B9',
      300: '#FF9A9A',
      400: '#FF7C7C',
      500: '#FF5D5D',
      600: '#F34A4A',
      700: '#E73838',
      800: '#DB2525',
      850: '#D51C1C',
    },
    cosmos: {
      primary: '#4C68F9',
      secondary: '#57E2E2',
    },
    scene: {
      gradient:
        'linear-gradient(90deg, #2700C3 0%, #4C68F9 30%, #31C4FF 65%, #57E2E2 100%)',
      background: '#F7F7FA',
    },
    functional: {
      title: '#282D39',
      text: '#3F4453',
      'text-light': '#858A9A',
      'hover-primary': '#607AFF',
      'hover-secondary': '#E8EBFE',
      'hover-grey': '#FBFBFD',
      'hover-grey-darker': '#EFF0F5',
      'border-divider': '#DFE1EC',
      'border-darker': '#A9AFBC',
      disable: '#E4E9F3',
      'disable-text': '#D7D9E7',
      'disable-light': '#F0F4FF',
      skeleton: '#EEF0F6',
    },
    status: {
      positive: '#00D5A2',
      'positive-text': '#00BE90',
      negative: '#FF5D5D',
      warning: '#F9C300',
      paused: '#FF9920',
      neutral: '#4C68F9',
    },
    chart: {
      1: '#57E2E2',
      2: '#647DFF',
      3: '#58CFFF',
      4: '#FACE30',
      5: '#147EA8',
      6: '#FF9A9A',
      7: '#989DC1',
      8: '#00D5A2',
      9: '#3049CE',
      10: '#3CB6B6',
    },
  },
  fontFamily: {
    urbanist: ['Urbanist', ...defaultTheme.fontFamily.sans],
    inter: ['Inter', ...defaultTheme.fontFamily.sans],
    sans: ['Inter', ...defaultTheme.fontFamily.sans],
  },
  fontSize: {
    // Headings - Primary
    'primary-h1': [
      '30px',
      { lineHeight: '38px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'primary-h2': [
      '24px',
      { lineHeight: '30px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'primary-h3': [
      '20px',
      { lineHeight: '24px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'primary-h4': [
      '18px',
      { lineHeight: '22px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'primary-h5': [
      '16px',
      { lineHeight: '20px', letterSpacing: '0.02em', fontWeight: 600 },
    ],

    // Headings - Secondary
    'secondary-h1': [
      '30px',
      { lineHeight: '38px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'secondary-h2': [
      '24px',
      { lineHeight: '30px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'secondary-h3': [
      '20px',
      { lineHeight: '24px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'secondary-h4': [
      '18px',
      { lineHeight: '22px', letterSpacing: '0.02em', fontWeight: 600 },
    ],
    'secondary-h5': [
      '16px',
      { lineHeight: '20px', letterSpacing: '0.02em', fontWeight: 600 },
    ],

    // Body - Primary
    'primary-body1': ['15px', { lineHeight: '22px', fontWeight: 400 }],
    'primary-body2': ['14px', { lineHeight: '20px', fontWeight: 400 }],
    'primary-body3': ['13px', { lineHeight: '18px', fontWeight: 400 }],
    'primary-body4': ['12px', { lineHeight: '16px', fontWeight: 400 }],
    'primary-body5': ['11px', { lineHeight: '15px', fontWeight: 400 }],
    'primary-body6': ['10px', { lineHeight: '13px', fontWeight: 400 }],

    // Body - Secondary
    'secondary-body1': [
      '15px',
      { lineHeight: '22px', letterSpacing: '0.02em', fontWeight: 400 },
    ],
    'secondary-body2': [
      '14px',
      { lineHeight: '18px', letterSpacing: '0.02em', fontWeight: 400 },
    ],
    'secondary-body3': [
      '13px',
      { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: 400 },
    ],
    'secondary-body4': [
      '12px',
      { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: 400 },
    ],
    'secondary-body5': [
      '11px',
      { lineHeight: '15px', letterSpacing: '0.02em', fontWeight: 400 },
    ],
    'secondary-body6': [
      '10px',
      { lineHeight: '14px', letterSpacing: '0.02em', fontWeight: 400 },
    ],
    'secondary-body7': [
      '9px',
      { lineHeight: '12px', letterSpacing: '0.02em', fontWeight: 400 },
    ],
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
  },
  keyframes: {
    ...cosAnimationKeyframes,
  },
  animation: {
    ...cosAnimations,
  },
} satisfies Partial<CustomThemeConfig>

export type BorderColorClass = `border-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`

export type BackgroundColorClass = `bg-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`

export type FillColorClass = `fill-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`

export type StrokeColorClass = `stroke-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`
