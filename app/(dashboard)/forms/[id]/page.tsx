import {
  ListChecks,
  LucideView,
  MousePointerClick,
  Waypoints,
} from "lucide-react";
import { GetFormById } from "@/actions/form";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import { StatsCard } from "../../page";

interface Props {
  params: {
    id: string;
  };
}

async function FormDetailPage({ params }: Props) {
  const { id } = params;
  const form = await GetFormById(+id);
  if (!form) throw new Error("Form not found");

  const { submissions, visits } = form;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="border-b border-muted py-10">
        <div className="container flex justify-between">
          <h1 className="truncate text-4xl font-bold">{form.name}</h1>
          <VisitBtn shareURL={form.shareURL} />
        </div>
      </div>
      <div className="border-b border-muted py-4">
        <div className="container flex items-center justify-between gap-2">
          <FormLinkShare shareURL={form.shareURL} />
        </div>
      </div>
      <div className="container grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total visits"
          value={form?.visits.toLocaleString() || ""}
          icon={<LucideView className="text-blue-600" />}
          helperText="All time form visits"
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total submissions"
          value={form?.submissions.toLocaleString() || ""}
          icon={<ListChecks className="text-yellow-600" />}
          helperText="All time submissions"
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Submission rate"
          value={submissionRate.toLocaleString() + "%" || ""}
          icon={<MousePointerClick className="text-green-600" />}
          helperText="Visits that result in a form submission"
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Bounce rate"
          value={bounceRate.toLocaleString() + "%" || ""}
          icon={<Waypoints className="text-red-600" />}
          helperText="Visits that leaves without interacting"
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>

      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailPage;

function SubmissionsTable({ id }: { id: number }) {
  return (
    <>
      <h1 className="my-4 text-2xl font-bold">Submissions</h1>
    </>
  );
}
