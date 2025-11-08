import { createFileRoute } from '@tanstack/react-router'
import { TradingDashboard } from '~/components/TradingDashboard'

export const Route = createFileRoute('/trading')({
  component: TradingPage,
})

function TradingPage() {
  return <TradingDashboard />
}