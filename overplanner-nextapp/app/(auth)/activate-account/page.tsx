import { Suspense } from 'react'
import ActivateAccountClientPage from './page.client'

export default async function ActivateAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  return (
    <Suspense fallback={<div>Activating account...</div>}>
      <ActivateAccountClientPage {...{
        token
      }} />
    </Suspense>
  )
}