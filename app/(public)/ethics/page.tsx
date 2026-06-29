import { Card, CardContent } from '@/components/ui/index'

export const metadata = { title: 'Publication Ethics' }

export default function PublicationEthicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Publication Ethics & Malpractice Statement</h1>
        <p className="text-slate-500 mt-2 text-sm">Our commitment to research integrity and high publication standards</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6">
        <p>
          CleX is committed to maintaining the highest standards of publication ethics and takes all possible measures against any publication malpractices. All authors submitting their works for publication attest that the manuscript represents their own original contributions and has not been copied or plagiarized in whole or in part from other works.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-6">1. Author Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Originality and Plagiarism:</strong> Authors must ensure they have written entirely original works. Any material from other sources must be appropriately cited or quoted.</li>
          <li><strong>Multiple, Redundant or Concurrent Publication:</strong> An author should not publish manuscripts describing essentially the same research in more than one journal.</li>
          <li><strong>Data Access and Retention:</strong> Authors may be asked to provide the raw data in connection with a paper for editorial review, and should be prepared to provide public access to such data.</li>
          <li><strong>Authorship of the Paper:</strong> Authorship should be limited to those who have made a significant contribution to the conception, design, execution, or interpretation of the study.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-6">2. Reviewer Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Contribution to Editorial Decisions:</strong> Peer review assists the editor in making editorial decisions and may also assist the author in improving the paper.</li>
          <li><strong>Promptness:</strong> Any selected referee who feels unqualified to review the research reported in a manuscript should notify the editor and excuse themselves from the review process.</li>
          <li><strong>Confidentiality:</strong> Any manuscripts received for review must be treated as confidential documents.</li>
          <li><strong>Standards of Objectivity:</strong> Reviews should be conducted objectively. Personal criticism of the author is inappropriate.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-6">3. Editor Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Fair play:</strong> An editor will evaluate manuscripts for their intellectual content without regard to race, gender, sexual orientation, religious belief, ethnic origin, citizenship, or political philosophy of the authors.</li>
          <li><strong>Confidentiality:</strong> The editor and any editorial staff must not disclose any information about a submitted manuscript to anyone other than the corresponding author, reviewers, potential reviewers, other editorial advisers, and the publisher.</li>
          <li><strong>Disclosure and Conflicts of Interest:</strong> Unpublished materials disclosed in a submitted manuscript must not be used in an editor's own research without the express written consent of the author.</li>
        </ul>
      </div>
    </div>
  )
}
