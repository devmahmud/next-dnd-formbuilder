import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { GetFormStats, GetForms } from "@/actions/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Edit,
  ListChecks,
  LucideView,
  MousePointerClick,
  View,
  Waypoints,
} from "lucide-react";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="col-span-2 text-4xl font-bold">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards({ data, loading }: StatsCardsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        value={data?.visits.toLocaleString() || ""}
        icon={<LucideView className="text-blue-600" />}
        helperText="All time form visits"
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total submissions"
        value={data?.submissions.toLocaleString() || ""}
        icon={<ListChecks className="text-yellow-600" />}
        helperText="All time submissions"
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission rate"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        icon={<MousePointerClick className="text-green-600" />}
        helperText="Visits that result in a form submission"
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        icon={<Waypoints className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
}

export function StatsCard({
  title,
  icon,
  value,
  helperText,
  className,
  loading,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className="pt-1 text-xs text-muted-foreground">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="h-[190px] w-full border-2 border-primary/20" />;
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-sm text-muted-foreground">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className="flex items-center gap-2">
              <View className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <ListChecks className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button className="text-md mt-2 w-full gap-4" asChild>
            <Link href={`/forms/${form.id}`}>
              View submissions <ArrowRight />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button className="text-md mt-2 w-full gap-4" asChild>
            <Link href={`/builder/${form.id}`}>
              Edit form <Edit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
