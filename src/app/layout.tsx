import type { Metadata } from 'next'
import { ErrorBoundary } from 'react-error-boundary'

import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'nabe - Not A Boring Editor',
  description: 'Level editor for Boring Man - OTSC (v2)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <div
          id="debug"
          style={{
            paddingLeft: '1rem',
            position: 'absolute',
            top: 0,
            width: '100%',
            background: 'red',
          }}
        />
        <ErrorBoundary fallback={<div>App or Mantine crashed</div>}>
          <MantineProvider>
            <Notifications />
            {children}
          </MantineProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
