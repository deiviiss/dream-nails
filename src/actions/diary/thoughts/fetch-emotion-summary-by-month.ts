'use server'

import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import { type EmotionSummary } from '@/interfaces/thought.interface'
import prisma from '@/lib/prisma'

export async function fetchEmotionSummaryByMonth({
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear()
}: {
  month?: number
  year?: number
}) {
  const { from, to } = getDateRangeByMonth(month, year)
  const user = await getUserSessionServer()
  if (!user?.id) throw new Error('No hay sesión activa.')

  const groupedEmotions = await prisma.thought.groupBy({
    by: ['emotionId'],
    _count: {
      emotionId: true
    },
    where: {
      createdAt: {
        gte: from,
        lte: to
      }
    }
  })

  // We look for the names of emotions
  const emotionRecords = await prisma.emotion.findMany({
    where: {
      id: { in: groupedEmotions.map((item) => item.emotionId) }
    },
    select: {
      id: true,
      name: true
    }
  })

  const emotionIdToNameMap = Object.fromEntries(emotionRecords.map(e => [e.id, e.name]))

  const emotionColorMap: Record<string, string> = {
    Agradecido: '#EAB308',
    Asustado: '#3B82F6',
    Cansado: '#EF4444',
    Competente: '#A855F7',
    Conocimiento: '#22C55E',
    Creativo: '#10B981',
    Culpable: '#F59E0B',
    Enojado: '#6366F1',
    Estresado: '#F97316',
    Familia: '#84CC16',
    Feliz: '#EC4899',
    Inresponsable: '#0EA5E9',
    Insastisfecho: '#9333EA',
    Macizo: '#14B8A6',
    Motivado: '#F43F5E',
    Nervioso: '#8B5CF6',
    Orgulloso: '#16A34A',
    Otro: '#DC2626',
    Pensamiento: '#FB923C',
    Preocupado: '#6B7280',
    'Primera emoción': '#64748B',
    Promesas: '#4B5563',
    Recuerdo: '#0284C7',
    Reflexión: '#0D9488',
    Risa: '#3B0764',
    Sueños: '#7E22CE',
    Tranquilo: '#991B1B',
    Triste: '#2563EB'
  }

  const emotionSummary: EmotionSummary[] = groupedEmotions.map(({ emotionId, _count }) => {
    const name = emotionIdToNameMap[emotionId] || 'Desconocida'
    const color = emotionColorMap[name] || '#000000'
    return { name, value: _count.emotionId, color }
  })

  return emotionSummary
}

function getDateRangeByMonth(month: number, year: number) {
  const from = new Date(year, month - 1, 1, 0, 0, 0)
  const to = new Date(year, month, 0, 23, 59, 59)
  return { from, to }
}
