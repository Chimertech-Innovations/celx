export const metadata = { title: 'Reviewer Guidelines' }

export default function ReviewerGuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reviewer Guidelines</h1>
        <p className="text-slate-500 mt-2 text-sm">Best practices and expectations for peer reviewers</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6">
        <p>
          Peer reviewers play a crucial role in maintaining the integrity, quality, and progress of scientific literature. We deeply appreciate the time, dedication, and expertise our reviewers contribute.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Reviewer Ethics</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Confidentiality:</strong> Manuscripts are confidential documents. You must not discuss the paper with others or use any of the unpublished findings in your own work.</li>
          <li><strong>Conflict of Interest:</strong> If you believe you have a conflict of interest (e.g. personal, financial, or collaborative relationship with the authors), please decline the invitation promptly.</li>
          <li><strong>Objectivity:</strong> Reviews should be objective and constructive. Personal or derogatory comments are strictly unacceptable.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Evaluating the Manuscript</h2>
        <p>Your review should evaluate the following key aspects of the paper:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Originality & Novelty:</strong> Does the work present new insights or significant developments compared to existing literature?</li>
          <li><strong>Methodology:</strong> Are the experimental design, statistical analyses, and methodology sound, rigorous, and clearly described?</li>
          <li><strong>Clarity & Flow:</strong> Is the manuscript well-written, easy to follow, and logical in its argument and presentation of results?</li>
          <li><strong>Ethical Standards:</strong> Are there any ethical concerns regarding animal or human subjects, plagiarism, or data duplication?</li>
        </ol>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Submitting Your Report</h2>
        <p>
          When writing your review, please divide your comments into:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Comments to the Author:</strong> Constructive criticism detailing major and minor issues that need addressing.</li>
            <li><strong>Confidential Comments to the Editor:</strong> Any additional remarks or concerns regarding the study's validity or ethics.</li>
          </ul>
        </p>
      </div>
    </div>
  )
}
