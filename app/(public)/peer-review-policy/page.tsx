export const metadata = { title: 'Peer Review Policy' }

export default function PeerReviewPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Peer Review Policy</h1>
        <p className="text-slate-500 mt-2 text-sm">Ensuring scientific rigor through a transparent and independent review process</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6">
        <p>
          All research articles, and most other article types, published in CleX journals undergo a rigorous peer review process. This process is designed to ensure that the work published is scientifically sound, original, significant, and of interest to the research community.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Double-Blind Peer Review</h2>
        <p>
          CleX journals employ a <strong>double-blind peer review</strong> model. Under this model, the identities of both the authors and the reviewers are kept confidential.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Authors do not know who reviewed their manuscript.</li>
          <li>Reviewers do not know the identity or affiliation of the authors.</li>
          <li>Reviewers are selected based on their expertise, research history, and lack of conflict of interest with the submitted work.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Review Process Workflow</h2>
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            <strong>Initial Submission & Technical Check:</strong> The manuscript is submitted and goes through a technical check by the Editorial Office to ensure completeness and adherence to formatting guidelines.
          </li>
          <li>
            <strong>Editorial Screening:</strong> The Editor-in-Chief or an Associate Editor reviews the manuscript to determine if it fits within the journal's scope and meets basic quality criteria.
          </li>
          <li>
            <strong>Peer Review:</strong> The manuscript is sent to at least two independent expert reviewers. Reviewers assess the research quality, methodology, and clarity, and submit their evaluation.
          </li>
          <li>
            <strong>Editorial Decision:</strong> Based on the reviewer reports, the Editor makes one of the following decisions:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Accept:</strong> The paper is accepted without changes and sent to production.</li>
              <li><strong>Minor Revision:</strong> The authors must address minor comments and resubmit.</li>
              <li><strong>Major Revision:</strong> The authors must perform additional experiments or substantial rewrites.</li>
              <li><strong>Reject:</strong> The paper is rejected and cannot be resubmitted to the same journal.</li>
            </ul>
          </li>
          <li>
            <strong>Revision & Final Approval:</strong> If revisions are requested, the author submits the revised manuscript, which may be sent back to the original reviewers for approval.
          </li>
        </ol>
      </div>
    </div>
  )
}
