import { fetchEmotionSummaryByMonth } from '@/actions/diary/thoughts/fetch-emotion-summary-by-month'
import { fetchFilteredThoughtsByMonth } from '@/actions/diary/thoughts/fetch-filtered-thoughts-by-month'
import { DashboardOverview } from '@/components/diary/dashboard-overview'
import { ThoughtsView } from '@/components/diary/thoughts-view'

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function DiaryPage(props: { searchParams: SearchParams }): Promise<JSX.Element> {
  const searchParams = await props.searchParams
  const currentPage = searchParams.currentPage ? Number(searchParams.currentPage) : 1
  const month = searchParams.month ? Number(searchParams.month) : new Date().getMonth() + 1
  const year = searchParams.year ? Number(searchParams.year) : new Date().getFullYear()

  const thoughts = await fetchFilteredThoughtsByMonth({ currentPage, month, year }) || []
  const emotionSummary = await fetchEmotionSummaryByMonth({ month, year }) || []

  return (
    <div className="container flex flex-col gap-6 pt-0 pb-10 py-0">
      <DashboardOverview thoughts={thoughts} emotionSummary={emotionSummary} />
      <ThoughtsView thoughts={thoughts} />
    </div>
  )
}
