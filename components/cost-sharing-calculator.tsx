"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function CostSharingCalculator() {
  const [venuePrice, setVenuePrice] = useState(5000)
  const [tentPrice, setTentPrice] = useState(3000)
  const [numCouples, setNumCouples] = useState(2)

  // Calculate savings
  const totalCost = venuePrice + tentPrice
  const costPerCouple = totalCost / numCouples
  const savings = totalCost - costPerCouple
  const savingsPercentage = (savings / totalCost) * 100

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Cost Sharing Calculator</CardTitle>
        <CardDescription>See how much you can save by sharing a tented venue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="venue-price">Venue Rental Cost</Label>
            <span className="text-sm font-medium">${venuePrice.toLocaleString()}</span>
          </div>
          <Slider
            id="venue-price"
            min={1000}
            max={10000}
            step={500}
            value={[venuePrice]}
            onValueChange={(value) => setVenuePrice(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="tent-price">Tent & Setup Cost</Label>
            <span className="text-sm font-medium">${tentPrice.toLocaleString()}</span>
          </div>
          <Slider
            id="tent-price"
            min={1000}
            max={8000}
            step={500}
            value={[tentPrice]}
            onValueChange={(value) => setTentPrice(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="num-couples">Number of Couples Sharing</Label>
            <span className="text-sm font-medium">{numCouples}</span>
          </div>
          <Slider
            id="num-couples"
            min={1}
            max={3}
            step={1}
            value={[numCouples]}
            onValueChange={(value) => setNumCouples(value[0])}
          />
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-sm">Total Cost</span>
            <span className="font-medium">${totalCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Your Cost (Shared)</span>
            <span className="font-medium">${costPerCouple.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Your Savings</span>
            <span className="font-medium text-green-600">${savings.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Savings Percentage</span>
            <span className="font-medium text-green-600">{savingsPercentage.toFixed(0)}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">Find Sharing Opportunities</Button>
      </CardFooter>
    </Card>
  )
}
