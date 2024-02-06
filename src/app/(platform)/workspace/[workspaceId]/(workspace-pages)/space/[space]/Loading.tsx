import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="w-full py-4 px-2">
      <Skeleton className="h-12 w-40 rounded-full" />
      <div className="py-6">
        <Skeleton className="h-6 w-40 my-4 rounded-full" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
      <div className="py-6">
        <Skeleton className="h-6 w-40 my-4 rounded-full" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
      <div className="py-6">
        <Skeleton className="h-6 w-40 my-4 rounded-full" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    </section>
  )
}