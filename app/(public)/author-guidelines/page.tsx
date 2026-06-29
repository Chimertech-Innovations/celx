export const metadata = { title: 'Author Guidelines' }

export default function AuthorGuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Author Guidelines</h1>
        <p className="text-slate-500 mt-2 text-sm">Preparing and submitting your manuscript for CleX publication</p>
      </div>

      <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6">
        <p>
          Thank you for choosing to submit your work to a CleX journal. Please read these instructions carefully before submitting to ensure a smooth editorial and peer review process.
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Manuscript Preparation</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Format:</strong> Submissions must be in DOCX, RTF, or LaTeX format. Double-spaced text with line numbers is highly encouraged.</li>
          <li><strong>Structure:</strong> Research articles should generally follow the standard structure: Title Page, Abstract, Introduction, Materials and Methods, Results, Discussion, Conclusions, Conflict of Interest, Funding, References.</li>
          <li><strong>Abstract:</strong> Limit the abstract to 250 words. It should be structured for research articles (Background, Methods, Results, Conclusion).</li>
          <li><strong>References:</strong> Choose a standard referencing format (e.g. APA, Harvard, Vancouver) and apply it consistently throughout the manuscript.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Submission Checklist</h2>
        <p>Before submitting, please ensure you have the following ready:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Manuscript file (without author details for double-blind review).</li>
          <li>Title page containing co-author details, affiliations, and emails.</li>
          <li>High-resolution figures (minimum 300 DPI, uploaded separately or embedded).</li>
          <li>Cover letter explaining the significance of your work.</li>
          <li>Declarations regarding funding, ethics, and conflict of interest.</li>
        </ol>

        <h2 className="text-xl font-bold text-slate-900 mt-6">Ethics Compliance</h2>
        <p>
          All research involving human or animal subjects must state that ethical approval was obtained from an institutional review board (IRB) or ethics committee, including the protocol reference number.
        </p>
      </div>
    </div>
  )
}
