import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export function AccountCreatedAlert() {
  return (
    <Alert className="bg-green-100 border-green-200">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertDescription className="text-green-800 text-xs">
        Your account has been successfully created!
      </AlertDescription>
    </Alert>
  )
}
