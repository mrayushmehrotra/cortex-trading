import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Clock, X, CheckCircle, AlertCircle } from "lucide-react"

interface Order {
  id: string
  symbol: string
  side: "buy" | "sell"
  type: "market" | "limit" | "stop"
  quantity: number
  price?: number
  status: "pending" | "filled" | "cancelled" | "partial"
  timestamp: Date
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    symbol: "RELIANCE",
    side: "buy",
    type: "limit",
    quantity: 50,
    price: 2450.00,
    status: "pending",
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    id: "ORD002",
    symbol: "TCS",
    side: "sell",
    type: "market",
    quantity: 25,
    status: "filled",
    timestamp: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: "ORD003",
    symbol: "INFY",
    side: "buy",
    type: "limit",
    quantity: 100,
    price: 1560.00,
    status: "partial",
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  }
]

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "filled":
      return <CheckCircle className="h-4 w-4" />
    case "cancelled":
      return <X className="h-4 w-4" />
    case "partial":
      return <AlertCircle className="h-4 w-4" />
  }
}

const getStatusVariant = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "warning" as const
    case "filled":
      return "success" as const
    case "cancelled":
      return "destructive" as const
    case "partial":
      return "secondary" as const
  }
}

export function OrderBook() {
  const handleCancelOrder = (orderId: string) => {
    console.log("Cancelling order:", orderId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Order Book
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{order.symbol}</span>
                  <Badge variant={order.side === "buy" ? "success" : "destructive"}>
                    {order.side.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{order.type.toUpperCase()}</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {order.quantity} shares
                  {order.price && ` @ ₹${order.price.toFixed(2)}`}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {order.timestamp.toLocaleTimeString()}
                </div>
              </div>
              
              {order.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancelOrder(order.id)}
                  className="ml-2"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}