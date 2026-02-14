'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatsCardProps {
  icon: ReactNode
  label: string
  value: string | number
  color: 'purple' | 'blue' | 'green' | 'orange'
}

const colorClasses = {
  purple: 'from-purple-500 to-purple-600',
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
}

export default function StatsCard({ icon, label, value, color }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card"
    >
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} text-white mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </motion.div>
  )
}
